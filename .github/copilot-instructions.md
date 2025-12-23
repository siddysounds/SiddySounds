<!-- .github/copilot-instructions.md -->
# Copilot instructions for SiddySounds

Purpose
- Give AI coding agents the minimal, actionable context to be productive editing this static site.

Big picture
- This repository is a static personal site (no backend). Primary entry is `index.html` and sibling pages like `tracks.html`, `videos.html`, `weather.html`.
- Static assets are organized into: `css/`, `js/`, `javascripts/`, `images/`, `fonts/`, and `stylesheets/`.
- `CNAME` indicates GitHub Pages deployment is used for publishing.

Key components & why
- `index.html`: main page. Loads styles from `css/` (e.g., `bootstrap.min.css`, `style.css`, `css/colors/*`) and scripts from `js/`.
- `css/colors/`: theme variants are swapped at runtime — see the color link with `id="csscolors2"` in `index.html`.
- `js/` vs `javascripts/`: both folders exist and may contain similarly named files (for example, `main.js` appears under `js/` and `javascripts/`). Always check which path a page actually includes before editing/removing files.
- `stylesheets/` holds legacy/generated CSS (syntax highlighting etc.) — prefer editing files under `css/` for site styles.

Developer workflows
- Preview locally: run a lightweight static server from repo root, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

- VS Code Live Server also works; ensure site root is repository root so relative paths resolve.
- Deploy: repository includes `CNAME` — site is served via GitHub Pages. To publish changes, push to the branch used by Pages (check repo settings).

Project-specific patterns to follow
- When changing visual theme, update the `css/colors/*` file referenced by `id="csscolors2"` in `index.html` rather than editing many files.
- For behavior changes, inspect the `script` tags at the bottom of each HTML page — some pages point to `js/` files, others may point to `javascripts/`. Modify the file actually imported by the page.
- External scripts/styles: Google Fonts and ShareThis are loaded from remote CDNs. Tests or local previews may fail offline; mock or allow network for page rendering.

Integration points & gotchas
- External services: ShareThis and Google Fonts are loaded via third-party URLs (see `index.html`). When debugging missing icons/metrics, check network console for blocked external resources.
- Duplicate filenames: before deleting or refactoring a `main.js` or `style.css`, grep the repo and inspect pages to avoid breaking pages that reference alternate folders.

Files to inspect for context/examples
- `index.html` — main entry, shows how CSS & JS are included.
- `css/style.css` and `css/colors/brown.css` — primary styles and theme example.
- `js/main.js` and `javascripts/main.js` — check both for behavior; which one is used depends on the page.

What not to assume
- There are no automated tests or build scripts in the repo. Treat edits as changes to a static site and validate by serving the files locally.

If something’s unclear
- Ask which branch is used for GitHub Pages or whether you want to consolidate duplicate folders (`js/` vs `javascripts/`) before refactoring.

Example quick tasks
- Change theme color: update `css/colors/brown.css` or swap the `href` on the link with `id="csscolors2"` in `index.html`.
- Add a new page: create `<newpage>.html`, include existing header/footer markup from `index.html`, and link assets with the same relative paths.

End of file
