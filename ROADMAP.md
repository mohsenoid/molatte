# Security Roadmap

Remaining low-severity items after the 3.0 hardening release. Ordered by value for effort; each phase can ship on its own.

## Phase 1: Quick wins (3.0.1, under an hour)

| Item | Change | Verify |
|------|--------|--------|
| Category sanitizer | Use `absint` for `latte_blogposts_category` instead of `sanitize_text_field` | Saving `abc` stores `0`; blog section still lists the chosen category |
| `.gitignore` | Add `.DS_Store`, editor and OS files | `git status` stays clean after browsing the folder in Finder |
| Root template guards | Add `defined( 'ABSPATH' ) \|\| exit;` to root templates and `functions.php` | `php -l` passes; every page type still loads |

## Phase 2: Privacy (3.1)

| Item | Change | Verify |
|------|--------|--------|
| Self-host Google Fonts | Download Lora, Open Sans, Sanchez and Lato (woff2) into `assets/fonts/`, add `@font-face`, remove the `fonts.googleapis.com` enqueues in `functions.php` | Network tab shows no request to `googleapis.com` or `gstatic.com`; typography unchanged |
| Preview `.html()` | Run the About field through a small tag allow-list in the preview script, or render it server-side via selective refresh | Typing `<script>` in the About field runs nothing in the preview |

Note: check each font's licence (OFL / Apache) before bundling, and add the licence files.

## Phase 3: Dependency upkeep (3.2)

| Item | Change | Verify |
|------|--------|--------|
| `parallax.js` 1.3.1 | Upgrade to the latest 1.x from pixelcog, or replace with CSS `background-attachment: fixed` plus a small script | Parallax sections on the home template behave the same, including on mobile |
| `jquery.matchHeight` 0.5.1 | Upgrade to 0.7.2 (API-compatible) | Service and blog boxes keep equal heights |
| `scrollReveal` | Upgrade to the latest 2.x or replace with `IntersectionObserver` | Sections animate in once; disabling animations in the Customizer still works |
| Version check | Add a short "bundled libraries" table to the readme with name, version and source | Table matches the file headers |

## Phase 4: Strategic (4.0, optional)

| Item | Change | Notes |
|------|--------|-------|
| Bootstrap 5 migration | Replace Bootstrap 3 markup and classes, drop the jQuery dependency where possible | Largest effort: a markup rewrite across every template, the Customizer sections and the widgets. Do it only if the site needs to outlive Bootstrap 3 or you want to drop jQuery. Bootstrap 3 has no maintained fixes. |

## Ongoing

- Check WordPress core, plugins and PHP version for the live site (outside this theme).
- Re-run the review greps before each release: unescaped `echo`, `target="_blank"` without `rel`, `extract(`, missing `ABSPATH` guards.
- Revisit this list when a CVE is published for a bundled library.

## Suggested order

```
3.0.1  Phase 1  (quick wins)
3.1    Phase 2  (privacy: fonts, preview)
3.2    Phase 3  (library upgrades)
4.0    Phase 4  (Bootstrap 5, only if wanted)
```
