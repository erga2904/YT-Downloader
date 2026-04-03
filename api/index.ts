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
      // Set options to bypass some basic bot detection
      const info = await ytdl.getInfo(url, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          }
        }
      });
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
        .filter(res => parseInt(res.value) <= 1080) // Limit to 1080p max
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
    } catch (ytdlError: any) {
      console.error('ytdl-core error:', ytdlError.message);
      // Fallback loader.to - Return multiple resolutions even in fallback
      const loaderUrl = `https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`;
      try {
        const loaderRes = await fetch(loaderUrl);
        if (!loaderRes.ok) throw new Error('Loader.to status: ' + loaderRes.status);
        const data: any = await loaderRes.json();
        
        const fallbackTitle = data.title || (data.info && data.info.title) || 'Download';
        const fallbackThumb = data.info?.image || null;
        const fallbackThumbs = fallbackThumb ? [{ url: fallbackThumb, width: 1280, height: 720 }] : [];

        return res.json({
          title: fallbackTitle,
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
      } catch (fallbackErr: any) {
        console.error('Fallback error:', fallbackErr.message);
        return res.status(500).json({ error: 'Failed to fetch video info', details: fallbackErr.message });
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

    // Mapping internal quality logic (1080, 720, etc.) to loader.to format codes
    let loaderFormat = format === 'mp3' ? 'mp3' : (quality || '720');
    
    // Explicit mapping for loader.to (ensuring correct codes for resolutions)
    if (format !== 'mp3') {
      const q = parseInt(quality);
      if (q === 1080) loaderFormat = '1080';
      else if (q === 720) loaderFormat = '720';
      else if (q === 480) loaderFormat = '480';
      else if (q === 360) loaderFormat = '360';
      else loaderFormat = '720'; // default
    }
    
    // Use the native fetch for Vercel/Node 18+
    const fetchUrl = `https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`;
    
    // Adding custom headers to avoid detection as a simple bot
    const loaderRes = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://loader.to/'
      }
    });
    
    // Check if response is ok
    if (!loaderRes.ok) {
      const errorText = await loaderRes.text();
      console.error(`Loader.to error (${loaderRes.status}):`, errorText);
      throw new Error(`External server returned ${loaderRes.status}`);
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
    
    // Add User-Agent and Referer to match direct browser requests 
    const progressRes = await fetch(url as string, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://loader.to/'
      }
    });
    
    if (!progressRes.ok) {
      const errorText = await progressRes.text();
      console.error(`Progress server error (${progressRes.status}):`, errorText);
      return res.status(progressRes.status).json({ 
        error: 'Failed to fetch progress',
        details: errorText.slice(0, 100) 
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
