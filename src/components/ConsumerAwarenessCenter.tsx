import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Search,
  AlertTriangle,
  Camera,
  FileCheck2,
  Users,
  ChevronRight,
  ChevronLeft,
  Quote,
  Lightbulb,
} from 'lucide-react';

const AWARENESS_STAGES = [
  {
    step: 1,
    title: 'The Attractive Trap',
    tagline: 'When an offer seems too good to be true',
    description: 'Ramesh sees a social media ad offering a flagship smartwatch worth ₹45,000 for just ₹1,999 with "95% clearance discount".',
    lesson: 'Unrealistically cheap prices are the primary lure used by fake storefronts.',
    svgType: 'trap',
  },
  {
    step: 2,
    title: 'Dark Patterns & Panic',
    tagline: 'False urgency creates psychological pressure',
    description: 'The website displays a ticking timer: "Only 2 left! Deal expires in 02:30 minutes" and blocks Cash on Delivery, demanding direct UPI payment.',
    lesson: 'Fake urgency is a prohibited dark pattern under CCPA 2023 Guidelines.',
    svgType: 'timer',
  },
  {
    step: 3,
    title: 'Check with DETECT BUY',
    tagline: 'Detect before you pay a single rupee',
    description: 'Instead of clicking Buy Now in haste, Ramesh takes a screenshot and uploads the website link to DETECT BUY.',
    lesson: 'A 10-second verification prevents months of grievance follow-ups.',
    svgType: 'scan',
  },
  {
    step: 4,
    title: 'AI Cross-checks Indian Regulations',
    tagline: 'Screening against CPA 2019, CCPA, and BIS',
    description: 'DETECT BUY scans the domain age, checks for missing GSTIN & manufacturer address, and verifies whether the electronic device has a valid BIS R-number.',
    lesson: 'Statutory compliance protects you from dangerous electrical or toxic hazards.',
    svgType: 'ai',
  },
  {
    step: 5,
    title: 'Clear Red Warning Received',
    tagline: 'Grade F – Severe Impersonation Detected',
    description: 'Ramesh gets an instant Grade F warning: the website is a lookalike registered 3 days ago with no return policy and fake customer reviews.',
    lesson: 'Ramesh cancels payment and saves his hard-earned money.',
    svgType: 'warning',
  },
  {
    step: 6,
    title: 'Preserving Evidence',
    tagline: 'Proof is essential for legal consumer action',
    description: 'DETECT BUY advises Ramesh to screenshot the ad, save the misleading claims, and note down the scam website domain.',
    lesson: 'Evidence documentation empowers regulatory authorities to investigate.',
    svgType: 'evidence',
  },
  {
    step: 7,
    title: 'Filing on National Consumer Helpline',
    tagline: 'Easy 1-click complaint petition ready',
    description: 'DETECT BUY formats an official complaint letter. Ramesh files it on the National Consumer Helpline (1915 / consumerhelpline.gov.in).',
    lesson: 'Every Indian citizen has the statutory right to report unfair trade practices.',
    svgType: 'complaint',
  },
  {
    step: 8,
    title: 'Collective Consumer Protection',
    tagline: 'One complaint protects thousands of fellow shoppers',
    description: 'Based on verified reports, the fraudulent domain is blocked by authorities. Other citizens in Ramesh’s community shop with confidence.',
    lesson: 'Jago Grahak Jago – An informed consumer creates a fair marketplace.',
    svgType: 'protected',
  },
];

export const ConsumerAwarenessCenter: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = AWARENESS_STAGES[activeStep];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/70 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 shadow-xl text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
          <Lightbulb className="w-4 h-4 text-emerald-400" />
          <span>Consumer Awareness Centre</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Bricolage_Grotesque'] tracking-tight">
          BE A SMART GRAHAK
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl mx-auto">
          "One wrong click can cost your money. Verify the seller before making payment. Don't ignore suspicious advertisements."
        </p>

        {/* Jago Grahak Jago Quote */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-900/30 border border-emerald-800/40 px-4 py-1.5 rounded-full">
          <Quote className="w-3.5 h-3.5" />
          <span className="font-semibold">Jago Grahak Jago – Empowered, Informed, and Vigilant.</span>
        </div>
      </div>

      {/* 8-Stage Interactive Illustrated Story Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Step indicator pills */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-slate-800 scrollbar-none">
          {AWARENESS_STAGES.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeStep === idx
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                activeStep === idx ? 'bg-white text-emerald-900' : 'bg-slate-700 text-slate-300'
              }`}>
                {s.step}
              </span>
              <span className="truncate max-w-[120px]">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Current Stage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Vector Artwork */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-center min-h-[280px] shadow-inner relative overflow-hidden">
            {activeStep === 0 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <rect x="30" y="30" width="260" height="160" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="50" y="50" width="220" height="50" rx="8" fill="#dc2626" opacity="0.15" />
                <text x="65" y="82" fill="#ef4444" fontSize="22" fontWeight="800">95% MEGA DISCOUNT!</text>
                <text x="65" y="125" fill="#94a3b8" fontSize="13">Flagship Watch ₹45,000 → ₹1,999</text>
                <circle cx="230" cy="140" r="28" fill="#38bdf8" opacity="0.2" />
                <text x="216" y="147" fontSize="24">⌚</text>
              </svg>
            )}

            {activeStep === 1 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <rect x="40" y="40" width="240" height="140" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="80" cy="90" r="24" fill="#f59e0b" opacity="0.2" />
                <text x="70" y="98" fontSize="22">⏳</text>
                <text x="120" y="80" fill="#f59e0b" fontSize="16" fontWeight="700">Ends in 02:30 Mins!</text>
                <text x="120" y="105" fill="#ef4444" fontSize="13" fontWeight="600">Only 2 items remaining</text>
                <rect x="60" y="130" width="200" height="32" rx="8" fill="#dc2626" />
                <text x="85" y="151" fill="#fff" fontSize="12" fontWeight="700">UPI ONLY (NO COD)</text>
              </svg>
            )}

            {activeStep === 2 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <circle cx="160" cy="110" r="60" fill="#059669" opacity="0.2" />
                <path d="M160 30 L220 50 V110 C220 150 160 180 160 180 C160 180 100 150 100 110 V50 Z" fill="#059669" />
                <path d="M135 105 L152 122 L185 85" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="90" y="205" fill="#34d399" fontSize="13" fontWeight="700">DETECT BUY SHIELD</text>
              </svg>
            )}

            {activeStep === 3 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <rect x="30" y="40" width="120" height="60" rx="8" fill="#0f172a" stroke="#059669" strokeWidth="2" />
                <text x="45" y="75" fill="#34d399" fontSize="12" fontWeight="700">CPA 2019 ✓</text>
                <rect x="170" y="40" width="120" height="60" rx="8" fill="#0f172a" stroke="#059669" strokeWidth="2" />
                <text x="180" y="75" fill="#34d399" fontSize="12" fontWeight="700">CCPA Rules ✓</text>
                <rect x="30" y="120" width="120" height="60" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="45" y="155" fill="#fbbf24" fontSize="12" fontWeight="700">BIS CARE ?</text>
                <rect x="170" y="120" width="120" height="60" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                <text x="180" y="155" fill="#f87171" fontSize="12" fontWeight="700">FSSAI Status ✕</text>
              </svg>
            )}

            {activeStep === 4 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <circle cx="160" cy="95" r="50" fill="#dc2626" />
                <text x="145" y="115" fill="#fff" fontSize="56" fontWeight="800">F</text>
                <text x="80" y="175" fill="#f87171" fontSize="16" fontWeight="800">GRADE F: SEVERE RISK</text>
                <text x="95" y="198" fill="#94a3b8" fontSize="12">Fake Domain Mimicking Brand</text>
              </svg>
            )}

            {activeStep === 5 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <rect x="50" y="40" width="220" height="140" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="160" cy="100" r="30" fill="#38bdf8" opacity="0.2" />
                <text x="145" y="110" fontSize="32">📸</text>
                <text x="75" y="155" fill="#38bdf8" fontSize="13" fontWeight="700">Preserve Screen Evidence</text>
              </svg>
            )}

            {activeStep === 6 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <rect x="40" y="40" width="240" height="140" rx="12" fill="#0f172a" stroke="#059669" strokeWidth="2" />
                <text x="60" y="75" fill="#34d399" fontSize="15" fontWeight="800">National Consumer Helpline</text>
                <text x="60" y="105" fill="#f8fafc" fontSize="22" fontWeight="800">DIAL: 1915</text>
                <text x="60" y="135" fill="#94a3b8" fontSize="12">consumerhelpline.gov.in</text>
                <rect x="60" y="150" width="130" height="20" rx="4" fill="#059669" />
                <text x="70" y="164" fill="#fff" fontSize="10" fontWeight="700">Petition Docketed</text>
              </svg>
            )}

            {activeStep === 7 && (
              <svg viewBox="0 0 320 220" className="w-full h-auto max-h-56">
                <rect width="320" height="220" rx="16" fill="#1e293b" />
                <circle cx="110" cy="100" r="35" fill="#059669" opacity="0.3" />
                <circle cx="160" cy="90" r="45" fill="#059669" />
                <circle cx="210" cy="100" r="35" fill="#059669" opacity="0.3" />
                <text x="148" y="102" fontSize="32">🛡️</text>
                <text x="75" y="175" fill="#34d399" fontSize="15" fontWeight="800">Community Protected</text>
              </svg>
            )}
          </div>

          {/* Text narrative & lesson */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Scene {current.step} of 8
              </span>
              <span className="text-xs text-slate-400 font-semibold">{current.tagline}</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-['Bricolage_Grotesque']">
              {current.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {current.description}
            </p>

            <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-4">
              <span className="text-xs font-bold text-emerald-400 block mb-1">
                Grahak Safety Takeaway:
              </span>
              <p className="text-xs text-emerald-100 font-medium">
                {current.lesson}
              </p>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Scene</span>
              </button>

              <button
                onClick={() => setActiveStep((prev) => Math.min(AWARENESS_STAGES.length - 1, prev + 1))}
                disabled={activeStep === AWARENESS_STAGES.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
              >
                <span>Next Scene</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Golden Rules for Indian Online Shoppers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Rule 1: Verify Seller Identity',
            text: 'Never order from stores that conceal their registered physical address, company name, or GSTIN under E-Commerce Rules 2020.',
          },
          {
            title: 'Rule 2: Resist Dark Pattern Urgency',
            text: 'Fake countdown clocks and "only 1 left" alerts are banned manipulation tactics. Step away and check reviews before paying.',
          },
          {
            title: 'Rule 3: Check Mandatory Marks',
            text: 'Food requires a 14-digit FSSAI licence. Electrical appliances require a BIS CRS R-number. Gold requires a 6-digit HUID.',
          },
        ].map((rule, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-emerald-400 font-['Bricolage_Grotesque'] mb-1">
              {rule.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {rule.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
