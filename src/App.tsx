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

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  label: string;
  disabled?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  info?: string;
  placeholder?: string;
}

function CustomSelect({ value, onChange, options, label, disabled, isOpen, onToggle, info, placeholder }: DropdownProps) {
  return (
    <div className="relative space-y-2">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium opacity-80">{label}</label>
        {info && (
          <div className="group relative">
            <Info className="w-3.5 h-3.5 opacity-40 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 pointer-events-none">
              {info}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/40 transition-all disabled:opacity-50"
      >
        <span className={cn(!value && "opacity-40")}>
          {options.find(o => o.value === value)?.label || placeholder || value}
        </span>
        <ChevronDown className={cn("w-4 h-4 opacity-40 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-slate-800 border border-white/10 rounded-md shadow-lg py-1"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => { onChange(option.value); onToggle(); }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors text-white"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<'en' | 'id'>(() => (localStorage.getItem('language') as any) || 'en');
  const t = translations[language];
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<'video' | 'mp3'>('video');
  const [quality, setQuality] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<any>(null);
  const [availableResolutions, setAvailableResolutions] = useState<{ label: string; value: string }[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ title: string; thumbnail: string | null } | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [activeTab, setActiveTab] = useState<'download' | 'settings'>('download');
  const [isPrivateMode, setIsPrivateMode] = useState(() => localStorage.getItem('isPrivateMode') === 'true');
  const [history, setHistory] = useState<any[]>(() => JSON.parse(localStorage.getItem('history') || '[]'));
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'dark');
  const [toasts, setToasts] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const pollTimeoutRef = React.useRef<any>(null);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleDownload = async (directUrl?: string) => {
    const finalUrl = directUrl || url;
    if (!finalUrl) return;
    setStatus('loading'); setProgressValue(0);
    try {
      const res = await fetch('/api/download', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ url: finalUrl, format, quality }) 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      pollProgress(data.progress_url, data.title, data.thumbnail, finalUrl);
    } catch (err: any) { 
      setStatus('error'); 
      setErrorMessage(err.message);
      addToast(err.message, 'error');
    }
  };

  const pollProgress = async (progressUrl: string, title: string, thumbnail: string, originalUrl: string) => {
    try {
      const res = await fetch(`/api/progress?url=${encodeURIComponent(progressUrl)}`);
      const data = await res.json();
      if (data.success === 1) {
        setResult({ url: data.download_url, title, thumbnail }); 
        setStatus('success');
        const a = document.createElement('a'); a.href = data.download_url; a.download = `${title}.${format === 'mp3' ? 'mp3' : 'mp4'}`; a.click();
        addToast('Download completed!', 'success');
        if (!isPrivateMode) {
          const newHistory = [{ title, thumbnail, originalUrl, timestamp: Date.now() }, ...history].slice(0, 20);
          setHistory(newHistory); 
          localStorage.setItem('history', JSON.stringify(newHistory));
        }
      } else {
        setProgressValue(data.progress || 0);
        pollTimeoutRef.current = setTimeout(() => pollProgress(progressUrl, title, thumbnail, originalUrl), 2000);
      }
    } catch { setStatus('error'); addToast('Failed to poll progress', 'error'); }
  };

  const deleteHistoryItem = (ts: number) => { 
    const n = history.filter(h => h.timestamp !== ts); 
    setHistory(n); 
    localStorage.setItem('history', JSON.stringify(n)); 
  };

  React.useEffect(() => {
    if (url.length < 10 || !url.includes('youtube.com') && !url.includes('youtu.be')) return;
    const fetchInfo = async () => {
      try {
        const r = await fetch('/api/info', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ url }) 
        });
        const d = await r.json();
        if (d.resolutions) {
          setAvailableResolutions(d.resolutions);
          setVideoInfo({ title: d.title, thumbnail: d.thumbnail });
          if (d.resolutions.length > 0) setQuality(d.resolutions[0].value);
        }
      } catch (err) { console.error(err); }
    };
    fetchInfo();
  }, [url]);

  return (
    <div className={cn("min-h-screen p-4 flex flex-col items-center justify-center transition-colors font-sans", theme === 'dark' ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900")}>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(to => (
            <motion.div 
              key={to.id} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              className={cn("p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-center gap-3 min-w-[200px]", 
                to.type === 'success' ? "bg-green-500/20 border-green-500/40" : 
                to.type === 'error' ? "bg-red-500/20 border-red-500/40" : "bg-white/10 border-white/20")}
            >
              {to.type === 'success' ? <Check className="w-5 h-5 text-green-500" /> : <Info className="w-5 h-5" />}
              <span className="text-sm font-medium">{to.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">{t.title}</h1>
          <p className="text-sm opacity-50">{t.subtitle}</p>
        </header>

        <div className="flex bg-white/5 p-1 rounded-2xl mb-8">
          <button onClick={() => setActiveTab('download')} className={cn("flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2", activeTab === 'download' ? "bg-white text-black shadow-lg" : "hover:bg-white/5")}>
            <Download className="w-4 h-4" /> {t.downloadTab}
          </button>
          <button onClick={() => setActiveTab('settings')} className={cn("flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2", activeTab === 'settings' ? "bg-white text-black shadow-lg" : "hover:bg-white/5")}>
            <Settings2 className="w-4 h-4" /> {t.settingsTab}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'download' ? (
            <motion.div key="download" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">{t.urlLabel}</label>
                <div className="relative group">
                  <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder={t.urlPlaceholder} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/40 transition-all pl-12" />
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 group-focus-within:opacity-100 transition-opacity" />
                </div>
              </div>

              {videoInfo && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <img src={videoInfo.thumbnail || ''} alt="" className="w-24 h-16 object-cover rounded-lg shadow-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{videoInfo.title}</p>
                    <p className="text-xs opacity-50 mt-1">{t.videoDetected}</p>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70 ml-1">{t.formatLabel}</label>
                  <div className="flex bg-white/5 p-1 rounded-xl">
                    <button onClick={() => setFormat('video')} className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", format === 'video' ? "bg-white/10" : "opacity-40")}>{t.video}</button>
                    <button onClick={() => setFormat('mp3')} className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", format === 'mp3' ? "bg-white/10" : "opacity-40")}>{t.audio}</button>
                  </div>
                </div>
                {format === 'video' && (
                  <CustomSelect 
                    label={t.qualityLabel} 
                    options={availableResolutions} 
                    value={quality} 
                    onChange={setQuality} 
                    isOpen={openDropdown === 'q'} 
                    onToggle={() => setOpenDropdown(openDropdown === 'q' ? null : 'q')} 
                  />
                )}
              </div>

              <button 
                onClick={() => handleDownload()} 
                disabled={status === 'loading'} 
                className={cn("w-full p-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group", 
                  status === 'loading' ? "bg-white/10 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 active:scale-[0.98]")}
              >
                {status === 'loading' ? (
                  <>
                    <div className="absolute inset-0 bg-blue-600/20" style={{ width: `${progressValue}%`, transition: 'width 0.3s ease-out' }} />
                    <Loader2 className="animate-spin w-5 h-5 relative z-10" /> 
                    <span className="relative z-10">{Math.round(progressValue)}% {t.processing}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6 group-hover:bounce" /> 
                    {t.downloadBtn}
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-500 font-bold">
                    <Check className="w-5 h-5" /> {t.readyToDownload}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="settings" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-5 h-5 opacity-50" />
                    <div>
                      <p className="text-sm font-bold">{t.privateMode}</p>
                      <p className="text-[10px] opacity-40">{t.privateModeInfo}</p>
                    </div>
                  </div>
                  <button onClick={() => { setIsPrivateMode(!isPrivateMode); localStorage.setItem('isPrivateMode', String(!isPrivateMode)); }} className={cn("w-12 h-6 rounded-full p-1 transition-colors", isPrivateMode ? "bg-purple-500" : "bg-white/10")}>
                    <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", isPrivateMode && "translate-x-6")} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                       <History className="w-4 h-4 opacity-50" />
                       <h3 className="text-sm font-black uppercase tracking-wider opacity-50">{t.historyManagement}</h3>
                    </div>
                    {history.length > 0 && (
                      <button onClick={() => { setHistory([]); localStorage.setItem('history', '[]'); }} className="text-[10px] font-bold text-red-500 hover:underline">{t.clearAll}</button>
                    )}
                  </div>
                  
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {history.length === 0 ? (
                      <div className="text-center py-12 opacity-20 flex flex-col items-center gap-2">
                        <Ghost className="w-8 h-8" />
                        <p className="text-xs font-bold">{t.noHistory}</p>
                      </div>
                    ) : (
                      history.map(item => (
                        <div key={item.timestamp} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                          <img src={item.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">{item.title}</p>
                            <p className="text-[10px] opacity-30">{new Date(item.timestamp).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleDownload(item.originalUrl)} className="p-2 hover:bg-white/10 rounded-xl text-blue-500" title="Re-download">
                              <Download className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteHistoryItem(item.timestamp)} className="p-2 hover:bg-white/10 rounded-xl text-red-400" title={t.deleteFromHistory}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button onClick={() => { 
                  const newLang = language === 'en' ? 'id' : 'en';
                  setLanguage(newLang);
                  localStorage.setItem('language', newLang);
                }} className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors">
                  {language === 'en' ? 'Bahasa Indonesia' : 'English Language'}
                </button>
                <button onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark';
                  setTheme(newTheme);
                  localStorage.setItem('theme', newTheme);
                }} className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
