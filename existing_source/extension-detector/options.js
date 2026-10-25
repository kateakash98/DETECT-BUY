chrome.storage.sync.get("backend").then(v => (b.value = v.backend || ""));
s.onclick = async () => { await chrome.storage.sync.set({ backend: b.value.trim() }); ok.textContent = "Saved"; };
