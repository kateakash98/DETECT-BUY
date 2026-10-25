import React from 'react';
import { Shield, ShieldAlert, Languages, ExternalLink, PhoneCall } from 'lucide-react';
import { INDIAN_LANGUAGES } from '../data/languages';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedLang,
  setSelectedLang,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#091e2b]/95 backdrop-blur-md border-b border-emerald-900/40 text-white">
      {/* Top statutory awareness bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-xs py-1.5 px-4 text-emerald-100 flex flex-wrap justify-between items-center gap-2 border-b border-emerald-700/50">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-700/80 text-[10px] font-bold uppercase tracking-wider text-white">
            Consumer Safety Initiative
          </span>
          <span className="hidden sm:inline">Aligned with Consumer Protection Act 2019 & CCPA Guidelines</span>
          <span className="sm:hidden font-medium">Jago Grahak Jago</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://consumerhelpline.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-emerald-300" />
            <span className="font-semibold text-emerald-200">National Consumer Helpline: 1915</span>
          </a>
          <span className="text-emerald-500 hidden md:inline">|</span>
          <span className="text-emerald-200/90 hidden md:inline text-[11px]">Free & Independent Screening</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentTab('scanner')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#091e2b] rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold tracking-tight font-['Bricolage_Grotesque'] text-white">
                  DETECT<span className="text-emerald-400">BUY</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  AI Guard
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide">
                Detect Before You Buy.
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'scanner', label: 'Scan & Detect' },
              { id: 'demo', label: 'Live Demos' },
              { id: 'explainer', label: 'Language & Claims AI' },
              { id: 'awareness', label: 'Be a Smart Grahak' },
              { id: 'guidelines', label: 'Official Guidelines' },
              { id: 'extensions', label: 'Browser Extensions' },
              { id: 'complaint', label: 'Complaint Assistant' },
              { id: 'dashboard', label: 'Dashboard' },
            ].map((link) => {
              const active = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Language Selector & Mobile Action */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-2.5 py-1.5 shadow-sm">
              <Languages className="w-4 h-4 text-emerald-400 shrink-0" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                aria-label="Select consumer language"
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
              >
                {INDIAN_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setCurrentTab('demo')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <span>Try Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="lg:hidden flex overflow-x-auto py-2.5 gap-2 border-t border-slate-800 scrollbar-none">
          {[
            { id: 'scanner', label: 'Scan & Detect' },
            { id: 'demo', label: 'Live Demos' },
            { id: 'explainer', label: 'Language AI' },
            { id: 'awareness', label: 'Smart Grahak' },
            { id: 'guidelines', label: 'Guidelines' },
            { id: 'extensions', label: 'Extensions' },
            { id: 'complaint', label: 'Complaint' },
            { id: 'dashboard', label: 'Dashboard' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentTab(link.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                currentTab === link.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800/80 text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
