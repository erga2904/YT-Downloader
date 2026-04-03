import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Film, Music, Loader2, AlertCircle, Link as LinkIcon, Settings2, Subtitles, ChevronDown, Info, Check, X, Trash2, History, Ghost, EyeOff, Eye, FolderOpen, ExternalLink, FileText, Play, Pause } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const translations = {
  en: {
    title: "YouTube Downloader",
    subtitle: "Download YouTube video and audio safely.",
    downloadTab: "Download",
    settingsTab: "Settings",
    privateMode: "Private",
    publicMode: "Public",
    privateModeActive: "Private Mode Active",
    privateModeDesc: "Downloads will not be saved to history.",
    videoDetected: "Video detected",
    urlPlaceholder: "https://...",
    urlLabel: "Media URL",
    formatLabel: "Format",
    video: "Video",
    audio: "Audio",
    qualityLabel: "Quality",
    qualityPlaceholder: "Select Resolution",
    checking: "Checking...",
    subtitlesLabel: "Download Subtitles",
    downloadBtn: "Download",
    processing: "Processing...",
    initializing: "Initializing...",
    secondsRemaining: "seconds remaining",
    advancedSettings: "Advanced Settings",
    autoStartLabel: "Auto Start Download",
    privateModeSetting: "Private Mode",
    privateModeInfo: "When enabled, your download history will not be recorded.",
    showConfirmationLabel: "Show Download Confirmation",
    downloadLocation: "Download Location",
    downloadLocationDesc: "By default, files are saved to your browser's default download folder. You can change this in your browser settings.",
    changeLocationChrome: "Change location in Chrome",
    changeLocationFirefox: "Change location in Firefox",
    downloadTip: "Tip: Enable \"Ask where to save each file before downloading\" in your browser settings for more control.",
    videoSettings: "Video Settings",
    audioSettings: "Audio Settings",
    appearance: "Appearance",
    historyManagement: "History Management",
    sort: "Sort",
    clearAll: "Clear All",
    noHistory: "No download history found.",
    readyToDownload: "Ready to Download",
    mediaProcessed: "Media processed successfully.",
    downloadMedia: "Download Media",
    downloadSubtitles: "Download Subtitles",
    embedSubtitlesLabel: "Embed Subtitles into Video",
    downloadTranscriptLabel: "Download Transcript (.txt)",
    viewTranscriptBtn: "View Transcript",
    subtitlesDetected: "Subtitles detected",
    noSubtitlesAvailable: "No subtitles available for this video",
    subtitlesWarning: "Note: Subtitle detection may be unreliable due to YouTube restrictions.",
    confirmationTitle: "Download Confirmation",
    confirmationDesc: "Are you sure you want to start downloading this media? This will consume bandwidth and processing power.",
    dontShowAgain: "Don't show this again",
    cancel: "Cancel",
    themeLabel: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    languageLabel: "Language",
    storageWarning: "High storage usage: {size} MB. Consider clearing history.",
    bitrateLabel: "Bitrate",
    frameRateLabel: "Frame Rate",
    codecLabel: "Codec",
    audioBitrateLabel: "Audio Bitrate",
    audioBitrateInfo: "Higher bitrate means better audio quality but results in larger file sizes. 320kbps is considered high quality.",
    sampleRateLabel: "Sample Rate",
    sampleRateInfo: "The number of audio samples carried per second. 44.1kHz is standard for CD quality, while 48kHz is common for video.",
    auto: "Auto",
    untitledMedia: "Untitled Media",
    deleteFromHistory: "Delete from history",
    confirm: "Confirm",
    saveSettings: "Save Settings",
    cancelDownload: "Cancel Download"
  },
  id: {
    title: "YouTube Downloader",
    subtitle: "Unduh video dan audio YouTube dengan aman.",
    downloadTab: "Unduh",
    settingsTab: "Pengaturan",
    privateMode: "Privat",
    publicMode: "Publik",
    privateModeActive: "Mode Privat Aktif",
    privateModeDesc: "Unduhan tidak akan disimpan ke riwayat.",
    videoDetected: "Video terdeteksi",
    urlPlaceholder: "https://...",
    urlLabel: "URL Media",
    formatLabel: "Format",
    video: "Video",
    audio: "Audio",
    qualityLabel: "Kualitas",
    qualityPlaceholder: "Pilih Resolusi",
    checking: "Memeriksa...",
    subtitlesLabel: "Unduh Subtitel",
    downloadBtn: "Unduh",
    processing: "Memproses...",
    initializing: "Menginisialisasi...",
    secondsRemaining: "detik tersisa",
    advancedSettings: "Pengaturan Lanjutan",
    autoStartLabel: "Mulai Unduhan Otomatis",
    privateModeSetting: "Mode Privat",
    privateModeInfo: "Saat diaktifkan, riwayat unduhan Anda tidak akan dicatat.",
    showConfirmationLabel: "Tampilkan Konfirmasi Unduhan",
    downloadLocation: "Lokasi Unduhan",
    downloadLocationDesc: "Secara default, file disimpan ke folder unduhan default browser Anda. Anda dapat mengubah ini di pengaturan browser Anda.",
    changeLocationChrome: "Ubah lokasi di Chrome",
    changeLocationFirefox: "Ubah lokasi di Firefox",
    downloadTip: "Tip: Aktifkan \"Tanya di mana menyimpan setiap file sebelum mengunduh\" di pengaturan browser Anda untuk kontrol lebih besar.",
    videoSettings: "Pengaturan Video",
    audioSettings: "Pengaturan Audio",
    appearance: "Tampilan",
    themeLabel: "Tema",
    historyManagement: "Manajemen Riwayat",
    sort: "Urutkan",
    clearAll: "Hapus Semua",
    noHistory: "Tidak ada riwayat unduhan ditemukan.",
    readyToDownload: "Siap untuk Diunduh",
    mediaProcessed: "Media berhasil diproses.",
    downloadMedia: "Unduh Media",
    downloadSubtitles: "Unduh Subtitel",
    embedSubtitlesLabel: "Masukkan Subtitel ke Video",
    downloadTranscriptLabel: "Unduh Transkrip (.txt)",
    viewTranscriptBtn: "Lihat Transkrip",
    subtitlesDetected: "Subtitel terdeteksi",
    noSubtitlesAvailable: "Tidak ada subtitel tersedia untuk video ini",
    subtitlesWarning: "Catatan: Deteksi subtitel mungkin tidak akurat karena pembatasan YouTube.",
    confirmationTitle: "Konfirmasi Unduhan",
    confirmationDesc: "Apakah Anda yakin ingin mulai mengunduh media ini? Ini akan menghabiskan bandwidth dan daya pemrosesan.",
    dontShowAgain: "Jangan tampilkan ini lagi",
    cancel: "Batal",
    themeLight: "Terang",
    themeDark: "Gelap",
    themeSystem: "Sistem",
    languageLabel: "Bahasa",
    storageWarning: "Penggunaan penyimpanan tinggi: {size} MB. Pertimbangkan untuk menghapus riwayat.",
    bitrateLabel: "Bitrate",
    frameRateLabel: "Frame Rate",
    codecLabel: "Codec",
    audioBitrateLabel: "Bitrate Audio",
    audioBitrateInfo: "Bitrate yang lebih tinggi berarti kualitas audio yang lebih baik tetapi menghasilkan ukuran file yang lebih besar. 320kbps dianggap kualitas tinggi.",
    sampleRateLabel: "Sample Rate",
    sampleRateInfo: "Jumlah sampel audio yang dibawa per detik. 44,1kHz adalah standar untuk kualitas CD, sedangkan 48kHz umum untuk video.",
    auto: "Otomatis",
    untitledMedia: "Media Tanpa Judul",
    deleteFromHistory: "Hapus dari riwayat",
    confirm: "Konfirmasi",
    saveSettings: "Simpan Pengaturan",
    cancelDownload: "Batalkan Unduhan"
  }
};

function CustomSelect({ value, onChange, options, label, disabled, isOpen, onToggle, info, placeholder }: { value: string; onChange: (val: string) => void; options: { label: string; value: string }[]; label: string; disabled?: boolean; isOpen: boolean; onToggle: () => void; info?: string; placeholder?: string }) {
  return (
  <div className="relative space-y-2">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-[rgb(var(--foreground))]/80">{label}</label>
        {info && (
          <div className="group relative">
            <Info className="w-3.5 h-3.5 text-[rgb(var(--foreground))]/40 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 pointer-events-none">
              {info}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[rgb(var(--foreground))]" />
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        className="w-full flex items-center justify-between bg-[rgb(var(--foreground))]/5 border border-[rgb(var(--foreground))]/10 rounded-md px-3 py-2 text-[rgb(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--foreground))]/40 transition-all disabled:opacity-50"
      >
        <span className={cn(!value && "text-[rgb(var(--foreground))]/40")}>
          {options.find(o => o.value === value)?.label || placeholder || value}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-[rgb(var(--foreground))]/40 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-[rgb(var(--background))] border border-[rgb(var(--foreground))]/10 rounded-md shadow-lg py-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); onToggle(); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-[rgb(var(--foreground))]/5 transition-colors text-[rgb(var(--foreground))]"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<'en' | 'id'>(() => (localStorage.getItem('language') as any) || 'en');
  const t = translations[language];
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<'video' | 'mp3'>('video');
  const [quality, setQuality] = useState('');
  const [downloadSubtitles, setDownloadSubtitles] = useState(false);
  const [embedSubtitles, setEmbedSubtitles] = useState(false);
  const [downloadTranscript, setDownloadTranscript] = useState(false);
  const [hasSubtitles, setHasSubtitles] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<{ url: string; title?: string; thumbnail?: string; subtitleUrl?: string; transcriptUrl?: string; transcript?: { text: string; start: number; duration: number }[] } | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const transcriptScrollRef = React.useRef<HTMLDivElement>(null);
  const playbackIntervalRef = React.useRef<any>(null);

  const togglePlayback = () => {
    if (isPlaying) {
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playbackIntervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
      }, 100);
    }
  };

  const handleReDownload = async () => {
    if (!reDownloadItem) return;
    
    setIsReDownloading(true);
    addToast('Contacting server...', 'info', false);
    
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: reDownloadItem.originalUrl, 
          format: reDownloadItem.format, 
          quality: reDownloadItem.quality 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to re-fetch');

      // Start polling
      pollProgress(data.progress_url, data.title, data.thumbnail);
      setReDownloadItem(null);
    } catch (err: any) {
      addToast(err.message, 'error');
    } finally {
      setIsReDownloading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
    };
  }, []);

  // Auto-scroll transcript
  React.useEffect(() => {
    if (showTranscript && result?.transcript && transcriptScrollRef.current) {
      const activeElement = transcriptScrollRef.current.querySelector('.active-transcript-line');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, showTranscript, result?.transcript]);
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [availableResolutions, setAvailableResolutions] = useState<{ label: string; value: string }[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ title: string; thumbnail: string | null } | null>(null);
  const [progressText, setProgressText] = useState(t.processing);
  const [progressValue, setProgressValue] = useState(0);
  const [downloadInfo, setDownloadInfo] = useState<{ speed: string; remaining: string } | null>(null);
  const prevProgress = React.useRef(0);
  const prevTime = React.useRef(Date.now());
  
  // Settings
  const [activeTab, setActiveTab] = useState<'download' | 'settings'>('download');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const [autoStart, setAutoStart] = useState(() => localStorage.getItem('autoStart') === 'true');
  const [bitrate, setBitrate] = useState(() => localStorage.getItem('bitrate') || 'auto');
  const [frameRate, setFrameRate] = useState(() => localStorage.getItem('frameRate') || 'auto');
  const [codec, setCodec] = useState(() => localStorage.getItem('codec') || 'h264');
  const [audioBitrate, setAudioBitrate] = useState(() => localStorage.getItem('audioBitrate') || '128');
  const [sampleRate, setSampleRate] = useState(() => localStorage.getItem('sampleRate') || '44100');
  const [history, setHistory] = useState<any[]>(() => JSON.parse(localStorage.getItem('history') || '[]'));
  const [storageWarning, setStorageWarning] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'dark');
  const [isPrivateMode, setIsPrivateMode] = useState(() => localStorage.getItem('isPrivateMode') === 'true');
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(() => localStorage.getItem('showDownloadConfirmation') !== 'false');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isReDownloading, setIsReDownloading] = useState(false);
  const [reDownloadItem, setReDownloadItem] = useState<any>(null);
  const pollTimeoutRef = React.useRef<any>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const [notifications, setNotifications] = useState<any[]>(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'New Features!', message: 'Added in-app downloads and higher resolutions.', date: Date.now(), read: false },
      { id: 2, title: 'Update', message: 'Check out the new features and improvements.', date: Date.now() - 86400000, read: false }
    ];
  });
  const [toasts, setToasts] = useState<any[]>([]);

  const playNotificationSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.error('Error playing sound:', e));
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info', playSound: boolean = true) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    if (playSound) playNotificationSound();
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleCancel = () => {
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus('idle');
    setProgressText('');
    setProgressValue(0);
    setDownloadInfo(null);
  };

  const [draftSettings, setDraftSettings] = useState({
    autoStart,
    bitrate,
    frameRate,
    codec,
    audioBitrate,
    sampleRate,
    theme,
    isPrivateMode,
    showDownloadConfirmation,
    language
  });

  // Fetch video info when URL changes
  React.useEffect(() => {
    const fetchInfo = async () => {
      if (!url || !url.startsWith('http')) {
        setAvailableResolutions([]);
        setVideoInfo(null);
        setQuality('');
        setHasSubtitles(false);
        setDownloadSubtitles(false);
        setEmbedSubtitles(false);
        setDownloadTranscript(false);
        return;
      }

      setIsCheckingUrl(true);
      try {
        const res = await fetch('/api/info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();
        if (res.ok) {
          setAvailableResolutions(data.resolutions);
          setVideoInfo({ title: data.title, thumbnail: data.thumbnail });
          setHasSubtitles(!!data.hasSubtitles);
          
          // If subtitles are available and user had them enabled, keep it, 
          // otherwise if not available, force disable
          if (!data.hasSubtitles) {
            setDownloadSubtitles(false);
            setEmbedSubtitles(false);
            setDownloadTranscript(false);
          }

          // Auto-select 720p if available
          if (data.resolutions.some((r: any) => r.value === '720')) {
            setQuality('720');
          }
        } else {
          setAvailableResolutions([]);
          setVideoInfo(null);
          setQuality('');
          setHasSubtitles(false);
          setDownloadSubtitles(false);
        }
      } catch (err) {
        setAvailableResolutions([]);
        setVideoInfo(null);
        setQuality('');
        setHasSubtitles(false);
        setDownloadSubtitles(false);
      } finally {
        setIsCheckingUrl(false);
      }
    };

    const timer = setTimeout(fetchInfo, 1000);
    return () => clearTimeout(timer);
  }, [url]);

  // Click outside listener for dropdowns
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync draft settings when tab changes to settings
  React.useEffect(() => {
    if (activeTab === 'settings') {
      setDraftSettings({
        autoStart,
        bitrate,
        frameRate,
        codec,
        audioBitrate,
        sampleRate,
        theme,
        isPrivateMode,
        showDownloadConfirmation,
        language
      });
    }
  }, [activeTab, autoStart, bitrate, frameRate, codec, audioBitrate, sampleRate, theme, isPrivateMode, showDownloadConfirmation, language]);

  // Save Private Mode preference
  React.useEffect(() => {
    localStorage.setItem('isPrivateMode', isPrivateMode.toString());
  }, [isPrivateMode]);

  const handleSaveSettings = () => {
    setAutoStart(draftSettings.autoStart);
    setBitrate(draftSettings.bitrate);
    setFrameRate(draftSettings.frameRate);
    setCodec(draftSettings.codec);
    setAudioBitrate(draftSettings.audioBitrate);
    setSampleRate(draftSettings.sampleRate);
    setTheme(draftSettings.theme);
    setIsPrivateMode(draftSettings.isPrivateMode);
    setShowDownloadConfirmation(draftSettings.showDownloadConfirmation);
    setLanguage(draftSettings.language as any);
    
    localStorage.setItem('autoStart', draftSettings.autoStart.toString());
    localStorage.setItem('bitrate', draftSettings.bitrate);
    localStorage.setItem('frameRate', draftSettings.frameRate);
    localStorage.setItem('codec', draftSettings.codec);
    localStorage.setItem('audioBitrate', draftSettings.audioBitrate);
    localStorage.setItem('sampleRate', draftSettings.sampleRate);
    localStorage.setItem('theme', draftSettings.theme);
    localStorage.setItem('isPrivateMode', draftSettings.isPrivateMode.toString());
    localStorage.setItem('showDownloadConfirmation', draftSettings.showDownloadConfirmation.toString());
    localStorage.setItem('language', draftSettings.language);
    
    addToast('Settings saved successfully', 'success', false);
    setActiveTab('download');
  };

  // Apply theme
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Save settings to localStorage
  React.useEffect(() => {
    localStorage.setItem('autoStart', String(autoStart));
    localStorage.setItem('bitrate', bitrate);
    localStorage.setItem('frameRate', frameRate);
    localStorage.setItem('codec', codec);
    localStorage.setItem('audioBitrate', audioBitrate);
    localStorage.setItem('sampleRate', sampleRate);
    localStorage.setItem('isPrivateMode', String(isPrivateMode));
    localStorage.setItem('showDownloadConfirmation', String(showDownloadConfirmation));
    localStorage.setItem('language', language);
  }, [autoStart, bitrate, frameRate, codec, audioBitrate, sampleRate, isPrivateMode, showDownloadConfirmation, language]);

  // Check storage size
  React.useEffect(() => {
    let total = 0;
    for (let x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        total += ((localStorage[x].length + x.length) * 2);
      }
    }
    const sizeInMB = (total / 1024 / 1024).toFixed(2);
    if (parseFloat(sizeInMB) > 4) {
      setStorageWarning(t.storageWarning.replace('{size}', sizeInMB));
    }
  }, [history, t.storageWarning]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const addToHistory = (item: any) => {
    if (isPrivateMode) return;
    const newHistory = [...history, { ...item, timestamp: Date.now() }];
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('history');
    setStorageWarning('');
  };

  const sortHistoryBySize = () => {
    const sorted = [...history].sort((a, b) => (JSON.stringify(b).length - JSON.stringify(a).length));
    setHistory(sorted);
  };

  const deleteHistoryItem = (timestamp: number) => {
    const newHistory = history.filter(item => item.timestamp !== timestamp);
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const handleDownload = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url) return;

    if (showDownloadConfirmation && !isConfirmationModalOpen) {
      setIsConfirmationModalOpen(true);
      return;
    }

    setIsConfirmationModalOpen(false);
    if (dontShowAgain) {
      setDraftSettings(prev => ({ ...prev, showDownloadConfirmation: false }));
    }

    setStatus('loading');
    setErrorMessage('');
    setResult(null);
    setProgressText(t.initializing);
    setProgressValue(0);
    setDownloadInfo(null);
    prevProgress.current = 0;
    prevTime.current = Date.now();

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format, quality, downloadSubtitles, embedSubtitles, downloadTranscript, autoStart, bitrate, frameRate, codec, audioBitrate, sampleRate }),
        signal: abortControllerRef.current.signal
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to download media');
      }

      if (data.progress_url) {
        pollProgress(data.progress_url, data.title, data.thumbnail);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong');
    } finally {
      abortControllerRef.current = null;
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const pollProgress = async (progressUrl: string, title: string, thumbnail: string) => {
    try {
      abortControllerRef.current = new AbortController();
      // Use proxy to avoid absolute URL and CORS issues on Vercel
      const proxyUrl = `/api/progress?url=${encodeURIComponent(progressUrl)}`;
      const res = await fetch(proxyUrl, { signal: abortControllerRef.current.signal });
      
      if (!res.ok) {
        throw new Error(`Progress server error: ${res.status}`);
      }
      
      const data = await res.json();

      if (data.success === 1 && data.download_url) {
        setResult({ 
          url: data.download_url, 
          title, 
          thumbnail, 
          subtitleUrl: data.subtitle_url,
          transcriptUrl: data.transcript_url,
          transcript: data.transcript 
        });
        setStatus('success');
        const filename = `${title || 'download'}.${format === 'mp3' ? 'mp3' : 'mp4'}`;
        downloadFile(data.download_url, filename);
        addToast('Download completed!', 'success');
        addToHistory({ url: data.download_url, originalUrl: url, title, thumbnail, format, quality });
        setDownloadInfo(null);
      } else if (data.success === 0) {
        setProgressText(data.text || t.processing);
        const currentProgress = data.progress ? (data.progress / 10) : 0;
        setProgressValue(currentProgress);
        
        // Calculate speed and remaining time
        const currentTime = Date.now();
        const timeDiff = (currentTime - prevTime.current) / 1000; // seconds
        const progressDiff = currentProgress - prevProgress.current;
        
        if (timeDiff > 0 && progressDiff > 0) {
          const speed = (progressDiff / timeDiff).toFixed(1); // % per second
          const remaining = Math.max(0, Math.round((100 - currentProgress) / (progressDiff / timeDiff))); // seconds
          setDownloadInfo({ speed: `${speed}%/s`, remaining: `${remaining} ${t.secondsRemaining}` });
        }
        
        prevProgress.current = currentProgress;
        prevTime.current = currentTime;
        
        pollTimeoutRef.current = setTimeout(() => pollProgress(progressUrl, title, thumbnail), 2000);
      } else {
        throw new Error(data.text || 'Failed to process video');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong while checking progress');
    } finally {
      abortControllerRef.current = null;
    }
  };

  const isLoading = status === 'loading';

  return (
  <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center w-full">
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl"
        >
          <div className="bg-[rgb(var(--background))]/70 backdrop-blur-xl border border-[rgb(var(--foreground))]/10 shadow-2xl rounded-2xl p-8 transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
              YouTube Downloader
            </h1>
            <p className="text-[rgb(var(--foreground))]/60 text-sm mt-1">
              {t.subtitle}
            </p>
          </div>
          
          <div className="flex border-b border-[rgb(var(--foreground))]/10 mb-8">
            <button
              onClick={() => setActiveTab('download')}
              className={cn(
                "pb-3 px-4 text-sm font-medium transition-all duration-200 hover:bg-[rgb(var(--foreground))]/5 active:bg-[rgb(var(--foreground))]/10 rounded-t-md",
                activeTab === 'download' ? "text-[rgb(var(--foreground))] border-b-2 border-[rgb(var(--foreground))]" : "text-[rgb(var(--foreground))]/50"
              )}
            >
              {t.downloadTab}
            </button>
            <div className="ml-auto flex items-center gap-2 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={cn(
                  "p-1.5 rounded-md transition-all flex items-center gap-2",
                  activeTab === 'settings'
                    ? "bg-[rgb(var(--foreground))]/10 text-[rgb(var(--foreground))]"
                    : "text-[rgb(var(--foreground))]/30 hover:text-[rgb(var(--foreground))]/50 hover:bg-[rgb(var(--foreground))]/5"
                )}
                title={t.settingsTab}
              >
                <Settings2 className="w-4 h-4" />
                {activeTab === 'settings' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Settings</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  const newValue = !isPrivateMode;
                  setIsPrivateMode(newValue);
                  if (activeTab === 'settings') {
                    setDraftSettings(prev => ({ ...prev, isPrivateMode: newValue }));
                  }
                }}
                className={cn(
                  "p-1.5 rounded-md transition-all flex items-center gap-2",
                  isPrivateMode 
                    ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" 
                    : "text-[rgb(var(--foreground))]/30 hover:text-[rgb(var(--foreground))]/50 hover:bg-[rgb(var(--foreground))]/5"
                )}
                title={isPrivateMode ? t.privateModeActive : t.privateModeSetting}
              >
                {isPrivateMode ? <Ghost className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                  {isPrivateMode ? t.privateMode : t.publicMode}
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Toasts - Fixed position outside tab layout */}
            <div className="fixed top-4 right-4 z-[100] space-y-2 pointer-events-none">
              <AnimatePresence>
                {toasts.map(toast => (
                  <motion.div
                    key={toast.id}
                    layout
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className={cn(
                      "px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md flex items-center gap-3 min-w-[200px] pointer-events-auto",
                      toast.type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                      toast.type === 'error' ? "bg-red-500/10 border-red-500/20 text-red-500" :
                      "bg-[rgb(var(--foreground))]/10 border-[rgb(var(--foreground))]/10 text-[rgb(var(--foreground))]"
                    )}
                  >
                    {toast.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : 
                     toast.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : 
                     <div className="w-4 h-4 bg-blue-500 rounded-full shrink-0" />}
                    <span className="text-sm font-medium">{toast.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'download' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'download' ? 10 : -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'download' ? (
                <div className="space-y-6">
                  {isPrivateMode && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center gap-3 mb-2"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Ghost className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-purple-500 uppercase tracking-wider">{t.privateModeActive}</p>
                        <p className="text-[10px] text-purple-500/60 truncate">{t.privateModeDesc}</p>
                      </div>
                    </motion.div>
                  )}

                  {videoInfo && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-[rgb(var(--foreground))]/5 border border-[rgb(var(--foreground))]/10 rounded-xl flex items-center gap-3 mb-2"
                    >
                      {videoInfo.thumbnail && (
                        <img src={videoInfo.thumbnail} alt="" className="w-16 h-10 rounded object-cover border border-[rgb(var(--foreground))]/10 shrink-0" referrerPolicy="no-referrer" />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[rgb(var(--foreground))] truncate">{videoInfo.title}</p>
                        <p className="text-[10px] text-[rgb(var(--foreground))]/40">{t.videoDetected}</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleDownload} className="space-y-6">
              {/* ... existing form fields ... */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[rgb(var(--foreground))]/80 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> {t.urlLabel}
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.urlPlaceholder}
                  required
                  disabled={isLoading}
                  className="w-full bg-[rgb(var(--foreground))]/5 border border-[rgb(var(--foreground))]/10 rounded-md px-3 py-2 text-[rgb(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--foreground))]/40 transition-all disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[rgb(var(--foreground))]/80 flex items-center gap-2">
                    <Settings2 className="w-4 h-4" /> {t.formatLabel}
                  </label>
                  <div className="flex bg-[rgb(var(--foreground))]/5 p-1 rounded-md">
                    <button
                      type="button"
                      onClick={() => setFormat('video')}
                      disabled={isLoading}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-sm font-medium transition-all",
                        format === 'video' ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm" : "text-[rgb(var(--foreground))]/50 hover:text-[rgb(var(--foreground))]/80 disabled:opacity-50"
                      )}
                    >
                      <Film className="w-4 h-4" /> {t.video}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormat('mp3');
                        setDownloadSubtitles(false);
                      }}
                      disabled={isLoading}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-sm font-medium transition-all",
                        format === 'mp3' ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm" : "text-[rgb(var(--foreground))]/50 hover:text-[rgb(var(--foreground))]/80 disabled:opacity-50"
                      )}
                    >
                      <Music className="w-4 h-4" /> {t.audio}
                    </button>
                  </div>
                </div>

                {format === 'video' ? (
                  <CustomSelect
                    label={t.qualityLabel}
                    placeholder={isCheckingUrl ? t.checking : t.qualityPlaceholder}
                    value={quality}
                    onChange={setQuality}
                    disabled={isLoading || isCheckingUrl || availableResolutions.length === 0}
                    isOpen={openDropdown === 'Quality'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Quality' ? null : 'Quality')}
                    options={availableResolutions}
                  />
                ) : (
                  <CustomSelect
                    label={t.audioBitrateLabel}
                    value={audioBitrate}
                    onChange={setAudioBitrate}
                    disabled={isLoading}
                    isOpen={openDropdown === 'Audio Bitrate'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Audio Bitrate' ? null : 'Audio Bitrate')}
                    options={[
                      { label: "128 kbps", value: "128" },
                      { label: "192 kbps", value: "192" },
                      { label: "320 kbps", value: "320" },
                    ]}
                  />
                )}
              </div>

                {/* Subtitles Options */}
                {format === 'video' && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Subtitles className={cn("w-4 h-4", !hasSubtitles ? "text-[rgb(var(--foreground))]/20" : "text-[rgb(var(--foreground))]/60")} />
                        <span className={cn("text-sm", !hasSubtitles ? "text-[rgb(var(--foreground))]/30" : "text-[rgb(var(--foreground))]/80")}>
                          {t.subtitlesLabel}
                        </span>
                      </div>
                      <button
                        type="button"
                        disabled={!hasSubtitles || isLoading}
                        onClick={() => setDownloadSubtitles(!downloadSubtitles)}
                        className={cn(
                          "w-10 h-5 rounded-full transition-all flex items-center p-0.5",
                          !hasSubtitles ? "bg-[rgb(var(--foreground))]/5 cursor-not-allowed opacity-50" : 
                          downloadSubtitles ? "bg-purple-500 justify-end" : "bg-[rgb(var(--foreground))]/20 justify-start"
                        )}
                      >
                        <motion.div layout className="w-4 h-4 bg-[rgb(var(--background))] rounded-full shadow-sm" />
                      </button>
                    </div>

                    {/* Subtitle Warning */}
                    <div className="flex items-start gap-2 px-1">
                      <div className="mt-0.5">
                        <div className="w-1 h-1 rounded-full bg-amber-500" />
                      </div>
                      <p className="text-[10px] leading-tight text-amber-500/80 italic">
                        {t.subtitlesWarning}
                      </p>
                    </div>

                    {downloadSubtitles && hasSubtitles && (
                      <div className="space-y-2 pl-6">
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-[rgb(var(--foreground))]/60">
                            {t.embedSubtitlesLabel}
                          </span>
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setEmbedSubtitles(!embedSubtitles)}
                            className={cn(
                              "w-8 h-4 rounded-full transition-all flex items-center p-0.5",
                              embedSubtitles ? "bg-purple-500 justify-end" : "bg-[rgb(var(--foreground))]/20 justify-start"
                            )}
                          >
                            <motion.div layout className="w-3 h-3 bg-[rgb(var(--background))] rounded-full shadow-sm" />
                          </button>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-[rgb(var(--foreground))]/60">
                            {t.downloadTranscriptLabel}
                          </span>
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setDownloadTranscript(!downloadTranscript)}
                            className={cn(
                              "w-8 h-4 rounded-full transition-all flex items-center p-0.5",
                              downloadTranscript ? "bg-purple-500 justify-end" : "bg-[rgb(var(--foreground))]/20 justify-start"
                            )}
                          >
                            <motion.div layout className="w-3 h-3 bg-[rgb(var(--background))] rounded-full shadow-sm" />
                          </button>
                        </motion.div>
                      </div>
                    )}

                    {!hasSubtitles && url && !isCheckingUrl && (
                      <p className="text-[10px] text-[rgb(var(--foreground))]/30 italic pl-6">
                        {t.noSubtitlesAvailable}
                      </p>
                    )}

                    {hasSubtitles && url && !isCheckingUrl && (
                      <p className="text-[10px] text-green-500/60 italic pl-6 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> {t.subtitlesDetected}
                      </p>
                    )}
                  </div>
                )}

              <button
                type="submit"
                disabled={isLoading || !url || (format === 'video' && !quality && !availableResolutions.length)}
                className="w-full bg-[rgb(var(--foreground))] hover:bg-[rgb(var(--foreground))]/90 text-[rgb(var(--background))] font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> 
                    <div className="flex flex-col items-center">
                      <span>{progressText} {progressValue > 0 && `(${Math.round(progressValue)}%)`}</span>
                      {downloadInfo && (
                        <span className="text-xs opacity-75">
                          {downloadInfo.speed} | {downloadInfo.remaining}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> {t.downloadBtn}
                  </>
                )}
              </button>
              {isLoading && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full mt-2 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-md transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> {t.cancelDownload}
                </button>
              )}
            </form>
          </div>
        ) : (
            <div className="space-y-6">
              {storageWarning && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 text-sm">
                  {storageWarning}
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">{t.advancedSettings}</h3>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="autoStart" className="text-sm text-[rgb(var(--foreground))]/80">{t.autoStartLabel}</label>
                  <button
                    type="button"
                    onClick={() => setDraftSettings(prev => ({ ...prev, autoStart: !prev.autoStart }))}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors flex items-center p-0.5 hover:bg-[rgb(var(--foreground))]/10 active:bg-[rgb(var(--foreground))]/20",
                      draftSettings.autoStart ? "bg-[rgb(var(--foreground))] justify-end" : "bg-[rgb(var(--foreground))]/20 justify-start"
                    )}
                  >
                    <motion.div layout className="w-4 h-4 bg-[rgb(var(--background))] rounded-full shadow-sm" />
                  </button>
                </div>
                

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label htmlFor="isPrivateMode" className="text-sm text-[rgb(var(--foreground))]/80">{t.privateModeSetting}</label>
                    <div className="group relative">
                      <Info className="w-3.5 h-3.5 text-[rgb(var(--foreground))]/40 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 pointer-events-none">
                        {t.privateModeInfo}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[rgb(var(--foreground))]" />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDraftSettings(prev => ({ ...prev, isPrivateMode: !prev.isPrivateMode }))}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors flex items-center p-0.5 hover:bg-[rgb(var(--foreground))]/10 active:bg-[rgb(var(--foreground))]/20",
                      draftSettings.isPrivateMode ? "bg-purple-500 justify-end" : "bg-[rgb(var(--foreground))]/20 justify-start"
                    )}
                  >
                    <motion.div layout className="w-4 h-4 bg-[rgb(var(--background))] rounded-full shadow-sm flex items-center justify-center">
                      {draftSettings.isPrivateMode && <Ghost className="w-2.5 h-2.5 text-purple-500" />}
                    </motion.div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="showDownloadConfirmation" className="text-sm text-[rgb(var(--foreground))]/80">{t.showConfirmationLabel}</label>
                  <button
                    type="button"
                    onClick={() => setDraftSettings(prev => ({ ...prev, showDownloadConfirmation: !prev.showDownloadConfirmation }))}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors flex items-center p-0.5 hover:bg-[rgb(var(--foreground))]/10 active:bg-[rgb(var(--foreground))]/20",
                      draftSettings.showDownloadConfirmation ? "bg-[rgb(var(--foreground))] justify-end" : "bg-[rgb(var(--foreground))]/20 justify-start"
                    )}
                  >
                    <motion.div layout className="w-4 h-4 bg-[rgb(var(--background))] rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[rgb(var(--foreground))]/10">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" /> {t.downloadLocation}
                </h3>
                <div className="p-4 bg-[rgb(var(--foreground))]/5 rounded-xl border border-[rgb(var(--foreground))]/10 space-y-3">
                  <p className="text-xs text-[rgb(var(--foreground))]/60 leading-relaxed">
                    {t.downloadLocationDesc}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://support.google.com/chrome/answer/95759" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] flex items-center gap-1.5 text-[rgb(var(--foreground))]/40 hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> {t.changeLocationChrome}
                    </a>
                    <a 
                      href="https://support.mozilla.org/en-US/kb/where-find-and-manage-downloaded-files-firefox" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] flex items-center gap-1.5 text-[rgb(var(--foreground))]/40 hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> {t.changeLocationFirefox}
                    </a>
                  </div>
                  <div className="mt-2 p-2 bg-[rgb(var(--foreground))]/5 rounded border border-[rgb(var(--foreground))]/5">
                    <p className="text-[9px] text-[rgb(var(--foreground))]/30 italic">
                      {t.downloadTip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[rgb(var(--foreground))]/10">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">{t.videoSettings}</h3>
                
                <div className="space-y-2">
                  <CustomSelect
                    label={t.bitrateLabel}
                    value={draftSettings.bitrate}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, bitrate: val }))}
                    isOpen={openDropdown === 'Bitrate'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Bitrate' ? null : 'Bitrate')}
                    options={[
                      { label: t.auto, value: "auto" },
                      { label: "2000 kbps", value: "2000" },
                      { label: "5000 kbps", value: "5000" },
                      { label: "10000 kbps", value: "10000" },
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <CustomSelect
                    label={t.frameRateLabel}
                    value={draftSettings.frameRate}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, frameRate: val }))}
                    isOpen={openDropdown === 'Frame Rate'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Frame Rate' ? null : 'Frame Rate')}
                    options={[
                      { label: t.auto, value: "auto" },
                      { label: "24 fps", value: "24" },
                      { label: "30 fps", value: "30" },
                      { label: "60 fps", value: "60" },
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <CustomSelect
                    label={t.codecLabel}
                    value={draftSettings.codec}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, codec: val }))}
                    isOpen={openDropdown === 'Codec'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Codec' ? null : 'Codec')}
                    options={[
                      { label: "H.264", value: "h264" },
                      { label: "H.265 (HEVC)", value: "h265" },
                      { label: "VP9", value: "vp9" },
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[rgb(var(--foreground))]/10">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">{t.audioSettings}</h3>
                
                <div className="space-y-2">
                  <CustomSelect
                    label={t.audioBitrateLabel}
                    info={t.audioBitrateInfo}
                    value={draftSettings.audioBitrate}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, audioBitrate: val }))}
                    isOpen={openDropdown === 'Audio Bitrate'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Audio Bitrate' ? null : 'Audio Bitrate')}
                    options={[
                      { label: "128 kbps", value: "128" },
                      { label: "192 kbps", value: "192" },
                      { label: "320 kbps", value: "320" },
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <CustomSelect
                    label={t.sampleRateLabel}
                    info={t.sampleRateInfo}
                    value={draftSettings.sampleRate}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, sampleRate: val }))}
                    isOpen={openDropdown === 'Sample Rate'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Sample Rate' ? null : 'Sample Rate')}
                    options={[
                      { label: "44.1 kHz", value: "44100" },
                      { label: "48 kHz", value: "48000" },
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[rgb(var(--foreground))]/10">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">{t.appearance}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomSelect
                    label={t.themeLabel}
                    value={draftSettings.theme}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, theme: val as any }))}
                    isOpen={openDropdown === 'Theme'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Theme' ? null : 'Theme')}
                    options={[
                      { label: t.themeLight, value: "light" },
                      { label: t.themeDark, value: "dark" },
                      { label: t.themeSystem, value: "system" },
                    ]}
                  />
                  <CustomSelect
                    label={t.languageLabel}
                    value={draftSettings.language}
                    onChange={(val) => setDraftSettings(prev => ({ ...prev, language: val as any }))}
                    isOpen={openDropdown === 'Language'}
                    onToggle={() => setOpenDropdown(openDropdown === 'Language' ? null : 'Language')}
                    options={[
                      { label: "English", value: "en" },
                      { label: "Bahasa Indonesia", value: "id" },
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[rgb(var(--foreground))]/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4" /> {t.historyManagement}
                  </h3>
                  {history.length > 0 && (
                    <div className="flex gap-2">
                      <button onClick={sortHistoryBySize} className="text-[10px] bg-[rgb(var(--foreground))]/5 hover:bg-[rgb(var(--foreground))]/10 text-[rgb(var(--foreground))]/60 px-2 py-1 rounded transition-colors">{t.sort}</button>
                      <button onClick={clearHistory} className="text-[10px] bg-red-500/5 hover:bg-red-500/10 text-red-500/60 px-2 py-1 rounded transition-colors">{t.clearAll}</button>
                    </div>
                  )}
                </div>
                
                {history.length > 0 ? (
                  <div className="space-y-2 mt-4 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    {history.slice().reverse().map((item) => (
                      <div key={item.timestamp} className="flex items-center justify-between p-2.5 bg-[rgb(var(--foreground))]/5 rounded-lg border border-[rgb(var(--foreground))]/10 group hover:border-[rgb(var(--foreground))]/20 transition-all">
                        <div className="flex items-center gap-3 min-w-0">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt="" className="w-10 h-10 rounded object-cover shrink-0 border border-[rgb(var(--foreground))]/10" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-[rgb(var(--foreground))]/10 flex items-center justify-center shrink-0">
                              <Film className="w-5 h-5 text-[rgb(var(--foreground))]/20" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[rgb(var(--foreground))] truncate pr-2">{item.title || t.untitledMedia}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] font-bold text-[rgb(var(--foreground))]/30 uppercase px-1 bg-[rgb(var(--foreground))]/5 rounded">
                                {item.format}
                              </span>
                              <span className="text-[9px] text-[rgb(var(--foreground))]/40">
                                {item.quality}p • {new Date(item.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch(item.url, { method: 'HEAD' });
                                if (response.ok) {
                                  downloadFile(item.url, `${item.title || 'download'}.${item.format === 'mp3' ? 'mp3' : 'mp4'}`);
                                  addToast('Downloading from history...', 'info', false);
                                } else {
                                  throw new Error('Link expired');
                                }
                              } catch (e) {
                                setReDownloadItem({ ...item });
                              }
                            }}
                            className={cn(
                              "p-2 rounded-md transition-all text-[rgb(var(--foreground))]/40 hover:text-green-500 hover:bg-green-500/10",
                              isReDownloading && "animate-pulse"
                            )}
                            title={t.downloadMedia}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteHistoryItem(item.timestamp)}
                            className="p-2 text-[rgb(var(--foreground))]/40 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                            title={t.deleteFromHistory}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {reDownloadItem && (
                    <div className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[rgb(var(--background))] border border-[rgb(var(--foreground))]/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl"
                      >
                        <h4 className="text-sm font-bold mb-2">Link Sesi Habis</h4>
                        <p className="text-xs text-[rgb(var(--foreground))]/60 mb-6">
                          Link download ini sudah kedaluwarsa. Apakah Anda ingin mendownload ulang video ini ("{reDownloadItem.title}") secara otomatis?
                        </p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setReDownloadItem(null)}
                            className="flex-1 py-2 text-xs font-medium border border-[rgb(var(--foreground))]/10 rounded-lg hover:bg-[rgb(var(--foreground))]/5"
                          >
                            Batal
                          </button>
                          <button 
                            onClick={handleReDownload}
                            className="flex-1 py-2 text-xs font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg shadow-green-500/20"
                          >
                            Ya, Download Ulang
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                ) : (
                  <div className="py-8 text-center bg-[rgb(var(--foreground))]/5 rounded-xl border border-dashed border-[rgb(var(--foreground))]/10">
                    <p className="text-xs text-[rgb(var(--foreground))]/30 italic">{t.noHistory}</p>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSaveSettings}
                  className="w-full py-3 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-xl font-semibold hover:bg-[rgb(var(--foreground))]/90 transition-all shadow-lg shadow-[rgb(var(--foreground))]/10"
                >
                  {t.saveSettings}
                </button>
              </div>
            </div>
          )}
          </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-start gap-3 text-red-500"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </motion.div>
            )}

            {status === 'success' && result && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-6 bg-[rgb(var(--foreground))]/5 border border-[rgb(var(--foreground))]/10 rounded-md text-center space-y-4"
              >
                {result.thumbnail && (
                  <div className="relative w-full aspect-video rounded overflow-hidden border border-[rgb(var(--foreground))]/10 mb-4">
                    <img src={result.thumbnail} alt={result.title || 'Video thumbnail'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
                
                <div>
                  <h3 className="text-base font-medium text-[rgb(var(--foreground))] mb-1 line-clamp-2">{result.title || t.readyToDownload}</h3>
                  <p className="text-sm text-[rgb(var(--foreground))]/60">{t.mediaProcessed}</p>
                </div>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[rgb(var(--background))] border border-[rgb(var(--foreground))]/20 hover:bg-[rgb(var(--foreground))]/5 text-[rgb(var(--foreground))] font-medium py-2.5 px-4 rounded-md transition-all"
                >
                  <Download className="w-4 h-4" /> {t.downloadMedia}
                </a>
                {result.subtitleUrl && (
                  <a
                    href={result.subtitleUrl}
                    download={`${result.title || 'subtitles'}.srt`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[rgb(var(--foreground))]/10 border border-[rgb(var(--foreground))]/10 hover:bg-[rgb(var(--foreground))]/20 text-[rgb(var(--foreground))] font-medium py-2.5 px-4 rounded-md transition-all"
                  >
                    <Subtitles className="w-4 h-4" /> {t.downloadSubtitles}
                  </a>
                )}

                {result.transcriptUrl && (
                  <a
                    href={result.transcriptUrl}
                    download={`${result.title || 'transcript'}.txt`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[rgb(var(--foreground))]/10 border border-[rgb(var(--foreground))]/10 hover:bg-[rgb(var(--foreground))]/20 text-[rgb(var(--foreground))] font-medium py-2.5 px-4 rounded-md transition-all"
                  >
                    <FileText className="w-4 h-4" /> {t.downloadTranscriptLabel}
                  </a>
                )}

                {result.transcript && result.transcript.length > 0 && (
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="inline-flex items-center justify-center gap-2 w-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-500 font-medium py-2.5 px-4 rounded-md transition-all"
                    >
                      <Subtitles className="w-4 h-4" /> {t.viewTranscriptBtn}
                    </button>

                    {showTranscript && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[rgb(var(--background))] border border-[rgb(var(--foreground))]/10 rounded-xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-[rgb(var(--foreground))]/10 flex items-center justify-between bg-[rgb(var(--foreground))]/5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--foreground))]/40">Transcript</span>
                          <button 
                            onClick={togglePlayback}
                            className="p-1.5 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                          >
                            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          </button>
                        </div>
                        <div 
                          ref={transcriptScrollRef}
                          className="max-h-60 overflow-y-auto p-4 space-y-4 custom-scrollbar"
                        >
                          {result.transcript.map((line, idx) => {
                            const isActive = currentTime >= line.start && currentTime < (line.start + line.duration);
                            return (
                              <div 
                                key={idx} 
                                className={cn(
                                  "transition-all duration-300 rounded-lg p-2 cursor-pointer hover:bg-[rgb(var(--foreground))]/5",
                                  isActive ? "active-transcript-line bg-purple-500/10 border-l-2 border-purple-500 pl-3" : "opacity-40"
                                )}
                                onClick={() => {
                                  setCurrentTime(line.start);
                                  if (!isPlaying) togglePlayback();
                                }}
                              >
                                <span className="text-[10px] font-mono text-purple-500 block mb-1">
                                  {Math.floor(line.start / 60)}:{Math.floor(line.start % 60).toString().padStart(2, '0')}
                                </span>
                                <p className={cn(
                                  "text-sm leading-relaxed",
                                  isActive ? "text-[rgb(var(--foreground))] font-medium" : "text-[rgb(var(--foreground))]/80"
                                )}>
                                  {line.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        </motion.div>
      </div>

      <footer className="w-full py-6 text-center">
      </footer>

      <AnimatePresence>
        {isConfirmationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmationModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-[rgb(var(--background))] border border-[rgb(var(--foreground))]/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">{t.confirmationTitle}</h3>
                <button 
                  onClick={() => setIsConfirmationModalOpen(false)}
                  className="p-1 hover:bg-[rgb(var(--foreground))]/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[rgb(var(--foreground))]/40" />
                </button>
              </div>
              
              <p className="text-sm text-[rgb(var(--foreground))]/60 mb-6">
                {t.confirmationDesc}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setDontShowAgain(!dontShowAgain)}
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    dontShowAgain 
                      ? "bg-[rgb(var(--foreground))] border-[rgb(var(--foreground))]" 
                      : "border-[rgb(var(--foreground))]/20 hover:border-[rgb(var(--foreground))]/40"
                  )}
                >
                  {dontShowAgain && <Check className="w-3.5 h-3.5 text-[rgb(var(--background))]" />}
                </button>
                <label 
                  onClick={() => setDontShowAgain(!dontShowAgain)}
                  className="text-sm text-[rgb(var(--foreground))]/80 cursor-pointer select-none"
                >
                  {t.dontShowAgain}
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsConfirmationModalOpen(false)}
                  className="flex-1 py-2 rounded-md border border-[rgb(var(--foreground))]/10 text-[rgb(var(--foreground))]/60 hover:bg-[rgb(var(--foreground))]/5 transition-all text-sm font-medium"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={() => handleDownload()}
                  className="flex-1 py-2 rounded-md bg-[rgb(var(--foreground))] text-[rgb(var(--background))] hover:bg-[rgb(var(--foreground))]/90 transition-all text-sm font-medium"
                >
                  {t.downloadBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
