const DEFAULT_BACKEND = "https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co";
chrome.runtime.onMessage.addListener((msg, _s, send) => {
  if (msg.type !== "ANALYZE") return;
  (async () => {
    const { backend } = await chrome.storage.sync.get("backend");
    const base = (backend || DEFAULT_BACKEND).replace(/\/$/, "");
    const r = await fetch(base + "/api/analyze", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(msg.payload) });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Error " + r.status);
    send({ ok: true, data: d });
  })().catch(e => send({ ok: false, error: e.message }));
  return true;
});
chrome.action.onClicked.addListener(t => t.id && chrome.tabs.sendMessage(t.id, { type: "TOGGLE" }).catch(() => {}));
