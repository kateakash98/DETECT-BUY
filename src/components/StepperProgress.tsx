import React from 'react';
import { UploadCloud, FileSearch, Scale, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface StepperProgressProps {
  currentStep: number;
}

const STEPS = [
  {
    step: 1,
    title: 'Uploading Evidence',
    desc: 'Processing image / video frames & OCR scan',
    icon: UploadCloud,
  },
  {
    step: 2,
    title: 'Extracting Claims',
    desc: 'Identifying promises, pricing, discounts, and asterisks',
    icon: FileSearch,
  },
  {
    step: 3,
    title: 'Analyzing Regulations',
    desc: 'Screening against CPA 2019, CCPA 2022 & Dark Patterns 2023',
    icon: Scale,
  },
  {
    step: 4,
    title: 'Checking Official Sources',
    desc: 'Cross-verifying BIS CARE, FSSAI, and PIB records',
    icon: CheckCircle2,
  },
  {
    step: 5,
    title: 'Generating Trust Report',
    desc: 'Computing grading (A-F), breakdown & legal draft',
    icon: ShieldCheck,
  },
];

export const StepperProgress: React.FC<StepperProgressProps> = ({ currentStep }) => {
  return (
    <div className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            AI Screening in Progress
          </span>
          <h3 className="text-lg font-bold text-white mt-1">
            Analyzing Evidence Against Indian Consumer Protection Standards
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Step {Math.min(currentStep, 5)} of 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {STEPS.map((s, idx) => {
          const isDone = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const Icon = s.icon;

          return (
            <div
              key={s.step}
              className={`relative rounded-xl p-4 border transition-all ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-100'
                  : isCurrent
                  ? 'bg-emerald-900/30 border-emerald-400 ring-2 ring-emerald-400/20 text-white'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-emerald-400 text-slate-950 animate-pulse'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : s.step}
                </div>
                <Icon
                  className={`w-4 h-4 ${
                    isDone || isCurrent ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                />
              </div>
              <h4 className="text-xs font-bold truncate">{s.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(Math.min(currentStep, 5) / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};
