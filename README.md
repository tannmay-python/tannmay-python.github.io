# Tannmay Kumarr Baid

A personal portfolio of writing, research, interactive tools, podcasts and life off the clock.

**Website:** https://tannmay-python.github.io/

## Structure

- `index.html` — the whole portfolio on one page. It opens with a snapshot (introduction, the India Critical Minerals dashboard and highlights from each section), then tools, writing, research, podcasts, off the clock and contact. A header menu links to every section and stays visible while scrolling.
- `writing.html`, `research.html`, `tools.html`, `podcasts.html`, `off-the-clock.html` — forward to the matching homepage section, so older links keep working
- `assets/site.css`, `assets/site.js` — styles, the theme lamp and the “show all” lists
- `assets/fonts.css`, `assets/fonts/` — Hedvig Letters Serif and Sans, hosted locally with their licences
- `assets/` — screenshots and photographs

The site is static HTML and CSS with one small vanilla JavaScript file. Without JavaScript every entry is still listed. It has no framework or build dependencies, analytics or trackers. New visitors start in light mode. The lamp button lets them choose dark mode and remembers their explicit choice; the theme is the only value saved in local storage.

The writing list shows five selected op-eds and the podcast list the latest five until a reader asks for all. To change the selection, add or remove `class="extra"` on the list items in `index.html`.

## Local preview

Run `python3 -m http.server 8777 --bind 127.0.0.1` from this folder, then open http://127.0.0.1:8777/.

## Deployment

The `Deploy portfolio to GitHub Pages` Actions workflow runs after a push to `main` or a manual dispatch. GitHub Pages must use **GitHub Actions** as its publishing source. The workflow packages only the six public HTML pages, assets, robots.txt, sitemap.xml and .nojekyll into its Pages artifact, then deploys it. Local review records and content inventories are ignored by Git and excluded from the artifact.

Bracketed placeholders such as [Title] mark material still to be supplied: the reading list, astrophotographs and photographs of the coin collection. Byline order and collaborator credits accompany the work. The unpublished technology-law atlas is not included.
