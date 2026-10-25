export type Grade = 'A' | 'B' | 'C' | 'D' | 'F' | 'U';
export type Verdict = 'safe' | 'caution' | 'risky';

export interface ReasonItem {
  kind: 'good' | 'warning';
  text: string;
}

export interface ClaimItem {
  text: string;
  type: 'environmental' | 'price_offer' | 'health_performance' | 'quality_safety' | 'influencer' | 'hidden_conditions' | 'other';
  risk: 'low' | 'medium' | 'high';
  plain_meaning: string;
  evidence_needed: string;
  rule: string;
}

export interface DetectionResult {
  id?: string;
  product_name: string;
  category: string;
  score: number;
  grade: Grade;
  product_grade?: Grade;
  website_grade?: Grade;
  seller_grade?: Grade;
  claim_grade?: Grade;
  verdict: Verdict;
  headline: string;
  reasons: ReasonItem[];
  claims: ClaimItem[];
  precautions: string[];
  missing_info: string[];
  routes: string[];
  complaint_draft: string;
  verification_date?: string;
  url?: string;
  imageThumbnail?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  native: string;
}

export interface RegulatoryGuideline {
  id: string;
  name: string;
  authority: string;
  url: string;
  focus: string;
  keyClauses: string[];
}

export interface DemoScenario {
  id: string;
  title: string;
  category: string;
  typeBadge: string;
  expectedGrade: Grade;
  description: string;
  sampleUrl: string;
  sampleText: string;
  sampleImage: string;
  result: DetectionResult;
}
