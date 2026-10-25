const L = { en: "English", hi: "हिन्दी", mr: "मराठी", bn: "বাংলা", ta: "தமிழ்", te: "తెలుగు", gu: "ગુજરાતી", kn: "ಕನ್ನಡ", ml: "മലയാളം", pa: "ਪੰਜਾਬੀ", or: "ଓଡ଼ିଆ", ur: "اردو", as: "অসমীয়া" };
for (const [k, v] of Object.entries(L)) lang.add(new Option(v, k));
chrome.storage.sync.get("lang").then(v => { if (v.lang && L[v.lang]) lang.value = v.lang; });
o.onclick = e => { e.preventDefault(); chrome.runtime.openOptionsPage(); };
document.querySelectorAll("button[data-s]").forEach(b => b.onclick = async () => {
  const code = custom.value.trim() || lang.value;
  chrome.storage.sync.set({ lang: code });
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!/^https?:/.test(tab?.url || "")) return (st.textContent = "Open a normal web page first.");
  await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  st.textContent = "Working…";
  const r = await chrome.tabs.sendMessage(tab.id, { type: "RUN", scope: b.dataset.s, lang: code, mode: simple.checked ? "simplify" : "translate" });
  st.textContent = r?.error || "Done.";
});
