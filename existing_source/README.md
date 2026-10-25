# DETECT BUY – website + two Chrome extensions

## Put the website on Replit
1. Create a new Replit (Node.js). Upload everything in this folder (keep the `public` folder).
2. Replit → Secrets → add `ANTHROPIC_API_KEY` (your key). Optional: `CLAUDE_MODEL`.
3. Press Run. Open the web preview. For a public link use Deploy.
4. The key stays on the server. Never put it in the website or extension files.

## Install the extensions (Chrome, Edge, Brave)
1. `chrome://extensions` → Developer mode → Load unpacked.
2. Load `extension-detector` (shopping badge) and `extension-translator` (language helper).
3. In each extension's Settings, paste your Replit address (e.g. https://detect-buy.yourname.repl.co).
   Or edit DEFAULT_BACKEND in background.js.

## Notes
- Detector runs a local first look on every shopping page and sends text to the server only when the user presses "Deep check with AI". The broad "all sites" permission needs a privacy policy before Chrome Web Store publishing.
- Complaints are drafted for the user to file on official portals. There is no official government data-sharing link; that needs a formal arrangement with the department.
- Verify every portal URL in `public/index.html` (AUTH list) before launch. Add icons before store submission.
- The server limits each visitor to 40 checks per 10 minutes. Add a database or captcha before large public use.
