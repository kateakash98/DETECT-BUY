import JSZip from 'jszip';

export async function downloadDetectorExtensionZip(currentBackendUrl: string): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('detect-buy-detector-extension')!;

  const manifest = {
    manifest_version: 3,
    name: 'DETECT BUY – AI Shopping Detector',
    version: '2.0.0',
    description: 'AI-powered consumer protection badge: grade, red/green trust signals, dark pattern alerts, and legal guideline checks before you pay.',
    permissions: ['storage'],
    host_permissions: ['<all_urls>'],
    background: { service_worker: 'background.js' },
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*'],
        js: ['content.js'],
        run_at: 'document_idle',
      },
    ],
    action: { default_title: 'DETECT BUY: Show or hide safety shield' },
    options_page: 'options.html',
  };

  const backgroundJs = `const DEFAULT_BACKEND = "${currentBackendUrl}";
chrome.runtime.onMessage.addListener((msg, _s, send) => {
  if (msg.type !== "ANALYZE") return;
  (async () => {
    const { backend } = await chrome.storage.sync.get("backend");
    const base = (backend || DEFAULT_BACKEND).replace(/\\/$/, "");
    const r = await fetch(base + "/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(msg.payload)
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Error " + r.status);
    send({ ok: true, data: d });
  })().catch(e => send({ ok: false, error: e.message }));
  return true;
});
chrome.action.onClicked.addListener(t => t.id && chrome.tabs.sendMessage(t.id, { type: "TOGGLE" }).catch(() => {}));
`;

  const contentJs = `(() => {
  if (window.top !== window || window.__dbLoaded) return;
  window.__dbLoaded = true;
  const SHOP = /add to (cart|bag|basket)|buy now|checkout|₹\\s?\\d|rs\\.?\\s?\\d|inr\\s?\\d|cash on delivery/i;
  const bodyText = () => (document.body?.innerText || "");
  if (!SHOP.test(bodyText())) return;

  function localCheck() {
    const t = bodyText(), host = location.hostname, flags = []; let score = 84;
    const hit = (cond, pts, msg) => { if (cond) { score -= pts; flags.push(msg); } };
    hit(location.protocol !== "https:", 35, "Insecure HTTP connection without SSL");
    hit(/\\.(xyz|top|click|buzz|icu|cfd|sbs|shop|store|site|online|live)$/i.test(host), 15, "High-risk domain extension (" + host.split(".").pop() + ")");
    hit((host.match(/-/g) || []).length >= 2, 8, "Multiple hyphens in domain name (impersonation indicator)");
    hit(/(amazon|flipkart|myntra|nykaa|tata|apple|samsung)/i.test(host) && !/(^|\\.)(amazon|flipkart|myntra|nykaa|tatacliq|apple|samsung)\\.(com|in)$/i.test(host), 35, "Domain mimics a famous brand (impersonation alert)");
    const pct = [...t.matchAll(/(\\d{2})\\s?%\\s?off/gi)].map(m => +m[1]);
    hit(pct.some(p => p >= 70), 18, "Steep discount claimed (" + Math.max(...pct) + "% off) - check base price");
    hit(/only\\s+\\d+\\s+(left|remaining)|hurry|last chance|offer\\s+ends/i.test(t), 10, "False urgency dark pattern detected");
    hit(/\\b\\d{1,2}\\s*:\\s*\\d{2}\\s*:\\s*\\d{2}\\b/.test(t) && /(ends|sale|deal)/i.test(t), 8, "Countdown timer near purchase button");
    hit(!/(return|refund|exchange)/i.test(t), 12, "No visible return/refund policy found");
    hit(!/(contact|customer care|support|address|phone|@)/i.test(t), 12, "No physical contact or customer care details");
    hit(/upi only|prepaid only|no cod|bank transfer only/i.test(t), 14, "Irreversible prepaid payment method forced");
    score = Math.max(5, Math.min(100, score));
    return { score, flags };
  }

  const grade = s => s >= 85 ? "A" : s >= 70 ? "B" : s >= 55 ? "C" : s >= 40 ? "D" : "F";
  const verdict = s => s >= 70 ? "safe" : s >= 40 ? "caution" : "risky";
  const COL = { safe: "#059669", caution: "#d97706", risky: "#dc2626" };
  const LABEL = { safe: "Strong Trust Signals", caution: "Verify Before Paying", risky: "High Risk Warning" };

  const host = document.createElement("div");
  host.style.cssText = "all:initial;position:fixed;right:20px;bottom:20px;z-index:2147483647";
  const root = host.attachShadow({ mode: "closed" });
  root.innerHTML = \`<style>
   *{box-sizing:border-box;font-family:system-ui,"Noto Sans",sans-serif}
   .badge{width:56px;height:56px;border-radius:50%;border:2px solid #fff;color:#fff;font:800 24px system-ui;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;transition:transform .2s}
   .badge:hover{transform:scale(1.08)}
   .panel{position:absolute;right:0;bottom:70px;width:340px;max-height:75vh;overflow:auto;background:#fff;color:#0e2a3a;border-radius:18px;padding:16px;box-shadow:0 20px 48px rgba(0,0,0,.35);display:none;font-size:13px;line-height:1.5;border:1px solid #d5e5df}
   .panel.open{display:block}
   .top{display:flex;gap:12px;align-items:center;margin-bottom:12px;border-bottom:1px solid #eef3f1;padding-bottom:10px}
   .g{width:48px;height:48px;border-radius:12px;color:#fff;font:800 26px/48px system-ui;text-align:center}
   b{display:block;font-size:14px;font-weight:700}
   ul{margin:8px 0;padding-left:18px}li{margin:4px 0}
   button.a,select{border-radius:10px;padding:9px 12px;font:600 13px system-ui}
   button.a{width:100%;border:0;background:#065f46;color:#fff;cursor:pointer;margin-top:8px}
   button.a:hover{background:#047857}
   select{width:100%;border:1px solid #d5e5df;margin-top:8px;background:#f9fafb}
   .r{color:#dc2626;font-weight:500}.ok{color:#059669;font-weight:500}
   small{color:#64748b;display:block;margin-top:10px;font-size:11px}
   a.portal{display:block;color:#059669;font-weight:700;margin-top:10px;text-decoration:none}
  </style><button class="badge" id="bd" aria-label="DETECT BUY Safety Shield"></button><div class="panel" id="pn"></div>\`;

  const bd = root.getElementById("bd"), pn = root.getElementById("pn");
  const LANGS = { en: "English", hi: "हिन्दी", mr: "मराठी", bn: "বাংলা", ta: "தமிழ்", te: "తెలుగు", gu: "ગુજરાતી", kn: "ಕನ್ನಡ", ml: "മലയാളം", pa: "ਪੰਜਾਬੀ", or: "ଓଡ଼ିଆ", as: "অসমীয়া", ur: "اردو" };
  const mk = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x !== undefined) e.textContent = x; return e; };

  let local = localCheck(), ai = null;
  function paint() {
    const s = ai ? ai.score : local.score, v = ai ? ai.verdict : verdict(local.score), g = ai ? ai.grade : grade(local.score);
    bd.style.background = COL[v]; bd.textContent = g;
    pn.replaceChildren();
    const top = mk("div", "top"), gb = mk("div", "g", g); gb.style.background = COL[v];
    const tt = mk("div"); const h = mk("b", "", LABEL[v]); tt.append(h, mk("span", "", s + " / 100" + (ai ? " · AI Verified" : " · Instant Local Check")));
    top.append(gb, tt); pn.append(top);
    if (ai && ai.headline) { pn.append(mk("p", "", ai.headline)); }
    const ul = mk("ul");
    if (ai) (ai.reasons || []).forEach(x => ul.append(mk("li", x.kind === "good" ? "ok" : "r", x.text)));
    else local.flags.forEach(f => ul.append(mk("li", "r", f)));
    if (!ul.children.length) ul.append(mk("li", "ok", "No major red flags detected by initial scan."));
    pn.append(ul);
    if (ai && ai.precautions?.length) { pn.append(mk("b", "", "Before you pay")); const p = mk("ul"); ai.precautions.forEach(x => p.append(mk("li", "", x))); pn.append(p); }
    if (v !== "safe") { const a = mk("a", "portal", "Report on National Consumer Helpline (1915)"); a.href = "https://consumerhelpline.gov.in/"; a.target = "_blank"; a.rel = "noopener"; pn.append(a); }
    const sel = mk("select"); sel.setAttribute("aria-label", "Language");
    for (const [k, n] of Object.entries(LANGS)) sel.add(new Option(n, k));
    chrome.storage.sync.get("lang").then(({ lang }) => { if (lang) sel.value = lang; });
    sel.onchange = () => chrome.storage.sync.set({ lang: sel.value });
    const btn = mk("button", "a", ai ? "Deep Re-Check with AI" : "Deep Check with AI"); btn.onclick = deep;
    pn.append(sel, btn, mk("small", "", "Aligned with CPA 2019 & CCPA Guidelines. Data is sent for AI analysis only when you press Deep Check."));
  }
  async function deep() {
    const btn = pn.querySelector("button.a"); btn.disabled = true; btn.textContent = "Analyzing against Indian regulations…";
    const { lang } = await chrome.storage.sync.get("lang");
    const res = await chrome.runtime.sendMessage({ type: "ANALYZE", payload: { text: bodyText().replace(/\\s+/g, " ").slice(0, 12000), url: location.href, title: document.title, lang: lang || "en", local } });
    if (!res?.ok) { btn.disabled = false; btn.textContent = "Deep Check with AI"; pn.append(mk("p", "r", res?.error || "Could not reach DETECT BUY backend. Check Options.")); return; }
    ai = res.data; paint();
  }
  bd.onclick = () => pn.classList.toggle("open");
  chrome.runtime.onMessage.addListener(m => { if (m.type === "TOGGLE") host.style.display = host.style.display === "none" ? "" : "none"; });
  paint(); document.documentElement.append(host);
})();
`;

  const optionsHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>DETECT BUY Detector Settings</title>
<style>body{font-family:sans-serif;max-width:480px;margin:24px auto;padding:16px;color:#0e2a3a}input{width:100%;padding:10px;margin:8px 0;border:1px solid #cbd5e1;border-radius:8px}button{background:#059669;color:#fff;border:0;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer}</style>
</head>
<body>
<h2>DETECT BUY – Detector Settings</h2>
<p>Set your DETECT BUY backend endpoint:</p>
<input id="backend" type="url" placeholder="https://..." value="${currentBackendUrl}">
<button id="save">Save Settings</button>
<p id="msg" style="color:#059669;margin-top:10px"></p>
<script src="options.js"></script>
</body>
</html>`;

  const optionsJs = `const b = document.getElementById("backend"), s = document.getElementById("save"), m = document.getElementById("msg");
chrome.storage.sync.get("backend").then(({ backend }) => { if (backend) b.value = backend; });
s.onclick = () => { chrome.storage.sync.set({ backend: b.value.trim() }, () => { m.textContent = "Settings saved!"; setTimeout(() => m.textContent = "", 2000); }); };
`;

  const readme = `# DETECT BUY – AI Shopping Detector Extension (Manifest V3)

## Features
- Displays a Grammarly-like floating shield badge on e-commerce shopping pages.
- Immediate local heuristic scan: detects insecure HTTP, suspicious domain endings, brand impersonation, deceptive discounts (70%+ off), and dark pattern urgency countdowns.
- Deep AI Check button: analyzes claims against the Consumer Protection Act 2019, CCPA 2022 Misleading Ad Rules, CCPA 2023 Dark Pattern Rules, and BIS/FSSAI mandates.
- Direct quick link to the National Consumer Helpline (1915).

## Installation in Chrome / Microsoft Edge
1. Extract this zip file into a folder on your computer.
2. Open your browser and navigate to:
   - Chrome: \`chrome://extensions\`
   - Edge: \`edge://extensions\`
3. Enable **Developer mode** (toggle in top-right or sidebar).
4. Click **Load unpacked** and select this unzipped folder.
5. In the extension details, open **Extension options** and confirm your DETECT BUY backend URL:
   \`${currentBackendUrl}\`
6. Open any e-commerce page (Amazon, Flipkart, or a test online store) to see the DETECT BUY floating shield!
`;

  folder.file('manifest.json', JSON.stringify(manifest, null, 2));
  folder.file('background.js', backgroundJs);
  folder.file('content.js', contentJs);
  folder.file('options.html', optionsHtml);
  folder.file('options.js', optionsJs);
  folder.file('README.md', readme);

  const content = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(content);
  a.download = 'detect-buy-detector-extension.zip';
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function downloadTranslatorExtensionZip(currentBackendUrl: string): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('detect-buy-language-extension')!;

  const manifest = {
    manifest_version: 3,
    name: 'DETECT BUY – Language AI Helper',
    version: '2.0.0',
    description: 'Break language barriers for Indian consumers: translates ads, converts tricky claims into simple everyday language across 12 Indian languages.',
    permissions: ['storage', 'scripting', 'activeTab'],
    host_permissions: ['<all_urls>'],
    background: { service_worker: 'background.js' },
    action: { default_popup: 'popup.html', default_title: 'DETECT BUY Language Helper' },
    options_page: 'options.html',
  };

  const backgroundJs = `const DEFAULT_BACKEND = "${currentBackendUrl}";
chrome.runtime.onMessage.addListener((msg, _s, send) => {
  if (msg.type !== "TRANSLATE") return;
  (async () => {
    const { backend } = await chrome.storage.sync.get("backend");
    const base = (backend || DEFAULT_BACKEND).replace(/\\/$/, "");
    const r = await fetch(base + "/api/translate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ texts: msg.texts, lang: msg.lang, mode: msg.mode })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Error " + r.status);
    send({ ok: true, t: d.translations });
  })().catch(e => send({ ok: false, error: e.message }));
  return true;
});
`;

  const popupHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8">
<style>
body{width:320px;margin:0;padding:16px;font:14px system-ui,'Noto Sans';color:#0e2a3a;background:#f8fafc}
.head{display:flex;align-items:center;gap:8px;margin-bottom:12px}
b.title{font-size:16px}
b.title span{color:#059669}
select,input{width:100%;padding:9px;border:1px solid #cbd5e1;border-radius:8px;margin-top:6px;box-sizing:border-box}
label{display:flex;align-items:center;gap:8px;margin:10px 0;font-weight:600}
button{width:100%;padding:10px;border-radius:8px;font-weight:700;cursor:pointer;margin-bottom:8px;border:0}
.btn-primary{background:#059669;color:#fff}
.btn-sec{background:#e2e8f0;color:#0e2a3a}
#st{font-size:12px;color:#64748b;margin:6px 0}
a{color:#059669;font-size:12px;text-decoration:none}
</style>
</head>
<body>
<div class="head">
  <span style="font-size:22px">🛡️</span>
  <b class="title">DETECT <span>BUY</span> Language AI</b>
</div>
<p style="margin:0 0 10px;font-size:13px;color:#475569">Read advertisements & products in your native language with plain words.</p>
<select id="lang"></select>
<label><input type="checkbox" id="simple" checked> Convert tricky jargon into plain simple words</label>
<button class="btn-primary" data-s="selection">Translate Selected Text</button>
<button class="btn-primary" data-s="page" style="background:#0e2a3a">Translate Entire Page</button>
<button class="btn-sec" data-s="restore">Show Original English Text</button>
<div id="st"></div>
<a href="#" id="o">Extension Settings</a>
<script src="popup.js"></script>
</body>
</html>`;

  const popupJs = `const L = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  mr: "मराठी (Marathi)",
  bn: "বাংলা (Bengali)",
  ta: "தமிழ் (Tamil)",
  te: "తెలుగు (Telugu)",
  gu: "ગુજરાતી (Gujarati)",
  kn: "ಕನ್ನಡ (Kannada)",
  ml: "മലയാളം (Malayalam)",
  pa: "ਪੰਜਾਬੀ (Punjabi)",
  or: "ଓଡ଼ିଆ (Odia)",
  as: "অসমীয়া (Assamese)",
  ur: "اردو (Urdu)"
};
const langEl = document.getElementById("lang"), simpleEl = document.getElementById("simple"), st = document.getElementById("st"), o = document.getElementById("o");
for (const [k, v] of Object.entries(L)) langEl.add(new Option(v, k));
chrome.storage.sync.get("lang").then(v => { if (v.lang && L[v.lang]) langEl.value = v.lang; });
o.onclick = e => { e.preventDefault(); chrome.runtime.openOptionsPage(); };

document.querySelectorAll("button[data-s]").forEach(b => b.onclick = async () => {
  const code = langEl.value;
  chrome.storage.sync.set({ lang: code });
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!/^https?:/.test(tab?.url || "")) return (st.textContent = "Please navigate to a shopping or ad page first.");
  await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  st.textContent = "Translating & simplifying text…";
  const r = await chrome.tabs.sendMessage(tab.id, {
    type: "RUN",
    scope: b.dataset.s,
    lang: code,
    mode: simpleEl.checked ? "simplify" : "translate"
  });
  st.textContent = r?.error || "Translation finished!";
});
`;

  const contentJs = `(() => {
  if (window.__dbTr) return; window.__dbTr = true;
  const done = new Map();
  const SEL = "p,li,h1,h2,h3,h4,td,th,label,button,a,span";

  function blocks() {
    const out = [];
    for (const e of document.querySelectorAll(SEL)) {
      if (out.length >= 60) break;
      if (e.children.length || !e.offsetParent || done.has(e)) continue;
      const t = e.textContent.trim();
      if (t.length > 2 && /\\p{L}/u.test(t)) out.push(e);
    }
    return out;
  }

  function showOverlay(text) {
    const existing = document.getElementById("db-tr-overlay");
    if (existing) existing.remove();
    const d = document.createElement("div");
    d.id = "db-tr-overlay";
    d.style.cssText = "position:fixed;right:20px;top:20px;max-width:380px;z-index:2147483647;background:#fff;color:#0e2a3a;border:2px solid #059669;border-radius:16px;padding:16px;font:14px/1.6 system-ui,'Noto Sans';box-shadow:0 16px 40px rgba(0,0,0,.3);white-space:pre-wrap";
    d.innerHTML = '<b style="display:block;color:#059669;margin-bottom:8px">DETECT BUY Simplified Meaning:</b>';
    const body = document.createElement("div");
    body.textContent = text;
    const x = document.createElement("button");
    x.textContent = "Close";
    x.style.cssText = "display:block;margin-top:12px;background:#059669;color:#fff;border:0;border-radius:8px;padding:6px 14px;cursor:pointer;font-weight:700";
    x.onclick = () => d.remove();
    d.append(body, x);
    document.documentElement.append(d);
  }

  const ask = (texts, lang, mode) => chrome.runtime.sendMessage({ type: "TRANSLATE", texts, lang, mode });

  chrome.runtime.onMessage.addListener((m, _s, send) => {
    if (m.type !== "RUN") return;
    (async () => {
      if (m.scope === "restore") {
        for (const [e, t] of done) e.textContent = t;
        done.clear();
        return send({});
      }
      if (m.scope === "selection") {
        const sel = String(getSelection()).trim();
        if (!sel) return send({ error: "Highlight some ad or product text first." });
        const r = await ask([sel], m.lang, m.mode);
        if (!r?.ok) return send({ error: r?.error });
        showOverlay(r.t[0] || "");
        return send({});
      }
      const els = blocks();
      if (!els.length) return send({ error: "No readable content blocks found on this section." });
      const r = await ask(els.map(e => e.textContent.trim()), m.lang, m.mode);
      if (!r?.ok) return send({ error: r?.error });
      els.forEach((e, i) => {
        if (r.t[i]) {
          done.set(e, e.textContent);
          e.textContent = r.t[i];
        }
      });
      send({});
    })().catch(e => send({ error: e.message }));
    return true;
  });
})();
`;

  const optionsHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Language Helper Settings</title>
<style>body{font-family:sans-serif;max-width:480px;margin:24px auto;padding:16px;color:#0e2a3a}input{width:100%;padding:10px;margin:8px 0;border:1px solid #cbd5e1;border-radius:8px}button{background:#059669;color:#fff;border:0;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer}</style>
</head>
<body>
<h2>DETECT BUY – Language AI Settings</h2>
<p>Set your DETECT BUY backend endpoint:</p>
<input id="backend" type="url" placeholder="https://..." value="${currentBackendUrl}">
<button id="save">Save Settings</button>
<p id="msg" style="color:#059669;margin-top:10px"></p>
<script src="options.js"></script>
</body>
</html>`;

  const optionsJs = `const b = document.getElementById("backend"), s = document.getElementById("save"), m = document.getElementById("msg");
chrome.storage.sync.get("backend").then(({ backend }) => { if (backend) b.value = backend; });
s.onclick = () => { chrome.storage.sync.set({ backend: b.value.trim() }, () => { m.textContent = "Settings saved!"; setTimeout(() => m.textContent = "", 2000); }); };
`;

  const readme = `# DETECT BUY – Language AI Helper Extension (Manifest V3)

## Features
- Eliminates language barriers for Indian consumers across 12+ Indian languages:
  English, Hindi (हिन्दी), Marathi (मराठी), Gujarati (ગુજરાતી), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ), Assamese (অসমীয়া), Urdu (اردو).
- **Simplification Mode**: Converts obscure corporate fine print, legal disclaimers, asterisks, and hyperbolic marketing jargon into plain everyday speech.
- **Selection Translation**: Highlight any suspicious warranty clause or refund condition to see a floating simplified card.
- **Full Page Translation**: In-place replacement of product descriptions, reviews, and specs.

## Installation in Chrome / Microsoft Edge
1. Extract this zip file into a folder on your computer.
2. Open your browser and navigate to:
   - Chrome: \`chrome://extensions\`
   - Edge: \`edge://extensions\`
3. Enable **Developer mode** (toggle in top-right or sidebar).
4. Click **Load unpacked** and select this unzipped folder.
5. In the extension details, open **Extension options** and verify your DETECT BUY backend URL:
   \`${currentBackendUrl}\`
6. Click the DETECT BUY Language Helper icon in your browser toolbar on any webpage!
`;

  folder.file('manifest.json', JSON.stringify(manifest, null, 2));
  folder.file('background.js', backgroundJs);
  folder.file('popup.html', popupHtml);
  folder.file('popup.js', popupJs);
  folder.file('content.js', contentJs);
  folder.file('options.html', optionsHtml);
  folder.file('options.js', optionsJs);
  folder.file('README.md', readme);

  const content = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(content);
  a.download = 'detect-buy-language-extension.zip';
  a.click();
  URL.revokeObjectURL(a.href);
}
