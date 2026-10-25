import React, { useState } from 'react';
import {
  Download,
  Shield,
  Languages,
  Monitor,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  RefreshCw,
  FolderDown,
  Layers,
  Info,
} from 'lucide-react';
import { downloadDetectorExtensionZip, downloadTranslatorExtensionZip } from '../utils/extensionZip';
import { INDIAN_LANGUAGES } from '../data/languages';

interface ExtensionShowcaseProps {
  currentBackendUrl: string;
  selectedLang: string;
}

export const ExtensionShowcaseAndSimulator: React.FC<ExtensionShowcaseProps> = ({
  currentBackendUrl,
  selectedLang,
}) => {
  const [downloadingDetector, setDownloadingDetector] = useState(false);
  const [downloadingTranslator, setDownloadingTranslator] = useState(false);

  // Simulator state
  const [simMode, setSimMode] = useState<'detector' | 'translator'>('detector');
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [deepChecked, setDeepChecked] = useState(false);
  const [deepLoading, setDeepLoading] = useState(false);
  const [simLang, setSimLang] = useState(selectedLang || 'mr');
  const [simTranslated, setSimTranslated] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleDownloadDetector = async () => {
    setDownloadingDetector(true);
    try {
      await downloadDetectorExtensionZip(currentBackendUrl || window.location.origin);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingDetector(false);
    }
  };

  const handleDownloadTranslator = async () => {
    setDownloadingTranslator(true);
    try {
      await downloadTranslatorExtensionZip(currentBackendUrl || window.location.origin);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingTranslator(false);
    }
  };

  const handleSimDeepCheck = () => {
    setDeepLoading(true);
    setTimeout(() => {
      setDeepLoading(false);
      setDeepChecked(true);
    }, 1200);
  };

  const handleSimTranslate = () => {
    setSimTranslated(true);
  };

  const handleSimRestore = () => {
    setSimTranslated(false);
    setSelectedWord(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Two Independent Manifest V3 Browser Extensions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque']">
              Protective AI Extensions for Chrome & Microsoft Edge
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Browse any online store or social media marketplace with real-time AI security.
              Test both extensions right inside the live simulator below or download the complete source code to install on your computer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadDetector}
              disabled={downloadingDetector}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <FolderDown className="w-4 h-4" />
              <span>{downloadingDetector ? 'Preparing ZIP…' : 'Download Detector (ZIP)'}</span>
            </button>
            <button
              onClick={handleDownloadTranslator}
              disabled={downloadingTranslator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{downloadingTranslator ? 'Preparing ZIP…' : 'Download Translator (ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Extension Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Extension 1: AI Detector */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                  🛡️
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Bricolage_Grotesque']">
                    Extension 1: DETECT BUY AI Detector
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Folder: <code>extension-detector</code> • Grammarly-style Floating Shield
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Floats quietly on shopping websites. Automatically performs an instant local heuristic check for brand impersonation, deceptive discounts (70%+ off), and dark pattern timers. Click to trigger deep AI verification.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">✓ Real-time Trust Grade pill (A to F)</li>
                <li className="flex items-center gap-2">✓ False urgency & countdown timer alerts</li>
                <li className="flex items-center gap-2">✓ 1-Click deep analysis against CPA 2019</li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-slate-500">Manifest V3 • Independent</span>
              <button
                onClick={() => setSimMode('detector')}
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Test in Simulator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Extension 2: Language AI */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                  🌐
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Bricolage_Grotesque']">
                    Extension 2: DETECT BUY Language AI
                  </h3>
                  <span className="text-[11px] text-blue-400 font-medium">
                    Folder: <code>extension-translator</code> • 12+ Indian Languages
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Breaks language barriers for Indian shoppers. Translates full e-commerce pages or selected text, converting complicated legal disclaimers and marketing buzzwords into simple everyday words.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">✓ Supports 12 Indian Languages</li>
                <li className="flex items-center gap-2">✓ Simplifies obscure asterisks & terms</li>
                <li className="flex items-center gap-2">✓ Selection overlay & whole-page modes</li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-slate-500">Manifest V3 • Independent</span>
              <button
                onClick={() => setSimMode('translator')}
                className="text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Test in Simulator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive In-Browser Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white font-['Bricolage_Grotesque']">
                Live Interactive Extension Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience how the extensions protect consumers directly on a simulated online shopping store!
            </p>
          </div>

          {/* Simulator Toggle */}
          <div className="bg-slate-800 p-1 rounded-xl flex gap-1 text-xs font-bold">
            <button
              onClick={() => setSimMode('detector')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                simMode === 'detector' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Test Shopping Detector Shield
            </button>
            <button
              onClick={() => setSimMode('translator')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                simMode === 'translator' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Test Language AI Helper
            </button>
          </div>
        </div>

        {/* Mock Browser Frame */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative">
          {/* Simulated Browser Address Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex-1 bg-slate-950 rounded-lg px-3 py-1 text-xs font-mono text-slate-300 flex items-center justify-between border border-slate-800">
              <span className="truncate">https://mega-luxury-chronograph.shop/limited-clearance</span>
              <span className="text-[10px] text-rose-400 font-bold bg-rose-950/60 px-1.5 rounded border border-rose-900">
                ⚠️ Suspicious Domain
              </span>
            </div>

            {/* Language Extension Toolbar Widget (if in translator mode) */}
            {simMode === 'translator' && (
              <div className="flex items-center gap-2">
                <select
                  value={simLang}
                  onChange={(e) => {
                    setSimLang(e.target.value);
                    if (simTranslated) setSimTranslated(true);
                  }}
                  className="bg-slate-800 text-white text-xs rounded px-2 py-1 border border-slate-700"
                >
                  {INDIAN_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.native}
                    </option>
                  ))}
                </select>
                {!simTranslated ? (
                  <button
                    onClick={handleSimTranslate}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    Translate Page
                  </button>
                ) : (
                  <button
                    onClick={handleSimRestore}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    Original
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Simulated Webpage Content */}
          <div className="p-6 sm:p-8 text-slate-200 relative min-h-[460px] bg-slate-900/40">
            {/* Top flash urgency dark pattern */}
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 mb-6 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>
                  {simTranslated
                    ? '⚡ महा फ्लॅश सेल: ऑफर संपण्यास फक्त ०२:४५ मिनिटे शिल्लक!'
                    : '⚡ MEGA FLASH SALE: Offer ends in 02:45 minutes! Only 2 items left!'}
                </span>
              </div>
              <span className="text-[11px] text-rose-300 font-semibold">95% DISCOUNT APPLIED</span>
            </div>

            {/* Mock Product Page Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
                  alt="Simulated Watch"
                  className="w-full h-56 object-cover rounded-lg mb-3"
                />
                <span className="text-[11px] text-slate-500 font-mono">Stock ID: ROX-CLEAR-2026</span>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-white font-['Bricolage_Grotesque']">
                    {simTranslated
                      ? 'लक्झरी स्विस ऑटोमॅटिक क्रोनोग्राफ घड्याळ'
                      : 'Luxury Swiss Automatic Chronograph Watch'}
                  </h4>
                  <div className="flex items-baseline gap-3 mt-1.5">
                    <span className="text-2xl font-extrabold text-emerald-400">₹2,499</span>
                    <span className="text-sm line-through text-slate-500">₹45,000</span>
                    <span className="text-xs font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded">
                      95% OFF
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedWord('disclaimer')}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5 cursor-pointer hover:border-blue-500/50 transition-colors"
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
                    Product Claims & Asterisk Conditions (Click text to simplify):
                  </span>
                  <p>
                    {simTranslated
                      ? '१००% अस्सल स्विस हालचाल. आंतरराष्ट्रीय वॉरंटी समाविष्ट. सवलतीचा दर सुरक्षित करण्यासाठी त्वरित यूपीआय द्वारे आगाऊ पैसे भरावेत.'
                      : '"100% Genuine Swiss movement. International warranty included. Instant UPI prepayment required to lock clearance rates. *Non-refundable promotional booking."'}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-sm text-white shadow-md">
                    Buy Now with Instant UPI (₹2,499)
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    Cash on delivery disabled due to limited promotional allocation.
                  </p>
                </div>
              </div>
            </div>

            {/* Selection simplification overlay preview */}
            {selectedWord && (
              <div className="absolute top-20 right-20 max-w-sm bg-slate-900 border-2 border-blue-500 rounded-2xl p-4 shadow-2xl z-40 text-xs">
                <span className="font-bold text-blue-400 block mb-1">
                  🌐 Language AI Simplification ({INDIAN_LANGUAGES.find((l) => l.code === simLang)?.name}):
                </span>
                <p className="text-slate-200 leading-relaxed mb-3">
                  "The seller is using non-refundable conditions and forcing upfront UPI payment. There is no Cash on Delivery protection. Under CPA 2019, arbitrary non-refund clauses on counterfeit items are illegal."
                </p>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="bg-blue-600 text-white font-bold px-3 py-1 rounded text-[11px] cursor-pointer"
                >
                  Close Simplification
                </button>
              </div>
            )}

            {/* FLOATING DETECT BUY BADGE (Extension 2 Simulation) */}
            <div className="absolute bottom-6 right-6 z-30">
              <button
                onClick={() => setBadgeOpen(!badgeOpen)}
                className={`w-14 h-14 rounded-full text-white font-extrabold text-2xl shadow-2xl flex items-center justify-center border-2 border-white transition-transform hover:scale-110 cursor-pointer ${
                  deepChecked ? 'bg-rose-600' : 'bg-rose-500'
                }`}
                title="Click DETECT BUY Badge"
              >
                {deepChecked ? 'F' : 'D'}
              </button>

              {/* Expandable popup panel */}
              {badgeOpen && (
                <div className="absolute right-0 bottom-16 w-80 max-h-96 overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl text-xs text-slate-200">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 text-white font-extrabold text-xl flex items-center justify-center">
                      {deepChecked ? 'F' : 'D'}
                    </div>
                    <div>
                      <span className="font-bold text-white block">
                        {deepChecked ? 'Grade F – Severe Risk' : 'Grade D – Warning Signs'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {deepChecked ? '12 / 100 • Deep AI Verified' : '38 / 100 • Instant Local Scan'}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-3 leading-relaxed">
                    {deepChecked
                      ? 'AI Verified: Counterfeit domain mimicking trademarked brand. Fake 95% clearance with prohibited False Urgency dark patterns.'
                      : 'Local scan detected steep 95% discount, unusual .shop domain, and absence of physical customer grievance officer.'}
                  </p>

                  <div className="space-y-1.5 mb-3 text-[11px]">
                    <div className="text-rose-400 flex items-start gap-1">
                      <span>✕</span>
                      <span>False urgency timer near buy button</span>
                    </div>
                    <div className="text-rose-400 flex items-start gap-1">
                      <span>✕</span>
                      <span>No verified GSTIN or Indian manufacturer address</span>
                    </div>
                    <div className="text-rose-400 flex items-start gap-1">
                      <span>✕</span>
                      <span>UPI only payment without return policy</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={handleSimDeepCheck}
                      disabled={deepLoading}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
                    >
                      {deepLoading ? 'Analyzing against CPA 2019…' : deepChecked ? 'Re-Run Deep AI Check' : 'Deep Check with AI'}
                    </button>
                    <a
                      href="https://consumerhelpline.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-[11px] text-emerald-400 font-semibold hover:underline"
                    >
                      Report on National Consumer Helpline (1915)
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Installation Instructions for Chrome & Edge */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-lg font-bold text-white font-['Bricolage_Grotesque'] mb-4 flex items-center gap-2">
          <span>How to Install Extensions in Google Chrome or Microsoft Edge</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">
              1
            </span>
            <h4 className="font-bold text-white mb-1">Download & Extract</h4>
            <p className="text-slate-400 leading-relaxed">
              Click the download button above to save the extension ZIP. Extract the folder onto your desktop.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">
              2
            </span>
            <h4 className="font-bold text-white mb-1">Open Extensions Page</h4>
            <p className="text-slate-400 leading-relaxed font-mono">
              In Chrome go to: <code className="text-emerald-400">chrome://extensions</code><br />
              In Edge go to: <code className="text-emerald-400">edge://extensions</code>
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">
              3
            </span>
            <h4 className="font-bold text-white mb-1">Enable Developer Mode</h4>
            <p className="text-slate-400 leading-relaxed">
              Toggle the "Developer mode" switch in the top-right corner of the extensions manager.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">
              4
            </span>
            <h4 className="font-bold text-white mb-1">Click 'Load unpacked'</h4>
            <p className="text-slate-400 leading-relaxed">
              Select the extracted folder. The DETECT BUY shield will appear on all shopping sites!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
