import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroScanner } from './components/HeroScanner';
import { StepperProgress } from './components/StepperProgress';
import { DetectionReport } from './components/DetectionReport';
import { MultilingualExplainer } from './components/MultilingualExplainer';
import { ConsumerAwarenessCenter } from './components/ConsumerAwarenessCenter';
import { GovernmentGuidelineLibrary } from './components/GovernmentGuidelineLibrary';
import { ExtensionShowcaseAndSimulator } from './components/ExtensionShowcaseAndSimulator';
import { SmartComplaintAssistant } from './components/SmartComplaintAssistant';
import { DashboardHistory } from './components/DashboardHistory';
import { LiveDemoGallery } from './components/LiveDemoGallery';
import { DEMO_SCENARIOS } from './data/demoScenarios';
import { DetectionResult, DemoScenario } from './types';
import { Shield, PhoneCall, ExternalLink, Heart, Sparkles, Scale } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('scanner');
  const [selectedLang, setSelectedLang] = useState<string>('mr'); // default to Marathi / Hindi / English
  const [currentReport, setCurrentReport] = useState<DetectionResult | null>(DEMO_SCENARIOS[0].result);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [history, setHistory] = useState<DetectionResult[]>([
    DEMO_SCENARIOS[0].result,
    DEMO_SCENARIOS[1].result,
    DEMO_SCENARIOS[2].result,
    DEMO_SCENARIOS[3].result,
  ]);

  // Handle live AI verification submission
  const handleAnalyze = async (payload: {
    text: string;
    url: string;
    title: string;
    images: string[];
    videoFrames: string[];
    localCheck: { score: number; flags: string[] };
  }) => {
    setIsAnalyzing(true);
    setCurrentStep(1);

    // Progressive stepper simulation for smooth UX
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 700);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          lang: selectedLang,
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);
      setCurrentStep(5);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze product evidence.');
      }

      const newReport: DetectionResult = {
        ...data,
        id: `scan-${Date.now()}`,
        url: payload.url,
      };

      setCurrentReport(newReport);
      setHistory((prev) => [newReport, ...prev]);

      // Small pause to show step 5 completion
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentTab('scanner');
        const reportEl = document.getElementById('detection-report');
        if (reportEl) {
          reportEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 600);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      alert(err.message || 'Error occurred during verification.');
    }
  };

  // Launch pre-loaded demo scenario
  const handleSelectDemo = (demoId: string) => {
    const demo = DEMO_SCENARIOS.find((d) => d.id === demoId);
    if (demo) {
      setCurrentReport(demo.result);
      setCurrentTab('scanner');
      setTimeout(() => {
        const reportEl = document.getElementById('detection-report');
        if (reportEl) {
          reportEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleSelectDemoScenario = (demo: DemoScenario) => {
    setCurrentReport(demo.result);
    setCurrentTab('scanner');
    setTimeout(() => {
      const reportEl = document.getElementById('detection-report');
      if (reportEl) {
        reportEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenComplaint = (report: DetectionResult) => {
    setCurrentReport(report);
    setCurrentTab('complaint');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSimulator = () => {
    setCurrentTab('extensions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07131b] text-slate-100 font-['Plus_Jakarta_Sans'] flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navbar with 12 Indian Languages & Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Tab 1: Scanner (Default Hero & Report View) */}
        {currentTab === 'scanner' && (
          <div className="space-y-10">
            <HeroScanner
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              onSelectDemo={handleSelectDemo}
              selectedLang={selectedLang}
            />

            {/* Stepper Progress bar when analyzing */}
            {isAnalyzing && (
              <div className="max-w-4xl mx-auto">
                <StepperProgress currentStep={currentStep} />
              </div>
            )}

            {/* Display Report when ready */}
            {!isAnalyzing && currentReport && (
              <DetectionReport
                report={currentReport}
                onOpenComplaint={handleOpenComplaint}
                onOpenSimulator={handleOpenSimulator}
                selectedLang={selectedLang}
              />
            )}
          </div>
        )}

        {/* Tab 2: Live Demo Gallery for Hackathon Evaluators */}
        {currentTab === 'demo' && (
          <LiveDemoGallery onSelectDemoScenario={handleSelectDemoScenario} />
        )}

        {/* Tab 3: AI Multilingual Explanation & Simplifier */}
        {currentTab === 'explainer' && (
          <MultilingualExplainer
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        )}

        {/* Tab 4: Consumer Awareness Centre (Be a Smart Grahak) */}
        {currentTab === 'awareness' && <ConsumerAwarenessCenter />}

        {/* Tab 5: Government Guidelines & Legal Knowledge Base */}
        {currentTab === 'guidelines' && <GovernmentGuidelineLibrary />}

        {/* Tab 6: Browser Extensions & Live Simulator */}
        {currentTab === 'extensions' && (
          <ExtensionShowcaseAndSimulator
            currentBackendUrl={typeof window !== 'undefined' ? window.location.origin : ''}
            selectedLang={selectedLang}
          />
        )}

        {/* Tab 7: Smart Complaint Assistant */}
        {currentTab === 'complaint' && (
          <SmartComplaintAssistant
            initialReport={currentReport}
            selectedLang={selectedLang}
          />
        )}

        {/* Tab 8: Dashboard & Scan History */}
        {currentTab === 'dashboard' && (
          <DashboardHistory
            history={history}
            onSelectReport={(report) => {
              setCurrentReport(report);
              setCurrentTab('scanner');
              setTimeout(() => {
                const el = document.getElementById('detection-report');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onOpenComplaint={handleOpenComplaint}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[#040e14] border-t border-slate-800/80 text-slate-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-extrabold text-white font-['Bricolage_Grotesque'] tracking-tight">
                  DETECT<span className="text-emerald-400">BUY</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Tagline: <strong>Detect Before You Buy.</strong>
                <br />
                Empowering every Indian consumer to verify authenticity, check dark patterns, and report unfair trade practices.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <span>Jago Grahak Jago</span>
                <span>•</span>
                <span>Consumer Protection Act, 2019</span>
              </div>
            </div>

            {/* Official Consumer Portals */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Government Helplines
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a
                    href="https://consumerhelpline.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>National Consumer Helpline (1915)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://e-jagriti.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>e-Jagriti Online Commission</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://foscos.fssai.gov.in/consumergrievance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>FSSAI Food Safety Connect</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.bis.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>Bureau of Indian Standards (BIS CARE)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>Cyber Crime Portal (1930)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Core Capabilities */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Core Innovations
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Trust Grading System (Grade A to F)</li>
                <li>• CCPA Dark Patterns 2023 Detection</li>
                <li>• CCPA Greenwashing Guidelines 2024</li>
                <li>• Multilingual Simplification (12 Languages)</li>
                <li>• Two Independent Manifest V3 Extensions</li>
                <li>• Automated Legal Complaint Generator</li>
              </ul>
            </div>

            {/* Supported Languages */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Multilingual Support
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Available in 12+ Indian Languages: English, हिन्दी (Hindi), मराठी (Marathi), ગુજરાતી (Gujarati), বাংলা (Bengali), தமிழ் (Tamil), తెలుగు (Telugu), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam), ਪੰਜਾਬੀ (Punjabi), ଓଡ଼ିଆ (Odia), অসমীয়া (Assamese), and اردو (Urdu).
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                Toll-free advice available across all Indian states.
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[11px]">
            <p>
              © 2026 DETECT BUY. An independent AI consumer safety screening platform. Results are screening aids and not legal decrees or laboratory certifications.
            </p>
            <div className="flex items-center gap-3">
              <span>Detect Before You Buy</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Jago Grahak Jago</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
