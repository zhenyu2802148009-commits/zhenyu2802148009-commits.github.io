# LUO Zhenyu — personal page

Minimal personal introduction page for CSI205TC Question 2 (GitHub Pages measurement target).

**Live URL:** https://zhenyu2802148009-commits.github.io/

## Design notes

- Single page: About / Skills / Projects / Contact
- Zero third-party requests (no CDN fonts, analytics, or external scripts)
- Vanilla HTML / CSS / JS only
- Dark theme default; light theme via toggle / `prefers-color-scheme`
- Custom `404.html`; `.nojekyll` so Pages serves files verbatim

## Local preview

```bash
python3 -m http.server 8123 --directory . --bind 127.0.0.1
# open http://127.0.0.1:8123/
```

## Deploy

From the parent `Q2_github_pages/` directory:

```bash
./scripts/deploy.sh
./scripts/verify_pages.sh
```

Token hygiene: see `scripts/deploy.sh` header comments.
