(() => {
  if (window.top !== window || window.__dbLoaded) return;
  window.__dbLoaded = true;
  const SHOP = /add to (cart|bag|basket)|buy now|checkout|₹\s?\d|rs\.?\s?\d|inr\s?\d|cash on delivery/i;
  const bodyText = () => (document.body?.innerText || "");
  if (!SHOP.test(bodyText())) return;

  // ---- local first look (nothing leaves the browser) ----
  function localCheck() {
    const t = bodyText(), host = location.hostname, flags = []; let score = 82;
    const hit = (cond, pts, msg) => { if (cond) { score -= pts; flags.push(msg); } };
    hit(location.protocol !== "https:", 35, "Page is not using a secure (https) connection");
    hit(/\.(xyz|top|click|buzz|icu|cfd|sbs|shop|store|site|online|live)$/i.test(host), 12, "Unusual website ending (" + host.split(".").pop() + ")");
    hit((host.match(/-/g) || []).length >= 2, 8, "Many hyphens in the website name");
    hit(/(amazon|flipkart|myntra|nykaa|tata|reliance|apple|samsung)/i.test(host) && !/(^|\.)(amazon|flipkart|myntra|nykaa|tatacliq|reliancedigital|apple|samsung)\.(com|in)$/i.test(host), 25, "Website name copies a famous brand");
    const pct = [...t.matchAll(/(\d{2})\s?%\s?off/gi)].map(m => +m[1]);
    hit(pct.some(p => p >= 70), 14, "Very large discount shown (" + Math.max(...pct) + "% off)");
    hit(/only\s+\d+\s+(left|remaining)|hurry|last chance|offer\s+ends|selling fast/i.test(t), 8, "Urgency or scarcity wording");
    hit(/\b\d{1,2}\s*:\s*\d{2}\s*:\s*\d{2}\b/.test(t) && /(ends|sale|offer|deal)/i.test(t), 6, "Countdown timer near an offer");
    hit(!/(return|refund|exchange)/i.test(t), 10, "No return or refund policy found");
    hit(!/(contact|customer care|support|address|phone|@)/i.test(t), 10, "No clear contact details found");
    hit(!/(privacy|terms)/i.test(t), 6, "No privacy policy or terms found");
    hit(/upi only|prepaid only|no cash on delivery|bank transfer only/i.test(t), 10, "Only hard-to-reverse payment options mentioned");
    score = Math.max(5, Math.min(100, score));
    return { score, flags };
  }
  const grade = s => s >= 85 ? "A" : s >= 70 ? "B" : s >= 55 ? "C" : s >= 40 ? "D" : "F";
  const verdict = s => s >= 70 ? "safe" : s >= 40 ? "caution" : "risky";
  const COL = { safe: "#0a9d6e", caution: "#e49b1c", risky: "#d8403a" };
  const LABEL = { safe: "No major warning signs", caution: "Be careful", risky: "Don’t buy yet" };

  // ---- UI in a shadow root so page CSS cannot break it ----
  const host = document.createElement("div");
  host.style.cssText = "all:initial;position:fixed;right:16px;bottom:16px;z-index:2147483647";
  const root = host.attachShadow({ mode: "closed" });
  root.innerHTML = `<style>
   *{box-sizing:border-box;font-family:system-ui,"Noto Sans",sans-serif}
   .badge{width:54px;height:54px;border-radius:50%;border:0;color:#fff;font:800 24px system-ui;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.2),0 10px 24px rgba(0,0,0,.3)}
   .panel{position:absolute;right:0;bottom:66px;width:330px;max-height:70vh;overflow:auto;background:#fff;color:#0e2a3a;border-radius:16px;padding:14px;box-shadow:0 18px 44px rgba(0,0,0,.35);display:none;font-size:13px;line-height:1.5}
   .panel.open{display:block}.top{display:flex;gap:10px;align-items:center;margin-bottom:8px}
   .g{width:46px;height:46px;border-radius:12px;color:#fff;font:800 26px/46px system-ui;text-align:center}
   b{display:block;font-size:15px}ul{margin:6px 0;padding-left:18px}li{margin:3px 0}
   button.a,select{border-radius:9px;padding:8px 10px;font:600 13px system-ui}
   button.a{width:100%;border:0;background:#0e2a3a;color:#fff;cursor:pointer;margin-top:6px}select{width:100%;border:1px solid #d5e5df;margin-top:6px}
   .r{color:#d8403a}.ok{color:#0a9d6e}small{color:#55707e;display:block;margin-top:8px}a{color:#0a9d6e;font-weight:600}
  </style><button class="badge" id="bd" aria-label="DETECT BUY"></button><div class="panel" id="pn"></div>`;
  const bd = root.getElementById("bd"), pn = root.getElementById("pn");
  const LANGS = { en: "English", hi: "हिन्दी", mr: "मराठी", bn: "বাংলা", ta: "தமிழ்", te: "తెలుగు", gu: "ગુજરાતી", kn: "ಕನ್ನಡ", ml: "മലയാളം", pa: "ਪੰਜਾਬੀ", or: "ଓଡ଼ିଆ", ur: "اردو", as: "অসমীয়া" };
  const mk = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x !== undefined) e.textContent = x; return e; };

  let local = localCheck(), ai = null;
  function paint() {
    const s = ai ? ai.score : local.score, v = ai ? ai.verdict : verdict(local.score), g = ai ? ai.grade : grade(local.score);
    bd.style.background = COL[v]; bd.textContent = g;
    pn.replaceChildren();
    const top = mk("div", "top"), gb = mk("div", "g", g); gb.style.background = COL[v];
    const tt = mk("div"); const h = mk("b", "", LABEL[v]); tt.append(h, mk("span", "", s + " / 100" + (ai ? " · AI check" : " · quick local check")));
    top.append(gb, tt); pn.append(top);
    if (ai) { pn.append(mk("p", "", ai.headline || "")); }
    const ul = mk("ul");
    if (ai) (ai.reasons || []).forEach(x => ul.append(mk("li", x.kind === "good" ? "ok" : "r", x.text)));
    else local.flags.forEach(f => ul.append(mk("li", "r", f)));
    if (!ul.children.length) ul.append(mk("li", "ok", "No warning signs found by the quick check."));
    pn.append(ul);
    if (ai && ai.precautions?.length) { pn.append(mk("b", "", "Before you pay")); const p = mk("ul"); ai.precautions.forEach(x => p.append(mk("li", "", x))); pn.append(p); }
    if (v !== "safe") { const a = mk("a", "", "Report on National Consumer Helpline (1915)"); a.href = "https://consumerhelpline.gov.in/"; a.target = "_blank"; a.rel = "noopener"; pn.append(a); }
    const sel = mk("select"); sel.setAttribute("aria-label", "Language");
    for (const [k, n] of Object.entries(LANGS)) sel.add(new Option(n, k));
    chrome.storage.sync.get("lang").then(({ lang }) => { if (lang) sel.value = lang; });
    sel.onchange = () => chrome.storage.sync.set({ lang: sel.value });
    const btn = mk("button", "a", ai ? "Check again with AI" : "Deep check with AI"); btn.onclick = deep;
    pn.append(sel, btn, mk("small", "", "Screening aid only. Not proof that a seller is genuine or fake. Page text is sent for AI analysis only when you press the button."));
  }
  async function deep() {
    const btn = pn.querySelector("button.a"); btn.disabled = true; btn.textContent = "Checking…";
    const { lang } = await chrome.storage.sync.get("lang");
    const res = await chrome.runtime.sendMessage({ type: "ANALYZE", payload: { text: bodyText().replace(/\s+/g, " ").slice(0, 12000), url: location.href, title: document.title, lang: lang || "en", local } });
    if (!res?.ok) { btn.disabled = false; btn.textContent = "Deep check with AI"; pn.append(mk("p", "r", res?.error || "Could not reach DETECT BUY. Check Settings.")); return; }
    ai = res.data; paint();
  }
  bd.onclick = () => pn.classList.toggle("open");
  chrome.runtime.onMessage.addListener(m => { if (m.type === "TOGGLE") host.style.display = host.style.display === "none" ? "" : "none"; });
  paint(); document.documentElement.append(host);
})();
