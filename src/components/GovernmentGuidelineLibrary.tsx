import React, { useState } from 'react';
import { BookOpen, Search, ExternalLink, ShieldCheck, Scale, Filter, CheckCircle2 } from 'lucide-react';
import { REGULATORY_GUIDELINES_DATA, GuidelineResource } from '../data/guidelines';

export const GovernmentGuidelineLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'CPA & E-Commerce',
    'Advertising & Dark Patterns',
    'Standards & Food Safety',
    'Grievance & Portals',
  ];

  const filtered = REGULATORY_GUIDELINES_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.applicableLaws.toLowerCase().includes(q) ||
      item.keyProvisions.some((p) => p.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Indian Legal & Statutory Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque']">
              Government Guidelines & Regulatory Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              All DETECT BUY AI assessments are transparently anchored in gazetted Indian consumer statutes, CCPA notifications, and Bureau of Indian Standards mandates.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>11 Official Public Sources Integrated</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-6">
          <div className="flex overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search laws, dark patterns, BIS..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Grid of Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {item.publicationDate}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-['Bricolage_Grotesque'] mt-1">
                {item.title}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mb-3">
                {item.enactedBy} • <span className="text-slate-400">{item.applicableLaws}</span>
              </p>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.summary}
              </p>

              {/* Key Provisions */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 mb-4">
                <span className="text-[11px] font-bold text-slate-300 block mb-2 uppercase tracking-wide">
                  Key Clauses & Statutory Prohibitions:
                </span>
                <ul className="space-y-2">
                  {item.keyProvisions.map((prov, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{prov}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verification & Consumer Impact */}
              <div className="text-xs text-slate-400 space-y-1 mb-4">
                <p>
                  <strong className="text-slate-300">How to Verify:</strong> {item.verificationMethod}
                </p>
                <p>
                  <strong className="text-slate-300">Consumer Impact:</strong> {item.impactOnConsumer}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">Official Public Gazetted Source</span>
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Open Government Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
