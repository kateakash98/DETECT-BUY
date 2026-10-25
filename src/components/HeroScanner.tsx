import React, { useState, useRef } from 'react';
import {
  Upload,
  Link2,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  FileImage,
  Video,
  X,
  ArrowRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { DetectionResult } from '../types';
import { DEMO_SCENARIOS } from '../data/demoScenarios';

interface HeroScannerProps {
  onAnalyze: (payload: {
    text: string;
    url: string;
    title: string;
    images: string[];
    videoFrames: string[];
    localCheck: { score: number; flags: string[] };
  }) => Promise<void>;
  isAnalyzing: boolean;
  onSelectDemo: (demoId: string) => void;
  selectedLang: string;
}

export const HeroScanner: React.FC<HeroScannerProps> = ({
  onAnalyze,
  isAnalyzing,
  onSelectDemo,
  selectedLang,
}) => {
  const [productUrl, setProductUrl] = useState('');
  const [adText, setAdText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [videoFrames, setVideoFrames] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [videoProcessing, setVideoProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time client-side heuristic inspection of entered URL and text
  const computeLocalHeuristics = () => {
    let score = 84;
    const flags: string[] = [];
    const combined = `${productUrl} ${adText}`.toLowerCase();

    if (productUrl) {
      try {
        const u = new URL(productUrl.startsWith('http') ? productUrl : `https://${productUrl}`);
        if (u.protocol !== 'https:') {
          score -= 30;
          flags.push('Insecure connection (HTTP)');
        }
        if (/\.(xyz|top|click|buzz|icu|cfd|sbs|shop|store|site|online|live)$/i.test(u.hostname)) {
          score -= 15;
          flags.push(`Suspicious domain suffix (.${u.hostname.split('.').pop()})`);
        }
        if (/(amazon|flipkart|myntra|nykaa|tata|apple|samsung)/i.test(u.hostname) && !/(^|\.)(amazon|flipkart|myntra|nykaa|tatacliq|apple|samsung)\.(com|in)$/i.test(u.hostname)) {
          score -= 35;
          flags.push('Impersonation indicator: Brand name mimicry');
        }
      } catch {
        // ignore url parse error
      }
    }

    if (/(\d{2})\s?%\s?off/i.test(combined)) {
      const match = combined.match(/(\d{2})\s?%\s?off/i);
      if (match && parseInt(match[1], 10) >= 70) {
        score -= 20;
        flags.push(`Steep discount advertised (${match[1]}% off)`);
      }
    }

    if (/only\s+\d+\s+left|hurry|deal ends in|last chance/i.test(combined)) {
      score -= 10;
      flags.push('False urgency dark pattern phrasing');
    }

    if (/miracle|burn fat|instant weight loss|cure diabetes/i.test(combined)) {
      score -= 25;
      flags.push('Unsubstantiated therapeutic medical claim');
    }

    score = Math.max(10, Math.min(98, score));
    return { score, flags };
  };

  const localHeuristics = computeLocalHeuristics();

  // Compress / resize image to keep payloads efficient
  const shrinkImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Extract frames from video at 15%, 50%, 85% timestamps
  const extractVideoFrames = (file: File): Promise<string[]> => {
    return new Promise((resolve) => {
      setVideoProcessing(true);
      const video = document.createElement('video');
      video.muted = true;
      video.preload = 'auto';
      const fileUrl = URL.createObjectURL(file);
      video.src = fileUrl;

      const extracted: string[] = [];
      video.onloadedmetadata = async () => {
        const duration = video.duration || 1;
        const seekTimes = [duration * 0.15, duration * 0.5, duration * 0.85];

        for (const t of seekTimes) {
          await new Promise<void>((r) => {
            video.onseeked = () => {
              const canvas = document.createElement('canvas');
              const maxDim = 900;
              const scale = Math.min(1, maxDim / Math.max(video.videoWidth, video.videoHeight));
              canvas.width = (video.videoWidth || 640) * scale;
              canvas.height = (video.videoHeight || 480) * scale;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                extracted.push(canvas.toDataURL('image/jpeg', 0.8));
              }
              r();
            };
            video.currentTime = t;
          });
        }
        URL.revokeObjectURL(fileUrl);
        setVideoProcessing(false);
        resolve(extracted);
      };

      video.onerror = () => {
        URL.revokeObjectURL(fileUrl);
        setVideoProcessing(false);
        resolve([]);
      };
    });
  };

  const handleFiles = async (files: FileList | File[]) => {
    setErrorMsg('');
    const fileList = Array.from(files);

    for (const f of fileList) {
      if (images.length >= 4) {
        setErrorMsg('Maximum 4 evidence media attachments permitted.');
        break;
      }

      if (f.type.startsWith('image/')) {
        const compressed = await shrinkImage(f);
        setImages((prev) => (prev.length < 4 ? [...prev, compressed] : prev));
      } else if (f.type.startsWith('video/')) {
        const frames = await extractVideoFrames(f);
        setVideoFrames((prev) => [...prev, ...frames].slice(0, 3));
      } else {
        setErrorMsg('Please upload JPG, PNG, WEBP images or MP4 videos.');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVideoFrame = (index: number) => {
    setVideoFrames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (images.length === 0 && videoFrames.length === 0 && !productUrl.trim() && adText.trim().length < 5) {
      setErrorMsg('Please upload an advertisement image/video, enter a product URL, or paste description text.');
      return;
    }

    await onAnalyze({
      text: adText.trim(),
      url: productUrl.trim(),
      title: productUrl ? new URL(productUrl.startsWith('http') ? productUrl : `https://${productUrl}`).hostname : 'Submitted Product / Ad',
      images,
      videoFrames,
      localCheck: localHeuristics,
    });
  };

  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI-Powered Indian Consumer Protection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-['Bricolage_Grotesque'] tracking-tight leading-[1.1]">
            Detect <span className="text-emerald-400 underline decoration-emerald-500/40 decoration-4">Before</span> You Buy.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Don't trust every advertisement. Verify product claims, check seller disclosures, identify dark patterns, and make an informed decision before payment.
          </p>

          {/* Interactive Trust Signals Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Consumer Protection Act, 2019
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CCPA Dark Patterns 2023
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> BIS CARE & FSSAI Verification
            </span>
          </div>
        </div>

        {/* 3 Major Actions Card */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Action 1: Upload Media (Images, Video, Screenshots) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px]">
                    1
                  </span>
                  Upload Product Photo, Ad Screenshot, or Video
                </label>
                <span className="text-[11px] text-slate-400">JPG, PNG, WEBP, MP4 (Max 4 items)</span>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-950/30'
                    : 'border-slate-700 hover:border-emerald-500/60 bg-slate-950/40 hover:bg-slate-950/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white font-['Bricolage_Grotesque']">
                  Drop packaging photos, social media ad screenshots, or video
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  or <span className="text-emerald-400 underline font-semibold">browse files</span> from your phone or laptop. You can also paste screenshots directly (Ctrl+V).
                </p>

                {videoProcessing && (
                  <p className="text-xs text-amber-300 font-semibold mt-2 animate-pulse">
                    Extracting key frames from video...
                  </p>
                )}
              </div>

              {/* Thumbnails strip */}
              {(images.length > 0 || videoFrames.length > 0) && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {images.map((img, idx) => (
                    <div key={`img-${idx}`} className="relative group w-18 h-18 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/90 text-rose-400 hover:text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {videoFrames.map((frame, idx) => (
                    <div key={`frame-${idx}`} className="relative group w-18 h-18 rounded-xl overflow-hidden border border-amber-500/50 bg-slate-950">
                      <img src={frame} alt={`Video Frame ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-[9px] bg-black/80 text-amber-300 px-1 rounded font-mono">
                        Frame {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveVideoFrame(idx);
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/90 text-rose-400 hover:text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action 2: Paste Product or Website URL */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px]">
                    2
                  </span>
                  Paste Shopping Website or Product Listing URL
                </label>
                {productUrl && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      localHeuristics.score >= 75
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : localHeuristics.score >= 50
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    Quick Check: {localHeuristics.score}/100
                  </span>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Link2 className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="e.g. https://shop.brand.in/deal or paste online store link"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-emerald-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Local flags feedback if detected */}
              {productUrl && localHeuristics.flags.length > 0 && (
                <div className="mt-2 text-xs flex flex-wrap gap-1.5">
                  {localHeuristics.flags.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[11px]">
                      <AlertCircle className="w-3 h-3 text-rose-400" />
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Ad Description / Claims Text */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Product Claims or Advertisement Text (Optional / Paste text from ad):
              </label>
              <textarea
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                rows={2}
                placeholder="e.g. '100% cure in 7 days, 90% discount, zero carbon footprint, no diet needed...'"
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-emerald-400 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-xs font-semibold text-rose-400 bg-rose-950/30 border border-rose-800/60 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </p>
            )}

            {/* Action 3: Start AI Detection Button */}
            <div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-emerald-950/60 font-['Bricolage_Grotesque'] tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-emerald-100" />
                <span>{isAnalyzing ? 'Analyzing Against Indian Guidelines…' : 'Start AI Detection (Verify Now)'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                🔒 Privacy Protected: We do not store personal banking details or sell your browsing data.
              </p>
            </div>
          </form>

          {/* Quick Demo Pre-load Pills */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Quick Test Demos (Try in 1-Click):
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {DEMO_SCENARIOS.slice(0, 4).map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => onSelectDemo(demo.id)}
                  className="text-left p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className="text-emerald-400">{demo.category.split('&')[0]}</span>
                    <span className={`px-1.5 py-0.2 rounded font-mono ${
                      demo.expectedGrade === 'A' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {demo.expectedGrade}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {demo.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {demo.typeBadge}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
