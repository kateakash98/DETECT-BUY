import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Printer,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  HelpCircle,
  Copy,
  Check,
  Scale,
  Sparkles,
} from 'lucide-react';
import { DetectionResult, Grade, Verdict } from '../types';

interface DetectionReportProps {
  report: DetectionResult;
  onOpenComplaint: (report: DetectionResult) => void;
  onOpenSimulator: () => void;
  selectedLang: string;
}

const GRADE_CONFIG: Record<
  Grade,
  { label: string; bg: string; border: string; text: string; badgeBg: string; meaning: string }
> = {
  A: {
    label: 'Grade A',
    bg: 'bg-emerald-600',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    meaning: 'Strong Verified Evidence: Meets statutory Indian standards & disclosures.',
  },
  B: {
    label: 'Grade B',
    bg: 'bg-teal-600',
    border: 'border-teal-500',
    text: 'text-teal-400',
    badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    meaning: 'Mostly Supported Evidence: Minor disclosures missing, generally acceptable.',
  },
  C: {
    label: 'Grade C',
    bg: 'bg-yellow-600',
    border: 'border-yellow-500',
    text: 'text-yellow-400',
    badgeBg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    meaning: 'Requires Verification: Vague claims, incomplete seller address or policies.',
  },
  D: {
    label: 'Grade D',
    bg: 'bg-orange-600',
    border: 'border-orange-500',
    text: 'text-orange-400',
    badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    meaning: 'Significant Warning Signs: Exaggerated claims, dark patterns, or high prices.',
  },
  F: {
    label: 'Grade F',
    bg: 'bg-rose-600',
    border: 'border-rose-500',
    text: 'text-rose-400',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    meaning: 'Severe Risk / Falsification: Impersonation, unauthorized marks, or scam signs.',
  },
  U: {
    label: 'Grade U',
    bg: 'bg-slate-600',
    border: 'border-slate-500',
    text: 'text-slate-400',
    badgeBg: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    meaning: 'Unable to Verify: Insufficient publicly verifiable information provided.',
  },
};

const VERDICT_CONFIG: Record<
  Verdict,
  { label: string; color: string; icon: typeof ShieldCheck; sub: string }
> = {
  safe: {
    label: 'No Major Warning Signs Detected',
    color: 'text-emerald-400',
    icon: ShieldCheck,
    sub: 'Verified signals found. Check physical seal upon delivery.',
  },
  caution: {
    label: 'Proceed With Caution',
    color: 'text-amber-400',
    icon: AlertTriangle,
    sub: 'Verify claims and seller details before transferring payment.',
  },
  risky: {
    label: 'High Risk Alert – Do Not Pay Yet',
    color: 'text-rose-400',
    icon: ShieldAlert,
    sub: 'Credible risk signals found. Review reasons and preserve evidence.',
  },
};

export const DetectionReport: React.FC<DetectionReportProps> = ({
  report,
  onOpenComplaint,
  onOpenSimulator,
}) => {
  const [copiedDraft, setCopiedDraft] = useState(false);
  const gradeConfig = GRADE_CONFIG[report.grade] || GRADE_CONFIG.U;
  const verdictConfig = VERDICT_CONFIG[report.verdict] || VERDICT_CONFIG.caution;
  const VerdictIcon = verdictConfig.icon;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(report.complaint_draft);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div id="detection-report" className="space-y-8 animate-fadeIn">
      {/* Top Banner & Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div
          className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${gradeConfig.bg}`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Official AI Screening Report
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {report.verification_date || 'Oct 24, 2026'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{report.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque'] tracking-tight">
              {report.product_name}
            </h2>
            {report.url && (
              <p className="text-xs text-slate-400 mt-1 font-mono truncate max-w-xl">
                URL Scanned: <span className="text-emerald-400">{report.url}</span>
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => onOpenComplaint(report)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Draft Legal Complaint</span>
            </button>
          </div>
        </div>

        {/* Core Verdict & 3D Trust Stamp Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
          {/* Visual Trust Stamp */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              className={`w-full max-w-xs rounded-2xl p-6 text-center text-white shadow-2xl relative border-2 ${gradeConfig.border} ${gradeConfig.bg} transition-all transform hover:scale-[1.02]`}
            >
              <div className="text-[11px] font-extrabold tracking-widest uppercase opacity-90 mb-1">
                DETECT BUY TRUST GRADE
              </div>
              <div className="text-7xl font-extrabold font-['Bricolage_Grotesque'] tracking-tight my-2 drop-shadow-md">
                {report.grade}
              </div>
              <div className="text-sm font-bold mt-1 uppercase tracking-wide">
                {gradeConfig.label}
              </div>

              {/* Score bar */}
              <div className="my-4 bg-black/25 rounded-full p-1">
                <div className="flex justify-between text-[11px] font-bold px-2 mb-1">
                  <span>Trust Score</span>
                  <span>{report.score} / 100</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(5, report.score)}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] opacity-90 leading-tight">
                {gradeConfig.meaning}
              </p>
            </div>
          </div>

          {/* Verdict details & Sub-grades */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-start gap-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700">
                <VerdictIcon className={`w-6 h-6 ${verdictConfig.color}`} />
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide ${verdictConfig.color}`}>
                  {verdictConfig.label}
                </span>
                <p className="text-base sm:text-lg font-bold text-white mt-0.5 leading-snug">
                  {report.headline}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {verdictConfig.sub}
                </p>
              </div>
            </div>

            {/* 4 Component Sub-grades */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Product Authenticity', grade: report.product_grade || report.grade },
                { label: 'Website Trust', grade: report.website_grade || (report.url ? 'C' : 'U') },
                { label: 'Seller Verification', grade: report.seller_grade || 'C' },
                { label: 'Claim Veracity', grade: report.claim_grade || 'C' },
              ].map((sub, idx) => {
                const cfg = GRADE_CONFIG[sub.grade as Grade] || GRADE_CONFIG.U;
                return (
                  <div
                    key={idx}
                    className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-center"
                  >
                    <span className="text-[11px] font-semibold text-slate-400 block truncate">
                      {sub.label}
                    </span>
                    <div className="flex items-center justify-center gap-1.5 mt-1.5">
                      <span className={`w-3 h-3 rounded-full ${cfg.bg}`} />
                      <span className="text-lg font-bold text-white font-['Bricolage_Grotesque']">
                        {sub.grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Evidence status distinction pill */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Screening Status:</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Public Evidence Analyzed
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                ✓ Indian Guidelines Applied
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                ⚡ Real-time Verification
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Evidence Reasons (Good vs Warning) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Warning signs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">
              Warning Signs & Risk Signals ({report.reasons.filter((r) => r.kind === 'warning').length})
            </h3>
          </div>
          <ul className="space-y-3">
            {report.reasons.filter((r) => r.kind === 'warning').length === 0 ? (
              <li className="text-xs text-slate-400 italic">No significant warning signs detected in the analyzed inputs.</li>
            ) : (
              report.reasons
                .filter((r) => r.kind === 'warning')
                .map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{r.text}</span>
                  </li>
                ))
            )}
          </ul>
        </div>

        {/* Positive trust signals */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Verified Trust Signals ({report.reasons.filter((r) => r.kind === 'good').length})
            </h3>
          </div>
          <ul className="space-y-3">
            {report.reasons.filter((r) => r.kind === 'good').length === 0 ? (
              <li className="text-xs text-slate-400 italic">No positive statutory credentials or return policies identified.</li>
            ) : (
              report.reasons
                .filter((r) => r.kind === 'good')
                .map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{r.text}</span>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>

      {/* Claims Breakdown Table */}
      {report.claims && report.claims.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Analyzed Advertising Claims & Required Evidence ({report.claims.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Cross-referenced against CCPA Misleading Ads 2022 & Dark Patterns 2023
            </span>
          </div>

          <div className="space-y-4">
            {report.claims.map((claim, idx) => {
              const riskColor =
                claim.risk === 'high'
                  ? 'border-l-rose-500 bg-rose-950/20'
                  : claim.risk === 'medium'
                  ? 'border-l-amber-500 bg-amber-950/20'
                  : 'border-l-emerald-500 bg-emerald-950/20';

              const riskBadge =
                claim.risk === 'high'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : claim.risk === 'medium'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

              return (
                <div
                  key={idx}
                  className={`border-l-4 rounded-r-xl p-4 border border-slate-800 ${riskColor}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-white">"{claim.text}"</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${riskBadge}`}>
                        {claim.risk} Risk
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                        {claim.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3">
                    <div className="bg-slate-900/80 rounded-lg p-2.5 border border-slate-800">
                      <span className="text-[11px] font-bold text-emerald-400 block mb-0.5">
                        What this means in plain words:
                      </span>
                      <p className="text-slate-300">{claim.plain_meaning}</p>
                    </div>

                    <div className="bg-slate-900/80 rounded-lg p-2.5 border border-slate-800">
                      <span className="text-[11px] font-bold text-amber-400 block mb-0.5">
                        Evidence consumer should request:
                      </span>
                      <p className="text-slate-300">{claim.evidence_needed}</p>
                    </div>
                  </div>

                  {claim.rule && (
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-300">Indian Regulation:</span>
                      <span className="text-emerald-300/90">{claim.rule}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Precautions Before You Pay & Missing Mandatory Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing information */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Missing Mandatory Disclosures ({report.missing_info?.length || 0})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Under Consumer Protection (E-Commerce) Rules 2020 & Legal Metrology Rules, sellers must prominently disclose:
          </p>
          <ul className="space-y-2.5">
            {(!report.missing_info || report.missing_info.length === 0) ? (
              <li className="text-xs text-emerald-400 font-medium">
                ✓ All standard mandatory statutory disclosures appear present.
              </li>
            ) : (
              report.missing_info.map((info, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold shrink-0">!</span>
                  <span>{info}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Precautions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
            <Info className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">
              Recommended Consumer Precautions
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Practical steps recommended by Jago Grahak Jago before completing this transaction:
          </p>
          <ul className="space-y-2.5">
            {report.precautions.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-teal-400 font-bold shrink-0">›</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pre-drafted Legal Complaint Preview */}
      {report.verdict !== 'safe' && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-900/50 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Actionable Consumer Protection
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Pre-Formatted Consumer Grievance Petition
              </h3>
              <p className="text-xs text-slate-400">
                Ready to be copied and filed on the official National Consumer Helpline or e-Jagriti commission.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyDraft}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDraft ? 'Copied to Clipboard' : 'Copy Petition'}</span>
              </button>
              <button
                onClick={() => onOpenComplaint(report)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                <span>Edit & File</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={report.complaint_draft}
            rows={7}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none resize-none leading-relaxed"
          />

          {/* Direct official links */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-semibold">Official Portals:</span>
            <a
              href="https://consumerhelpline.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              National Consumer Helpline (1915) <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://e-jagriti.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              e-Jagriti Commission <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://foscos.fssai.gov.in/consumergrievance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              FSSAI Food Safety Connect <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Statutory Disclaimer Notice */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
        <p>
          <strong className="text-slate-400">Statutory Notice:</strong> DETECT BUY is an independent AI screening assistant.
          Results, grades, and risk ratings are informational assessments generated from visible public information, user inputs, and official guidelines (CPA 2019, CCPA, BIS, FSSAI).
          They do not constitute judicial determinations, certified government seals, or laboratory safety certifications. Always verify physical packaging seals and consult official regulatory bodies for formal adjudication.
        </p>
      </div>
    </div>
  );
};
