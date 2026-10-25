import { DemoScenario } from '../types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'fake-herbal-tea',
    title: 'Herbal Miracle Fat-Burner Detox Tea',
    category: 'Food, Health & Supplements',
    typeBadge: 'Fake Health Claim & No FSSAI',
    expectedGrade: 'F',
    description: 'Advertised on social media claiming "Burn 10 Kgs in 7 Days without Diet or Exercise". Lacks 14-digit FSSAI licence and uses fabricated celebrity before/after photos.',
    sampleUrl: 'https://miracle-slim-ayurtea.online/deal',
    sampleText: `HERBAL SLIM DETOX TEA - 100% CLINICALLY PROVEN TO MELT BELLY FAT IN 7 DAYS!
Recommended by top Ayurvedic doctors. No diet or workout needed.
Guaranteed permanent weight loss with 100% organic Himalayan herbs.
Hurry! Limited stock available. Buy 2 Get 1 Free! Cash on delivery not available due to high demand. Transfer directly via UPI to confirm order.`,
    sampleImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'demo-tea',
      product_name: 'Herbal Miracle Fat-Burner Detox Tea',
      category: 'Health & Dietary Supplements',
      score: 18,
      grade: 'F',
      product_grade: 'F',
      website_grade: 'F',
      seller_grade: 'F',
      claim_grade: 'F',
      verdict: 'risky',
      headline: 'Extreme risk: Unsubstantiated medical claims, missing mandatory FSSAI licence, and high-risk upfront payment demands.',
      reasons: [
        { kind: 'warning', text: 'Claims "Melt 10 Kgs belly fat in 7 days" without any CTRI-registered clinical trial evidence.' },
        { kind: 'warning', text: 'No 14-digit FSSAI licence number or Jaivik Bharat organic certification displayed.' },
        { kind: 'warning', text: 'Prepaid UPI-only payment demand; Cash on Delivery blocked to prevent chargebacks.' },
        { kind: 'warning', text: 'Uses suspicious .online domain ending with hidden WHOIS ownership records.' },
        { kind: 'warning', text: 'Fabricated celebrity/doctor endorsement violating CCPA 2022 Endorsement Guidelines.' },
        { kind: 'good', text: 'Product claims to contain herbal botanical ingredients.' },
      ],
      claims: [
        {
          text: 'Clinically proven to melt belly fat in 7 days',
          type: 'health_performance',
          risk: 'high',
          plain_meaning: 'Promises rapid physiological body-fat reduction without any scientific substantiation.',
          evidence_needed: 'Clinical Trial Registry - India (CTRI) registration certificate and peer-reviewed double-blind trial results.',
          rule: 'FSSAI (Advertising and Claims) Regulations & Section 2(28) Consumer Protection Act, 2019',
        },
        {
          text: 'No diet or workout needed for permanent weight loss',
          type: 'health_performance',
          risk: 'high',
          plain_meaning: 'Deceptive promise that defies basic human nutritional science and metabolic principles.',
          evidence_needed: 'Independent ICMR or AYUSH scientific validation study.',
          rule: 'CCPA Guidelines for Prevention of Misleading Advertisements, 2022',
        },
        {
          text: '100% Organic Himalayan Herbs',
          type: 'environmental',
          risk: 'medium',
          plain_meaning: 'Claims certified organic origin without displaying the mandatory Jaivik Bharat seal or NPOP certificate.',
          evidence_needed: 'Valid National Programme for Organic Production (NPOP) certification number.',
          rule: 'CCPA Greenwashing Guidelines 2024 & FSSAI Organic Food Regulations',
        },
      ],
      precautions: [
        'Do not ingest unverified herbal formulations that lack an authenticated 14-digit FSSAI license.',
        'Never transfer upfront money through personal UPI QR codes on single-page websites.',
        'Preserve advertisement screenshots and seller chat logs to report on FSSAI Food Safety Connect.',
      ],
      missing_info: [
        '14-digit FSSAI Manufacturing Licence Number',
        'Physical registered office address in India',
        'Grievance Redressal Officer contact number & email',
        'Transparent 14-day return and refund policy',
      ],
      routes: ['food', 'consumer', 'cyber'],
      complaint_draft: `To,
The Commissioner of Food Safety / Central Consumer Protection Authority
National Consumer Helpline (NCH - 1915)

Subject: Complaint against Herbal Miracle Fat-Burner Detox Tea for illegal therapeutic claims, deceptive health advertising, and missing FSSAI licensing.

1. Respondent / Seller: miracle-slim-ayurtea.online
2. Nature of Violation:
   - False and misleading medical claims violating Section 2(28) of Consumer Protection Act, 2019.
   - Non-compliance with Food Safety and Standards (Advertising and Claims) Regulations, 2018.
   - Violation of CCPA Misleading Advertisement Guidelines, 2022.
3. Specific Grievance:
   The seller advertises an unapproved ingestible tea claiming to 'Melt 10 Kgs fat in 7 days' without providing an FSSAI 14-digit licence, clinical proof, or return policy. Upfront UPI payments are demanded without grievance redressal mechanisms.
4. Relief Sought:
   - Order an immediate takedown of the deceptive website domain.
   - Impose penalties under Section 89 of CPA 2019.
   - Direct refund to aggrieved consumers.`,
      verification_date: 'Oct 24, 2026',
      url: 'https://miracle-slim-ayurtea.online/deal',
    },
  },
  {
    id: 'impersonation-luxury-watch',
    title: 'Luxury Swiss Chronograph – 95% Flash Clearance',
    category: 'Electronics & Fashion',
    typeBadge: 'Brand Impersonation & Dark Patterns',
    expectedGrade: 'F',
    description: 'Lookalike domain mimicking an international luxury brand with a fake 95% clearance discount, countdown timer, and high-pressure dark pattern tactics.',
    sampleUrl: 'https://rolex-official-clearance-india.shop/flash-deal',
    sampleText: `MEGA FLASH SALE! ROLEX SUBMARINER AUTOMATIC WATCH
Regular Price: ₹8,50,000 | Today Only: ₹2,499 (95% OFF)!
Hurry, Deal Ends in 04:32 Minutes! Only 2 units left in stock!
128 people are viewing this watch right now.
Free express courier across India. 100% Genuine with International Warranty Card. Prepaid UPI only to lock the special warehouse rate.`,
    sampleImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'demo-watch',
      product_name: 'Luxury Swiss Chronograph – 95% Flash Clearance',
      category: 'Luxury Goods & Timepieces',
      score: 12,
      grade: 'F',
      product_grade: 'F',
      website_grade: 'F',
      seller_grade: 'F',
      claim_grade: 'F',
      verdict: 'risky',
      headline: 'Severe Impersonation Scam: Counterfeit domain imitating a trademarked brand with predatory dark pattern urgency.',
      reasons: [
        { kind: 'warning', text: 'Domain rolex-official-clearance-india.shop uses trademarked name on an unofficial .shop extension.' },
        { kind: 'warning', text: 'Absurd price drop from ₹8,50,000 to ₹2,499 indicates counterfeit replica or complete non-delivery.' },
        { kind: 'warning', text: 'Classic False Urgency dark pattern with simulated countdown timer and fake scarcity counter.' },
        { kind: 'warning', text: 'Fake "128 people viewing" counter coded with a randomized JavaScript loop.' },
        { kind: 'warning', text: 'Complete absence of manufacturer importer details under Legal Metrology Rules.' },
        { kind: 'good', text: 'Website uses an active SSL certificate (common even on fraudulent storefronts).' },
      ],
      claims: [
        {
          text: '95% OFF clearance discount (₹8,50,000 to ₹2,499)',
          type: 'price_offer',
          risk: 'high',
          plain_meaning: 'Fabricated baseline price designed to deceive buyers into believing they are receiving an authentic luxury item.',
          evidence_needed: 'Proof of actual transactions at the stated base price in India over the past 30 days.',
          rule: 'CCPA Guidelines for Prevention of Misleading Advertisements, 2022 & Dark Patterns Guidelines 2023',
        },
        {
          text: 'Deal ends in 04:32 minutes / Only 2 left in stock',
          type: 'hidden_conditions',
          risk: 'high',
          plain_meaning: 'False Urgency dark pattern forcing shoppers to make impulsive decisions without verification.',
          evidence_needed: 'Auditable warehouse inventory logs proving genuine scarcity.',
          rule: 'CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (Specified Pattern: False Urgency)',
        },
        {
          text: '100% Genuine with International Warranty Card',
          type: 'quality_safety',
          risk: 'high',
          plain_meaning: 'Unauthorised seller cannot issue valid manufacturer warranty cards recognized by official service centres.',
          evidence_needed: 'Official brand distributor authorization certificate.',
          rule: 'Consumer Protection (E-Commerce) Rules, 2020 (Rule 5)',
        },
      ],
      precautions: [
        'Never enter UPI PIN or transfer funds on unsolicited flash-sale websites.',
        'Verify luxury watch serial numbers exclusively through authorized Indian retail boutiques.',
        'Immediately report domain to the National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in).',
      ],
      missing_info: [
        'Authorised Brand Dealership Certificate',
        'Registered Indian Business Entity Name & GSTIN',
        'Physical office address and verified customer care helpline',
        'Clear terms for inspection on delivery',
      ],
      routes: ['cyber', 'consumer', 'ad'],
      complaint_draft: `To,
National Cyber Crime Reporting Portal (cybercrime.gov.in) & CCPA
Subject: Report of trademark impersonation, deceptive dark patterns, and suspected online financial scam.

1. Suspected URL: https://rolex-official-clearance-india.shop/flash-deal
2. Violations:
   - Impersonation of trademarked luxury brand.
   - Deceptive pricing (95% fake discount) violating CCPA Misleading Ad Guidelines 2022.
   - Prohibited Dark Patterns (False Urgency, fake timer) under CCPA Dark Patterns Guidelines 2023.
   - Suspected phishing and UPI financial fraud.
3. Action Requested: Immediate domain blocking and freezing of associated merchant payment gateways.`,
      verification_date: 'Oct 24, 2026',
      url: 'https://rolex-official-clearance-india.shop/flash-deal',
    },
  },
  {
    id: 'greenwashing-bamboo-flask',
    title: '100% Eco-Pure Organic Bamboo Thermal Flask',
    category: 'Home & Kitchen',
    typeBadge: 'Greenwashing & Unsubstantiated Eco Claims',
    expectedGrade: 'C',
    description: 'Promoted as "100% Biodegradable & Zero-Carbon Bamboo Flask". In reality, the interior is made of standard plastic polymer with a thin bamboo veneer glued to the outside.',
    sampleUrl: 'https://greenearthliving.in/products/bamboo-flask',
    sampleText: `100% ECO-PURE ORGANIC BAMBOO THERMAL FLASK
Save the planet with India's first completely biodegradable thermal bottle!
Zero carbon footprint, non-toxic, 100% plastic-free.
Endorsed by international climate champions. Certified earth-safe.
MRP: ₹1,499 | Special Eco-Warriors Price: ₹799.`,
    sampleImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'demo-flask',
      product_name: '100% Eco-Pure Organic Bamboo Thermal Flask',
      category: 'Household Drinkware',
      score: 58,
      grade: 'C',
      product_grade: 'C',
      website_grade: 'B',
      seller_grade: 'C',
      claim_grade: 'D',
      verdict: 'caution',
      headline: 'Caution – Greenwashing Detected: Vague environmental claims without verifiable third-party lifecycle documentation.',
      reasons: [
        { kind: 'warning', text: 'Labelled "100% Plastic-Free" and "Biodegradable", but the inner vacuum lid contains silicone and polypropylene.' },
        { kind: 'warning', text: 'Claims "Zero Carbon Footprint" without providing life-cycle assessment (LCA) data or offset registry proofs.' },
        { kind: 'warning', text: 'Generic "Certified Earth-Safe" logo is a self-generated marketing icon, not an accredited eco-label.' },
        { kind: 'good', text: 'Website has a valid GSTIN number and operational customer care email.' },
        { kind: 'good', text: 'Outer casing utilizes renewable bamboo material.' },
      ],
      claims: [
        {
          text: '100% Biodegradable & Zero Carbon Footprint',
          type: 'environmental',
          risk: 'high',
          plain_meaning: 'Uses absolute green assertions without proving that the entire composite product breaks down in natural soil.',
          evidence_needed: 'ISO 14040/44 Life Cycle Assessment report and accredited compostability certificate (IS/ISO 17088).',
          rule: 'CCPA Guidelines on Prevention and Regulation of Greenwashing, 2024 (Guideline 4 & 5)',
        },
        {
          text: '100% Plastic-Free Thermal Construction',
          type: 'environmental',
          risk: 'medium',
          plain_meaning: 'Masks composite plastic parts within the vacuum cap and internal seals.',
          evidence_needed: 'Complete material specification sheet detailing polymer composition.',
          rule: 'Legal Metrology (Packaged Commodities) Rules & CCPA Misleading Ads 2022',
        },
      ],
      precautions: [
        'Ask the seller for the laboratory material composition test report before buying for hot beverages.',
        'Check whether the product carries the official Government of India Ecomark or BIS certification.',
      ],
      missing_info: [
        'Accredited Third-Party Environmental Certification body name',
        'Breakdown of interior liner materials under Legal Metrology Rules',
        'Detailed warranty terms for thermal insulation performance',
      ],
      routes: ['consumer', 'ad'],
      complaint_draft: `To,
Central Consumer Protection Authority (CCPA)
Subject: Notice regarding unsubstantiated green claims and greenwashing under CCPA Greenwashing Guidelines 2024.

1. Product: 100% Eco-Pure Organic Bamboo Thermal Flask
2. Seller: greenearthliving.in
3. Summary of Concern:
   The seller utilizes generic absolute terminology ('100% Biodegradable', 'Zero Carbon Footprint') without publishing valid third-party life-cycle assessments or testing methodologies, violating CCPA Greenwashing Guidelines 2024.
4. Request: Direct seller to substantiate or retract deceptive environmental marketing.`,
      verification_date: 'Oct 24, 2026',
      url: 'https://greenearthliving.in/products/bamboo-flask',
    },
  },
  {
    id: 'bis-certified-surge-protector',
    title: 'Smart Surge Protector 4-Socket Power Strip',
    category: 'Electrical & Appliances',
    typeBadge: 'Verified BIS Mark & Compliant Disclosures',
    expectedGrade: 'A',
    description: 'A genuine consumer electronic product with authentic Bureau of Indian Standards (BIS) CRS registration R-41000000, ISI safety marks, transparent Indian manufacturer address, and full return policy.',
    sampleUrl: 'https://voltaguard.in/products/smart-surge-4way',
    sampleText: `VOLTAGUARD SMART SURGE PROTECTOR (4-SOCKET WITH DUAL USB)
BIS Certified under CRS Registration Number: R-41002345 (IS 1293:2019 / IS 13252).
Flame-retardant virgin polycarbonate casing. Integrated overload circuit breaker.
MRP: ₹1,299 (Inclusive of all taxes). Unit Sale Price: ₹1,299 per 1 unit.
Manufactured by: VoltaGuard Electronics India Pvt Ltd, Plot 42, Okhla Phase III, New Delhi - 110020.
Grievance Officer: support@voltaguard.in | Helpline: 1800-200-8899. 1-Year On-Site Warranty. 10-day replacement policy.`,
    sampleImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'demo-surge',
      product_name: 'VoltaGuard Smart Surge Protector 4-Socket',
      category: 'Consumer Electronics & Electricals',
      score: 94,
      grade: 'A',
      product_grade: 'A',
      website_grade: 'A',
      seller_grade: 'A',
      claim_grade: 'A',
      verdict: 'safe',
      headline: 'Strong Trust Evidence: Fully verified statutory disclosures, authentic BIS certification, transparent warranty, and compliant e-commerce listing.',
      reasons: [
        { kind: 'good', text: 'Valid BIS CRS registration number (R-41002345) conforming to Indian Standard IS 1293.' },
        { kind: 'good', text: 'Full manufacturer legal name, factory address, and GSTIN prominently displayed.' },
        { kind: 'good', text: 'Designated Consumer Grievance Officer details provided under E-Commerce Rules 2020.' },
        { kind: 'good', text: 'Complies with Legal Metrology Unit Sale Price (USP) and inclusive MRP display.' },
        { kind: 'good', text: 'Clear 10-day replacement window and 1-year manufacturer warranty terms.' },
      ],
      claims: [
        {
          text: 'BIS Certified under CRS Registration R-41002345 (IS 1293:2019)',
          type: 'quality_safety',
          risk: 'low',
          plain_meaning: 'Product has passed safety conformity tests for electric shock and fire resistance conducted by a BIS-recognized laboratory.',
          evidence_needed: 'Verification on BIS CARE portal (matches manufacturer identity).',
          rule: 'Bureau of Indian Standards Act, 2016 & Electronics Quality Control Order',
        },
        {
          text: 'Flame-retardant virgin polycarbonate casing with surge protection',
          type: 'quality_safety',
          risk: 'low',
          plain_meaning: 'Uses standardized self-extinguishing polymer meeting thermal dissipation criteria.',
          evidence_needed: 'UL94 / IS flammability test report on file.',
          rule: 'Consumer Protection Act, 2019 (Accurate specification disclosure)',
        },
      ],
      precautions: [
        'Inspect the physical product on arrival to verify that the BIS CRS logo is indelibly embossed on the bottom casing.',
        'Retain the invoice and warranty card to claim after-sales support if needed.',
      ],
      missing_info: [],
      routes: ['consumer'],
      complaint_draft: 'No complaint necessary. This seller adheres to statutory consumer protection benchmarks.',
      verification_date: 'Oct 24, 2026',
      url: 'https://voltaguard.in/products/smart-surge-4way',
    },
  },
  {
    id: 'fake-govt-laptop-subsidy',
    title: 'Free Prime Minister Student Laptop Distribution 2026',
    category: 'Government Schemes & Subsidies',
    typeBadge: 'PIB Fact Check Alert & Phishing Scam',
    expectedGrade: 'F',
    description: 'Fraudulent website masquerading as an official Government of India welfare portal promising free laptops in exchange for a ₹499 registration fee.',
    sampleUrl: 'https://pm-yojana-free-laptop-online.in/apply',
    sampleText: `PRADHAN MANTRI FREE LAPTOP YOJANA 2026 - OFFICIAL REGISTRATION PORTAL
All 10th & 12th pass students eligible for free HP/Dell 16GB laptops.
Approved by Ministry of Education. Over 5,00,000 laptops ready for dispatch!
Pay mandatory courier handling fee of ₹499 via UPI to confirm your home address.
Only 48 hours left to apply! Enter your Aadhaar number and Bank Account details below.`,
    sampleImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'demo-govt',
      product_name: 'Free PM Student Laptop Scheme 2026 (Phishing Scam)',
      category: 'Fake Government Schemes & Cyber Fraud',
      score: 5,
      grade: 'F',
      product_grade: 'F',
      website_grade: 'F',
      seller_grade: 'F',
      claim_grade: 'F',
      verdict: 'risky',
      headline: 'Critical Fraud Alert: Malicious phishing website impersonating government welfare initiatives to harvest Aadhaar and steal registration fees.',
      reasons: [
        { kind: 'warning', text: 'PIB Fact Check has officially flagged this exact website template as a fraudulent scam.' },
        { kind: 'warning', text: 'Unauthorized use of National Emblem and Ministry of Education name violating State Emblem of India Act, 2005.' },
        { kind: 'warning', text: 'Illegal collection of sensitive personal Aadhaar and banking credentials on an unsecured third-party server.' },
        { kind: 'warning', text: 'Demand for ₹499 upfront "handling fee" via personal UPI QR code.' },
        { kind: 'warning', text: 'Unofficial private domain name (.in rather than official .gov.in or .nic.in).' },
      ],
      claims: [
        {
          text: 'Approved by Ministry of Education / 5,00,000 Free Laptops',
          type: 'influencer',
          risk: 'high',
          plain_meaning: 'Complete fabrication designed to defraud students and rural families.',
          evidence_needed: 'Check official Ministry website (education.gov.in) or PIB Fact Check Twitter/portal.',
          rule: 'PIB Fact Check Directives, Information Technology Act 2000, and Indian Penal Code Section 420',
        },
        {
          text: 'Pay mandatory courier handling fee of ₹499 via UPI',
          type: 'price_offer',
          risk: 'high',
          plain_meaning: 'Cyber fraud trick to steal money under the pretext of delivery logistics.',
          evidence_needed: 'Official Government of India gazette notification.',
          rule: 'CCPA Guidelines 2022 & National Cyber Crime Prevention Directives',
        },
      ],
      precautions: [
        'NEVER enter your Aadhaar, bank account, or OTP on non-.gov.in domains.',
        'All genuine Government of India welfare schemes are hosted exclusively on .gov.in or .nic.in websites and NEVER charge upfront UPI fees.',
        'Immediately dial National Cyber Crime Helpline 1930 if funds have been transferred.',
      ],
      missing_info: [
        'Official .gov.in / .nic.in domain authentication',
        'Official Gazette Notification number',
        'Grievance Redressal Officer in accordance with IT Rules 2021',
      ],
      routes: ['pib', 'cyber', 'consumer'],
      complaint_draft: `To,
National Cyber Crime Reporting Portal (cybercrime.gov.in) & PIB Fact Check
Helpline: 1930

Subject: Urgent report against phishing website impersonating Government of India free laptop scheme.

1. URL: https://pm-yojana-free-laptop-online.in/apply
2. Nature of Cyber Crime:
   - Malicious impersonation of Government of India welfare initiatives.
   - Illegal harvesting of citizen Aadhaar numbers and financial credentials.
   - Fraudulent extortion of ₹499 UPI registration fees.
3. Action Requested: Immediate domain takedown by CERT-In and blocking of recipient UPI VPA.`,
      verification_date: 'Oct 24, 2026',
      url: 'https://pm-yojana-free-laptop-online.in/apply',
    },
  },
];
