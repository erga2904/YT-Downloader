import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import ytdl from '@distube/ytdl-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export for Vercel Serverless Function
export const app: express.Application = express();

export async function createServer() {
  const PORT = 3000;

  app.use(express.json());

  // Use a unique prefix for Vercel if needed, but relative /api is standard
  app.post('/api/info', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: 'URL is required' });

      let title = 'Download';
      let thumbnail = null;
      let hasSubtitles = false;

      try {
        // Try ytdl-core first for rich metadata
        const info = await ytdl.getBasicInfo(url);
        title = info.videoDetails.title;
        thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
        
        const captionTracks = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
        hasSubtitles = captionTracks.length > 0;

        return res.json({
          title,
          thumbnail,
          hasSubtitles,
          resolutions: [
            { label: "1080p (Full HD)", value: "1080" },
            { label: "720p (HD)", value: "720" },
            { label: "480p (SD)", value: "480" },
            { label: "360p (Low)", value: "360" }
          ]
        });
      } catch (ytdlError: any) {
        console.error('ytdl-core info error:', ytdlError.message);
        
        // Fallback to loader.to
        const loaderUrl = `https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`;
        const loaderRes = await fetch(loaderUrl);
        
        if (!loaderRes.ok) {
          return res.status(loaderRes.status).json({ error: 'Failed to fetch video info' });
        }

        const data: any = await loaderRes.json();
        if (!data.success) {
          return res.status(400).json({ error: data.text || 'Failed to fetch video info' });
        }

        title = data.title || (data.info && data.info.title) || 'Download';
        thumbnail = data.info && data.info.image ? data.info.image : null;

        // If it's a YouTube URL, we can try one more simple check for subtitles if ytdl failed
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          try {
            const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
            if (videoIdMatch) {
              const videoId = videoIdMatch[1];
              // This is a very basic check, might be blocked but worth a try as fallback
              const subCheckRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
              });
              const html = await subCheckRes.text();
              hasSubtitles = html.includes('"captionTracks"');
            }
          } catch (e) {
            console.error('Fallback subtitle check failed:', e);
          }
        }

        res.json({
          title,
          thumbnail,
          hasSubtitles,
          resolutions: [
            { label: "1080p (Full HD)", value: "1080" },
            { label: "720p (HD)", value: "720" },
            { label: "480p (SD)", value: "480" },
            { label: "360p (Low)", value: "360" }
          ]
        });
      }
    } catch (error) {
      console.error('Info error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/download', async (req, res) => {
    try {
      const { url, format, quality } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      let loaderFormat = '720';
      if (format === 'mp3') {
        loaderFormat = 'mp3';
      } else {
        if (quality === 'max') loaderFormat = '1080';
        else if (quality === '1080') loaderFormat = '1080';
        else if (quality === '720') loaderFormat = '720';
        else if (quality === '480') loaderFormat = '480';
        else if (quality === '360') loaderFormat = '360';
        else loaderFormat = '720';
      }

      const loaderUrl = `https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`;
      
      const loaderRes = await fetch(loaderUrl);

      if (!loaderRes.ok) {
        return res.status(loaderRes.status).json({ error: 'Failed to process video. Please check the URL or try again later.' });
      }

      const data: any = await loaderRes.json();
      
      if (!data.success) {
         return res.status(400).json({ error: data.text || 'Failed to process video.' });
      }

      res.json({
        id: data.id,
        progress_url: data.progress_url,
        title: data.title || (data.info && data.info.title) || 'Download',
        thumbnail: data.info && data.info.image ? data.info.image : null
      });
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Proxy for progress to avoid CORS or absolute URL issues
  app.get('/api/progress', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) return res.status(400).json({ error: 'Progress URL is required' });
      
      const progressRes = await fetch(url as string);
      if (!progressRes.ok) {
        return res.status(progressRes.status).json({ error: 'Failed to fetch progress' });
      }
      const data = await progressRes.json();
      res.json(data);
    } catch (error) {
      console.error('Progress proxy error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

// In development, the server listens on its own.
// In production (Vercel), we'll let the handler in api/index.ts import and use the app.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  createServer().then(serverApp => {
    const PORT = 3000;
    serverApp.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}
