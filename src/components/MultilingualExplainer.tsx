import React, { useState } from 'react';
import { Languages, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check } from 'lucide-react';
import { INDIAN_LANGUAGES } from '../data/languages';

const SAMPLE_CLAIMS = [
  {
    title: 'Guaranteed Clinical Health Claim',
    original: 'Clinically tested for guaranteed results in 7 days. 100% permanent fat reduction without diet or exercise.',
    simplifiedEn: 'The company claims this product is scientifically proven and guarantees permanent fat loss. In reality, human weight loss requires calorie balance. Under FSSAI and CCPA rules, asking for the clinical trial registry number (CTRI) is recommended before ingesting.',
  },
  {
    title: 'Deceptive Greenwashing Claim',
    original: '100% Eco-Pure and Zero Carbon Footprint. Save the planet with India’s first completely green earth-friendly bottle.',
    simplifiedEn: 'The seller is using broad environmental buzzwords. Without an accredited third-party life-cycle certificate or official Ecomark logo, this is considered greenwashing under the CCPA 2024 Greenwashing Guidelines.',
  },
  {
    title: 'False Urgency Dark Pattern',
    original: 'HURRY! 90% OFF Flash Sale Ends in 03:15 Minutes! Only 2 left in stock. 45 people are looking at this deal right now.',
    simplifiedEn: 'This is a False Urgency Dark Pattern. The steep 90% discount may be based on an artificial MRP, and the countdown clock is programmed to create panic so you pay without researching the seller.',
  },
  {
    title: 'Hidden Prepayment Condition',
    original: 'Special VIP subsidised rate applicable only on direct UPI payment. Non-refundable promotional booking fee.',
    simplifiedEn: 'The seller is refusing Cash on Delivery or credit card protection. Once you transfer funds via personal UPI, it is virtually impossible to reverse the payment if the product is counterfeit or never delivered.',
  },
];

interface MultilingualExplainerProps {
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
}

export const MultilingualExplainer: React.FC<MultilingualExplainerProps> = ({
  selectedLang,
  setSelectedLang,
}) => {
  const [inputText, setInputText] = useState(SAMPLE_CLAIMS[0].original);
  const [simplifiedOutput, setSimplifiedOutput] = useState(SAMPLE_CLAIMS[0].simplifiedEn);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentLangObj = INDIAN_LANGUAGES.find((l) => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  const handleTranslate = async (textToTranslate: string) => {
    if (!textToTranslate.trim()) return;
    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: [textToTranslate],
          lang: selectedLang,
          mode: 'simplify',
        }),
      });
      const data = await res.json();
      if (data.translations?.[0]) {
        setSimplifiedOutput(data.translations[0]);
      }
    } catch {
      setSimplifiedOutput('Could not simplify text right now. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(simplifiedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard error
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Multilingual Explanation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque']">
              Break Language Barriers & Understand Tricky Marketing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Deceptive advertisements often hide behind complicated English terminology, medical jargon, or microscopic asterisks.
              DETECT BUY translates and rewrites them into simple, honest words in your mother tongue.
            </p>
          </div>

          {/* Language picker */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-300">Explaining in:</span>
            <select
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                handleTranslate(inputText);
              }}
              aria-label="Select target explanation language"
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              {INDIAN_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pre-loaded sample claims */}
        <div className="mt-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-3">
            Click to test common deceptive advertising claims:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_CLAIMS.map((claim, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(claim.original);
                  handleTranslate(claim.original);
                }}
                className="text-left p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all group cursor-pointer"
              >
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                  {claim.title}
                </span>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  "{claim.original}"
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Advertisement / Claim Text */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Original Advertising Text / Fine Print
              </span>
              <span className="text-[11px] text-slate-500">Edit or paste below</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              placeholder="Paste any confusing claim, discount clause, or warranty disclaimer here..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 leading-relaxed resize-none"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">
              Target: <strong className="text-emerald-400">{currentLangObj.native}</strong>
            </span>
            <button
              onClick={() => handleTranslate(inputText)}
              disabled={isTranslating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isTranslating ? 'Simplifying…' : 'Simplify & Explain'}</span>
            </button>
          </div>
        </div>

        {/* Right: Plain Everyday Explanation in Indian Language */}
        <div className="bg-slate-900 border border-emerald-900/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Plain Consumer Meaning ({currentLangObj.name})
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="w-full min-h-[192px] bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-sm text-emerald-100/90 leading-relaxed font-['Plus_Jakarta_Sans']">
              {isTranslating ? (
                <div className="flex items-center gap-2 text-slate-400 py-6">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Translating and simplifying jargon into plain words...</span>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{simplifiedOutput}</p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Helps first-time online shoppers, senior citizens, and students avoid falling for deceptive terms.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
