# Tannmay Kumarr Baid

A personal portfolio of writing, research, interactive tools, podcasts and astronomy.

**Website:** https://tannmay-python.github.io/

## Structure

- `index.html` — introduction and links to explore the work
- `writing.html` — published op-eds, dates and bylines
- `research.html` — discussion documents and teaching
- `tools.html` — real screenshots, project links and collaborator credits
- `podcasts.html` — All Things Policy
- `off-the-clock.html` — astronomy
- `assets/` — styles, locally hosted fonts, scripts and images

The site is static HTML and CSS with a small vanilla JavaScript theme control. It has no framework or build dependencies, analytics or trackers. Fonts are hosted locally with their licences. Light and dark mode follow the visitor’s system preference unless they choose a theme; the theme is the only value saved in local storage.

## Local preview

Run `python3 -m http.server 8777 --bind 127.0.0.1` from this folder, then open http://127.0.0.1:8777/.

## Deployment

The `Deploy portfolio to GitHub Pages` Actions workflow runs after a push to `main` or a manual dispatch. GitHub Pages must use **GitHub Actions** as its publishing source. The workflow packages only the six public HTML pages, assets, robots.txt, sitemap.xml and .nojekyll into its Pages artifact, then deploys it. Local review records and content inventories are ignored by Git and excluded from the artifact.

Visible TODO labels identify material or metadata still to be supplied or confirmed. Byline order and collaborator credits accompany the work. The unpublished technology-law atlas is not included.
