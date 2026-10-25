import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Paperclip,
  CheckSquare,
  Square,
  AlertCircle,
  PhoneCall,
  Send,
} from 'lucide-react';
import { DetectionResult } from '../types';

interface SmartComplaintAssistantProps {
  initialReport?: DetectionResult | null;
  selectedLang: string;
}

export const SmartComplaintAssistant: React.FC<SmartComplaintAssistantProps> = ({
  initialReport,
  selectedLang,
}) => {
  const [productName, setProductName] = useState(initialReport?.product_name || 'Herbal Slimming Formula');
  const [sellerName, setSellerName] = useState(
    initialReport?.url ? new URL(initialReport.url.startsWith('http') ? initialReport.url : `https://${initialReport.url}`).hostname : 'miracle-store.online'
  );
  const [websiteUrl, setWebsiteUrl] = useState(initialReport?.url || 'https://miracle-store.online/deal');
  const [orderId, setOrderId] = useState('Pending / Pre-Purchase Screening');
  const [amount, setAmount] = useState('1999');
  const [complaintType, setComplaintType] = useState('Misleading Advertisement & Health Claim');
  const [userConfirmedConsent, setUserConfirmedConsent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [complaintText, setComplaintText] = useState(
    initialReport?.complaint_draft ||
      `FORMAL CONSUMER GRIEVANCE PETITION
Filing Under: Consumer Protection Act, 2019 & Consumer Protection (E-Commerce) Rules, 2020
Date: ${new Date().toLocaleDateString('en-IN')}

TO:
The Grievance Redressal Officer / Central Consumer Protection Authority
National Consumer Helpline (NCH - 1915)
Government of India

1. DETAILS OF COMPLAINANT:
   - Name: [Online Consumer]
   - Contact / Mobile: [Phone Number]
   - Email Address: [Email Address]
   - City / State: [City, State, Pincode]

2. DETAILS OF RESPONDENT / SELLER:
   - Seller / Store Name: ${sellerName || 'Online E-commerce Store'}
   - Website / Product URL: ${websiteUrl || 'Not provided'}
   - Transaction / Order ID: ${orderId}
   - Disputed Amount: ₹${amount}

3. SUMMARY OF DECEPTIVE PRACTICES & GROUNDS:
   - Misleading advertisement claims under Section 2(28) of Consumer Protection Act, 2019.
   - Non-compliance with mandatory disclosures under Consumer Protection (E-Commerce) Rules, 2020.
   - Prohibited Dark Patterns (False Urgency, fake timer) under CCPA Guidelines, 2023.

4. PRAYER / RELIEF SOUGHT:
   - Immediate inquiry and direction to cease misleading advertisements.
   - Restitution / full refund of amounts collected through deceptive practices.
   - Necessary enforcement under Section 89 of CPA 2019.

Verification: The statements made herein are supported by preserved screenshot evidence.`
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(complaintText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const authorities = [
    {
      name: 'National Consumer Helpline (NCH)',
      tollFree: '1915 or 1800-11-4000',
      url: 'https://consumerhelpline.gov.in/',
      desc: 'Central grievance portal for fast dispute mediation across India.',
      badge: 'General & E-Commerce',
    },
    {
      name: 'e-Jagriti Consumer Commission',
      tollFree: 'Online Portal',
      url: 'https://e-jagriti.gov.in/',
      desc: 'Digital filing of formal legal claims before District and State Consumer Courts.',
      badge: 'Formal Court Filing',
    },
    {
      name: 'FSSAI Food Safety Connect',
      tollFree: '1800-112-100',
      url: 'https://foscos.fssai.gov.in/consumergrievance',
      desc: 'Mandatory portal for food adulteration, fake herbal supplements, and missing licences.',
      badge: 'Food & Health',
    },
    {
      name: 'Bureau of Indian Standards (BIS)',
      tollFree: 'BIS CARE App',
      url: 'https://www.bis.gov.in/',
      desc: 'Report counterfeit ISI marks, bogus CRS numbers, or substandard electrical appliances.',
      badge: 'Electronics & ISI',
    },
    {
      name: 'National Cyber Crime Reporting Portal',
      tollFree: 'Helpline: 1930',
      url: 'https://cybercrime.gov.in/',
      desc: 'Emergency reporting for payment phishing, UPI fraud, and fake government schemes.',
      badge: 'Financial & Cyber Fraud',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart Legal Grievance Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Bricolage_Grotesque']">
              Draft & File a Formal Consumer Complaint
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              "One complaint can protect thousands of shoppers."
              DETECT BUY formats your grievances with statutory citations under the Consumer Protection Act 2019, ready for submission to government authorities.
            </p>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-2xl p-4 flex items-center gap-3">
            <PhoneCall className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                Toll-Free Consumer Helpline
              </span>
              <span className="text-lg font-extrabold text-white font-mono">1915</span>
            </div>
          </div>
        </div>

        {/* Form inputs to customize the complaint draft */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Product / Service Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Seller / Platform Name:</label>
            <input
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Website URL:</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Transaction / Order ID:</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Disputed Amount (₹):</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Grievance Category:</label>
            <select
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Misleading Advertisement & Health Claim">Misleading Advertisement & Health Claim</option>
              <option value="Dark Pattern & False Urgency">Dark Pattern & False Urgency</option>
              <option value="Non-Delivery & Inability to Refund">Non-Delivery & Inability to Refund</option>
              <option value="Counterfeit Product & Brand Impersonation">Counterfeit Product & Brand Impersonation</option>
              <option value="Missing FSSAI or BIS Certification">Missing FSSAI or BIS Certification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editable Complaint Editor & Evidence Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Editable Complaint Draft (Compliant with CPA 2019 Format)
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Full Petition'}</span>
              </button>
            </div>

            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              rows={16}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400 leading-relaxed resize-none"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <label
              onClick={() => setUserConfirmedConsent(!userConfirmedConsent)}
              className="flex items-start gap-3 cursor-pointer text-xs text-slate-300"
            >
              <div className="mt-0.5 text-emerald-400">
                {userConfirmedConsent ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <span>
                I confirm that I will review the complaint text and submit it to the government authority myself.
                DETECT BUY does not transmit personal data automatically.
              </span>
            </label>
          </div>
        </div>

        {/* Evidence Checklist & Portals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Evidence Preservation Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
              <Paperclip className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                Evidence Preservation Checklist
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Before opening the official portal, ensure you have preserved these files:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Screenshots of product page, claimed discounts & timer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Bank / UPI UTR reference number or payment receipt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Order confirmation SMS or email from seller</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Unboxing video or package label photos showing missing marks</span>
              </li>
            </ul>
          </div>

          {/* Official Complaint Portals */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 pb-2 border-b border-slate-800">
              Where to File Your Grievance:
            </h3>

            <div className="space-y-3">
              {authorities.map((auth, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate">{auth.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-semibold shrink-0">
                      {auth.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                    {auth.desc}
                  </p>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      {auth.tollFree}
                    </span>
                    <a
                      href={auth.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white hover:text-emerald-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <span>Open Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
