import express from 'express';
import ytdl from '@distube/ytdl-core';

export const app = express();
app.use(express.json());

// Pindahkan rute ke sini atau impor dari file server
app.post('/api/info', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
      const info = await ytdl.getInfo(url);
      const formats = info.formats;
      
      const videoFormats = formats.filter(f => f.hasVideo);
      
      // Extract subtitles if available
      const captions = info.player_response?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
      const subtitleTracks = captions.map((track: any) => ({
        label: track.name.simpleText,
        language: track.languageCode,
        url: track.baseUrl
      }));

      const uniqueResolutions = Array.from(new Set(videoFormats.map(f => f.qualityLabel).filter(Boolean)))
        .map(quality => {
          const qStr = String(quality);
          const res = qStr.match(/\d+/);
          return {
            label: qStr,
            value: res ? res[0] : qStr
          };
        })
        .sort((a, b) => parseInt(b.value) - parseInt(a.value));

        return res.json({
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
        thumbnails: info.videoDetails.thumbnails, // Added all thumbnail options
        hasSubtitles: subtitleTracks.length > 0,
        subtitles: subtitleTracks,
        resolutions: uniqueResolutions.length > 0 ? uniqueResolutions : [
          { label: "1080p (Full HD)", value: "1080" },
          { label: "720p (HD)", value: "720" },
          { label: "480p (SD)", value: "480" },
          { label: "360p (Low)", value: "360" }
        ]
      });
    } catch (ytdlError) {
      // Fallback loader.to - Return multiple resolutions even in fallback
      const loaderUrl = `https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`;
      try {
        const loaderRes = await fetch(loaderUrl);
        const data: any = await loaderRes.json();
        
        // Basic thumbnail extraction from URL if possible in fallback
        let fallbackThumb = data.info?.image || null;
        let fallbackThumbs = fallbackThumb ? [{ url: fallbackThumb, width: 1280, height: 720 }] : [];

        return res.json({
          title: data.title || 'Download',
          thumbnail: fallbackThumb,
          thumbnails: fallbackThumbs,
          hasSubtitles: false,
          resolutions: [
            { label: "1080p (Full HD)", value: "1080" },
            { label: "720p (HD)", value: "720" },
            { label: "480p (SD)", value: "480" },
            { label: "360p (Low)", value: "360" }
          ]
        });
      } catch (fallbackErr) {
        return res.status(500).json({ error: 'Failed to fetch video info' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/download', async (req, res) => {
  try {
    const { url, format, quality } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // Sanitize and prepare format/quality for loader.to
    // format can be 'mp3' or 'video'
    // quality is typically '1080', '720', etc.
    const loaderFormat = format === 'mp3' ? 'mp3' : (quality || '720');
    
    // Use the native fetch for Vercel/Node 18+
    const fetchUrl = `https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`;
    
    const loaderRes = await fetch(fetchUrl);
    
    // Check if response is ok
    if (!loaderRes.ok) {
      throw new Error(`Loader.to responded with status: ${loaderRes.status}`);
    }

    const data: any = await loaderRes.json();
    
    // Ensure essential fields exist in data
    if (!data.id || !data.progress_url) {
      return res.status(500).json({ 
        error: 'Invalid response from download server',
        details: data 
      });
    }

    res.json({
      id: data.id,
      progress_url: data.progress_url,
      title: data.title || 'Download',
      thumbnail: data.info?.image || null
    });
  } catch (error: any) {
    console.error('Download error:', error);
    res.status(500).json({ 
      error: 'Download server communication error',
      message: error.message 
    });
  }
});

app.get('/api/progress', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Progress URL is required' });

    console.log('Polling progress for:', url);
    const progressRes = await fetch(url as string);
    
    if (!progressRes.ok) {
      console.error(`Progress server returned ${progressRes.status}`);
      return res.status(progressRes.status).json({ 
        error: 'Failed to fetch progress from download server' 
      });
    }

    const data = await progressRes.json();
    res.json(data);
  } catch (error: any) {
    console.error('Progress API error:', error);
    res.status(500).json({ 
      error: 'Internal server error while fetching progress',
      message: error.message 
    });
  }
});

export default app;
