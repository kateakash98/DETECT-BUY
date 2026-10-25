const DEFAULT_BACKEND = "https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co";
async function translate(texts, lang, mode) {
  const { backend } = await chrome.storage.sync.get("backend");
  const r = await fetch((backend || DEFAULT_BACKEND).replace(/\/$/, "") + "/api/translate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ texts, lang, mode }) });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Error " + r.status);
  return d.translations;
}
chrome.runtime.onMessage.addListener((m, _s, send) => {
  if (m.type !== "TRANSLATE") return;
  translate(m.texts, m.lang, m.mode).then(t => send({ ok: true, t })).catch(e => send({ ok: false, error: e.message }));
  return true;
});
chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create({ id: "explain", title: "Explain in my language (DETECT BUY)", contexts: ["selection"] }));
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const { lang } = await chrome.storage.sync.get("lang");
  await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  chrome.tabs.sendMessage(tab.id, { type: "RUN", scope: "selection", lang: lang || "hi", mode: "simplify" });
});
