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
      const info = await ytdl.getBasicInfo(url);
      const formats = await ytdl.getInfo(url).then(info => info.formats);
      
      const videoFormats = formats.filter(f => f.hasVideo);
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
        hasSubtitles: !!info.player_response.captions,
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
        return res.json({
          title: data.title || 'Download',
          thumbnail: data.info?.image || null,
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
    const loaderFormat = format === 'mp3' ? 'mp3' : (quality || '720');
    const loaderUrl = `https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`;
    const loaderRes = await fetch(loaderUrl);
    const data = await loaderRes.json();
    res.json({
      id: data.id,
      progress_url: data.progress_url,
      title: data.title || 'Download',
      thumbnail: data.info?.image || null
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/progress', async (req, res) => {
  try {
    const { url } = req.query;
    const progressRes = await fetch(url);
    const data = await progressRes.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;
