import React, { useState } from 'react';
import {
  BarChart3,
  Search,
  Filter,
  FileText,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  Calendar,
  Layers,
  ArrowUpRight,
  Printer,
} from 'lucide-react';
import { DetectionResult, Grade, Verdict } from '../types';

interface DashboardHistoryProps {
  history: DetectionResult[];
  onSelectReport: (report: DetectionResult) => void;
  onOpenComplaint: (report: DetectionResult) => void;
}

export const DashboardHistory: React.FC<DashboardHistoryProps> = ({
  history,
  onSelectReport,
  onOpenComplaint,
}) => {
  const [filterGrade, setFilterGrade] = useState<string>('All');
  const [filterVerdict, setFilterVerdict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics calculation
  const totalScans = history.length;
  const riskyScans = history.filter((h) => h.verdict === 'risky').length;
  const cautionScans = history.filter((h) => h.verdict === 'caution').length;
  const safeScans = history.filter((h) => h.verdict === 'safe').length;
  const totalClaims = history.reduce((acc, h) => acc + (h.claims?.length || 0), 0);
  const darkPatternsDetected = history.filter((h) =>
    h.reasons.some((r) => /urgency|timer|dark pattern|discount/i.test(r.text))
  ).length;

  const filteredHistory = history.filter((item) => {
    const matchesGrade = filterGrade === 'All' || item.grade === filterGrade;
    const matchesVerdict = filterVerdict === 'All' || item.verdict === filterVerdict;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.product_name.toLowerCase().includes(q) ||
      (item.url && item.url.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q);
    return matchesGrade && matchesVerdict && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Consumer Protection Analytics & Scan History</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque']">
              Detection Intelligence Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Track recent product screenings, suspicious advertising claims, identified dark patterns, and drafted consumer grievance petitions.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Summary</span>
          </button>
        </div>

        {/* 6 Key Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase truncate">
              Total Scans
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque'] mt-1">
              {totalScans}
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">Active Session</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-rose-400 block uppercase truncate">
              High Risk / Fake
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-['Bricolage_Grotesque'] mt-1">
              {riskyScans}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Grade D / F</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-amber-400 block uppercase truncate">
              Caution / Warnings
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Bricolage_Grotesque'] mt-1">
              {cautionScans}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Grade C</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-emerald-400 block uppercase truncate">
              Verified / Safe
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Bricolage_Grotesque'] mt-1">
              {safeScans}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Grade A / B</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase truncate">
              Claims Screened
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque'] mt-1">
              {totalClaims}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Tested for evidence</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-indigo-400 block uppercase truncate">
              Dark Patterns
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-['Bricolage_Grotesque'] mt-1">
              {darkPatternsDetected}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">False urgency / timers</span>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </span>
            {['All', 'A', 'B', 'C', 'D', 'F'].map((g) => (
              <button
                key={g}
                onClick={() => setFilterGrade(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterGrade === g
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Grade {g}
              </button>
            ))}

            <select
              value={filterVerdict}
              onChange={(e) => setFilterVerdict(e.target.value)}
              aria-label="Filter by verdict"
              className="bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 rounded-lg px-2.5 py-1 ml-2 focus:outline-none"
            >
              <option value="All">All Verdicts</option>
              <option value="safe">Safe (No Red Flags)</option>
              <option value="caution">Caution (Verify First)</option>
              <option value="risky">Risky (Do Not Buy)</option>
            </select>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scan history..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Product / Ad / Website</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Grade</th>
                <th className="py-3.5 px-4 text-center">Score</th>
                <th className="py-3.5 px-4">Verdict</th>
                <th className="py-3.5 px-4">Claims Flagged</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 italic">
                    No matching scan history records found.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => {
                  const isRisky = item.verdict === 'risky';
                  const isCaution = item.verdict === 'caution';

                  return (
                    <tr
                      key={item.id || item.product_name}
                      onClick={() => onSelectReport(item)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {item.product_name}
                        </div>
                        {item.url && (
                          <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs block">
                            {item.url}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-slate-300 whitespace-nowrap">
                        {item.category}
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-block w-8 h-8 rounded-lg font-bold font-['Bricolage_Grotesque'] leading-8 text-center text-white ${
                            item.grade === 'A'
                              ? 'bg-emerald-600'
                              : item.grade === 'B'
                              ? 'bg-teal-600'
                              : item.grade === 'C'
                              ? 'bg-yellow-600'
                              : item.grade === 'D'
                              ? 'bg-orange-600'
                              : 'bg-rose-600'
                          }`}
                        >
                          {item.grade}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center font-mono font-bold text-slate-200 whitespace-nowrap">
                        {item.score} / 100
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isRisky
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                              : isCaution
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          {isRisky ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                          ) : isCaution ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span className="capitalize">{item.verdict}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-300">
                        {item.claims?.length || 0} claims analyzed
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectReport(item);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 transition-colors"
                        >
                          View Report
                        </button>
                        {item.verdict !== 'safe' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenComplaint(item);
                            }}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                          >
                            Complaint
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
