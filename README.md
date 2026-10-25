# DETECT BUY – Detect Before You Buy.
### AI-Powered Consumer Protection Platform for Indian Consumers

> **Mission:** Make every Indian consumer confident enough to verify before buying and informed enough to report suspicious practices.

---

## 🛡️ Executive Summary

**DETECT BUY** is an AI-powered consumer protection platform built specifically for Indian online shoppers. It screens e-commerce websites, packaging photos, social media advertisements, and video promos against Indian statutory consumer standards:
- **Consumer Protection Act, 2019** (Section 2(28), 2(47), Section 89)
- **Consumer Protection (E-Commerce) Rules, 2020** & amendments
- **CCPA Guidelines for Prevention of Misleading Advertisements and Endorsements, 2022**
- **CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023** (13 prohibited patterns including False Urgency, Drip Pricing, Basket Sneaking)
- **CCPA Greenwashing Guidelines, 2024** (Unsubstantiated eco-friendly & carbon-neutral claims)
- **Bureau of Indian Standards (BIS)**: Compulsory Registration Scheme (CRS) R-numbers, ISI Mark, and Gold Hallmarking (HUID)
- **FSSAI Food Safety & Standards (Advertising & Claims) Regulations**: 14-digit licence & prohibited therapeutic claims
- **Legal Metrology (Packaged Commodities) Rules**: Mandatory MRP and Unit Sale Price (USP)
- **Jago Grahak Jago** & **National Consumer Helpline (1915)** integration

---

## 🚀 Core Features

### 1. First-Screen Action Hero
- **Action 1: Upload Image / Video / Screenshot**
  - Supports JPG, JPEG, PNG, WEBP, and MP4 videos.
  - Video frame extraction: automatically samples frames at 15%, 50%, and 85% timestamps using HTML5 canvas.
  - Clipboard paste support (Ctrl+V) and drag-and-drop.
- **Action 2: Paste Product or Website URL**
  - Real-time client-side heuristic inspection: checks HTTPS, suspicious domain endings (.xyz, .shop, .icu), brand impersonation, deceptive discounts (70%+ off), and dark pattern urgency.
- **Action 3: Start AI Detection**
  - 5-step visual processing stepper (Evidence upload → Claims extraction → Regulatory check → Official source cross-verification → Trust report).

### 2. Transparent Product Trust Grading System (A–F)
- **Grade A (Green):** Strong verified evidence (BIS/FSSAI compliance, transparent seller, refund policy).
- **Grade B (Light Green):** Mostly supported evidence with minor non-critical omissions.
- **Grade C (Yellow):** Requires verification; vague claims or missing contact channels.
- **Grade D (Orange):** Significant warning signs (dark patterns, steep artificial discounts).
- **Grade F (Red):** Severe falsification, impersonation scam, or missing mandatory food/electronics certification.
- **Grade U (Grey):** Insufficient information to verify.
- **Component Sub-Grades:** Product Authenticity, Website Trustworthiness, Seller Verification, and Claim Honesty.

### 3. Two Independent AI Browser Extensions (Manifest V3)
1. **DETECT BUY AI Detector (`extension-detector/`)**:
   - Grammarly-like floating shield badge on e-commerce storefronts.
   - Immediate local security check without transmitting browsing data.
   - Deep AI check button with expandable findings panel.
2. **DETECT BUY Language AI (`extension-translator/`)**:
   - Breaks language barriers for rural shoppers and students across 12+ Indian languages.
   - **Simplification Mode**: Converts obscure fine-print asterisks and marketing hype into plain everyday speech.
   - In-app interactive simulator to test both extensions directly on the webpage!
   - 1-Click ZIP download buttons using `jszip`.

### 4. AI Multilingual Explanation Engine
- Simplifies technical and legal marketing assertions into 12 Indian languages:
  - English, Hindi (हिन्दी), Marathi (मराठी), Gujarati (ગુજરાતી), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼िଆ), Assamese (অসমীয়া), and Urdu (اردو).

### 5. Smart Complaint Assistant
- Pre-formats an editable legal consumer grievance petition compliant with Section 35 of CPA 2019.
- Evidence preservation checklist (screenshots, payment reference, chat logs).
- Direct one-click routing to:
  - National Consumer Helpline (NCH - 1915 / consumerhelpline.gov.in)
  - e-Jagriti Digital Commission (e-jagriti.gov.in)
  - FSSAI Food Safety Connect (foscos.fssai.gov.in/consumergrievance)
  - BIS CARE (bis.gov.in)
  - National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in)

### 6. "BE A SMART GRAHAK" Consumer Awareness Centre
- 8-stage interactive visual comic / storyboard walking users through the trap of fake urgency, scanning with DETECT BUY, receiving red warnings, preserving evidence, and filing on NCH 1915.

### 7. Live Demonstration Sandbox
- 5 pre-loaded, realistic Indian scenarios for hackathon judges and evaluators:
  1. *Herbal Miracle Fat-Burner Tea* (Health claim & missing FSSAI - Grade F)
  2. *Luxury Watch 95% Off Flash Sale* (Impersonation & dark pattern urgency - Grade F)
  3. *100% Eco-Pure Organic Bamboo Flask* (Greenwashing claim - Grade C)
  4. *VoltaGuard Smart Surge Protector* (BIS Certified Genuine Product - Grade A)
  5. *Free PM Student Laptop Scheme* (Phishing & cyber fraud - Grade F)

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion.
- **Backend:** Node.js, Express, tsx.
- **AI Engine:** Google Gemini API (`@google/genai` SDK, model `gemini-3.8-flash`) with server-side proxy routes and heuristic verification fallback.
- **Extensions:** Manifest V3, Chrome & Microsoft Edge compatible, Shadow DOM encapsulation.
- **Bundler:** Vite with dev middleware mounted in `server.ts`.

---

## 📦 How to Install and Test the Browser Extensions

1. Open the **Browser Extensions** tab inside the DETECT BUY application.
2. Click **Download Detector (ZIP)** or **Download Translator (ZIP)**.
3. Extract the downloaded ZIP file into a folder on your machine.
4. In Chrome open `chrome://extensions` (or in Edge `edge://extensions`).
5. Enable **Developer mode** toggle in the top-right corner.
6. Click **Load unpacked** and select the extracted extension folder.
7. Open any shopping website to see the floating shield badge or use the Language popup!

---

## ⚙️ Environment Variables

Configure in `.env`:
\`\`\`env
# Gemini API Key (injected automatically in AI Studio)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Port (default 3000)
PORT=3000
\`\`\`

---

## 📜 Statutory Notice
*DETECT BUY is an independent consumer protection and screening platform. The grading system and risk indicators are informational assessments derived from public signals and statutory standards (CPA 2019, CCPA, BIS, FSSAI). They do not constitute formal judicial findings, certified government seals, or laboratory safety certifications.*
