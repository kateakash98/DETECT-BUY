import React from 'react';
import { Sparkles, ArrowRight, ShieldAlert, ShieldCheck, Scale, Leaf, AlertTriangle, Play } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { DemoScenario } from '../types';

interface LiveDemoGalleryProps {
  onSelectDemoScenario: (demo: DemoScenario) => void;
}

export const LiveDemoGallery: React.FC<LiveDemoGalleryProps> = ({ onSelectDemoScenario }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hackathon Judge & Evaluator Demonstration Mode</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-['Bricolage_Grotesque'] tracking-tight">
            Live Demonstration Sandbox
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Test the entire end-to-end consumer journey without any sign-up or live payment risk.
            Click any curated scenario below to watch how suspicious products move from visual evidence upload to deep regulatory verification, grading (A–F), and statutory complaint drafting.
          </p>
        </div>
      </div>

      {/* Grid of 5 Real-world Indian Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_SCENARIOS.map((demo) => {
          const isSafe = demo.expectedGrade === 'A';
          const isCaution = demo.expectedGrade === 'C';
          const isRisky = demo.expectedGrade === 'F';

          return (
            <div
              key={demo.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={demo.sampleImage}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700">
                      {demo.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                      isSafe
                        ? 'bg-emerald-500/90 text-slate-950 border-emerald-400'
                        : isCaution
                        ? 'bg-amber-500/90 text-slate-950 border-amber-400'
                        : 'bg-rose-500/90 text-white border-rose-400'
                    }`}>
                      Expected: Grade {demo.expectedGrade}
                    </span>
                    <span className="text-[11px] text-slate-300 font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {demo.typeBadge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-['Bricolage_Grotesque'] leading-snug">
                    {demo.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {demo.description}
                  </p>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-400 truncate">
                    <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Simulated Target:</span>
                    <span className="text-emerald-400">{demo.sampleUrl}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectDemoScenario(demo)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Interactive Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
