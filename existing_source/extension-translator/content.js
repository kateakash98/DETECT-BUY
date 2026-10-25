(() => {
  if (window.__dbTr) return; window.__dbTr = true;
  const done = new Map(); // node -> original text
  const SEL = "p,li,h1,h2,h3,h4,td,th,label,button,a,span";
  function blocks() {
    const out = [];
    for (const e of document.querySelectorAll(SEL)) {
      if (out.length >= 60) break;
      if (e.children.length || !e.offsetParent || done.has(e)) continue;
      const t = e.textContent.trim();
      if (t.length > 2 && /\p{L}/u.test(t)) out.push(e);
    }
    return out;
  }
  function overlay(text) {
    const d = document.createElement("div");
    d.style.cssText = "position:fixed;right:16px;top:16px;max-width:340px;z-index:2147483647;background:#fff;color:#0e2a3a;border:2px solid #0a9d6e;border-radius:14px;padding:14px;font:15px/1.5 system-ui,'Noto Sans';box-shadow:0 14px 36px rgba(0,0,0,.3);white-space:pre-wrap";
    d.textContent = text; const x = document.createElement("button"); x.textContent = "Close"; x.style.cssText = "display:block;margin-top:8px"; x.onclick = () => d.remove(); d.append(x);
    document.documentElement.append(d);
  }
  const ask = (texts, lang, mode) => chrome.runtime.sendMessage({ type: "TRANSLATE", texts, lang, mode });
  chrome.runtime.onMessage.addListener((m, _s, send) => {
    if (m.type !== "RUN") return;
    (async () => {
      if (m.scope === "restore") { for (const [e, t] of done) e.textContent = t; done.clear(); return send({}); }
      if (m.scope === "selection") {
        const sel = String(getSelection()).trim();
        if (!sel) return send({ error: "Select some text first." });
        const r = await ask([sel], m.lang, m.mode);
        if (!r?.ok) return send({ error: r?.error }); overlay(r.t[0] || ""); return send({});
      }
      const els = blocks();
      if (!els.length) return send({ error: "No readable text found." });
      const r = await ask(els.map(e => e.textContent.trim()), m.lang, m.mode);
      if (!r?.ok) return send({ error: r?.error });
      els.forEach((e, i) => { if (r.t[i]) { done.set(e, e.textContent); e.textContent = r.t[i]; } });
      send({});
    })().catch(e => send({ error: e.message }));
    return true;
  });
})();
