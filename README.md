# zhenyu2802148009-commits.github.io

Live site: **<https://zhenyu2802148009-commits.github.io/>**

Personal homepage of LUO Zhenyu (Computer Science, Xi'an Jiaotong-Liverpool
University), hand-built for CSI205TC *Networking and Distributed Computing*
coursework and kept as a real personal page afterwards.

## Design decisions

- **Zero third-party requests.** No web fonts, no CDN scripts, no analytics, no
  external images. Every asset (`css/style.css`, `js/main.js`,
  `assets/profile.svg`, inline SVG favicon) is served from this repository, so
  the page loads over a single clean DNS → TCP → TLS → HTTP/2 conversation —
  which is exactly what the accompanying network-analysis write-up captures.
- **Semantic, accessible HTML.** Landmark elements (`header/nav/main/section/footer`),
  skip link, `aria` labelling on the hamburger menu and theme button,
  `prefers-color-scheme` + `prefers-reduced-motion` support.
- **Responsive layout.** CSS Grid/Flex with a mobile navigation breakpoint at
  `≤ 768px`; desktop and mobile renders are both verified.
- **Dark/light theme.** CSS custom properties drive both palettes; the choice
  is persisted in `localStorage` and the button toggles instantly.
- **Progressive enhancement.** The page is fully readable with JavaScript
  disabled; JS only adds the theme toggle, mobile menu, back-to-top button and
  scroll-reveal animations.
- **Custom 404 page** (`404.html`) for completeness.

## Repository layout

```
├── index.html          # single-page site (hero + About / Skills / Projects / Contact)
├── 404.html            # custom not-found page
├── css/style.css       # themes, layout, responsive rules, print styles
├── js/main.js          # theme toggle, hamburger menu, reveals (vanilla JS)
├── assets/profile.svg  # self-drawn SVG illustration
├── .nojekyll           # serve files verbatim, skip Jekyll processing
└── README.md           # this file
```

## Local preview

```bash
cd site
python3 -m http.server 8000
# open http://127.0.0.1:8000/
```

## Deployment (GitHub Pages, user site)

The user-site repository `zhenyu2802148009-commits.github.io` is served from
the `main` branch root. To publish changes:

```bash
git add -A
git commit -m "Update homepage"
git push origin main      # SSH remote: git@github.com:zhenyu2802148009-commits/zhenyu2802148009-commits.github.io.git
```

Pages is enabled on `branch=main, path=/`; builds appear under
*Settings → Pages* on GitHub and at
`https://api.github.com/repos/zhenyu2802148009-commits/zhenyu2802148009-commits.github.io/pages/builds/latest`.

## AI-assistance disclosure

Per the module's AI policy (substantive use permitted), HTML/CSS/JS scaffolding
was drafted with AI assistance and then reviewed, corrected and tested by the
author, who also performed the deployment and all network measurements.
