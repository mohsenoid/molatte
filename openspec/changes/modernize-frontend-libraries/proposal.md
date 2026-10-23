# Proposal

## Why

The theme bundles several front-end libraries from 2014-2015 that are no longer maintained: scrollReveal 2.x, parallax.js 1.3.1, jquery.matchHeight 0.5.1 and classie.js. Nobody will patch a future vulnerability in them, and they are the main remaining item from the security review. Bootstrap was already moved to its final patched 3.4.1 release, so these are what is left.

## What Changes

- Update `parallax.js` from 1.3.1 to its latest release (1.5.0) and `jquery.matchHeight` from 0.5.1 to its latest (0.7.2), keeping the current call sites working.
- Remove `classie.js` and rewrite its few uses in `assets/js/scripts.js` with the browser's native `classList`.
- Remove `scrollReveal` and replace it with a small in-theme script based on `IntersectionObserver` that honours the existing `data-sr` attributes (`enter left|right|top`, `ease-in-out`, `wait 0.25s`) and the "disable animations" Customizer option.
- Respect `prefers-reduced-motion` for the reveal animation.
- Update the library credits in `readme.txt` / `README.md` to match what ships.

Out of scope: Bootstrap 5 migration, replacing parallax with a CSS-only approach, self-hosting Google Fonts, changing any markup or Customizer options.

## Capabilities

### New Capabilities
- `front-end-libraries`: which third-party scripts the theme ships and how its scroll-reveal, menu and layout-matching behaviour must keep working without unmaintained dependencies.

### Modified Capabilities

None. `theme-file-hardening` (Bootstrap version, enqueue correctness) is unaffected.

## Impact

- Code: `functions.php` (enqueues), `assets/js/scripts.js`, `assets/js/` (remove `classie.js`, `scrollReveal.min.js`; replace `parallax.min.js`, `jquery.matchHeight.js`; add a small reveal script), possibly `style.css` (reveal initial/animated states), `readme.txt`, `README.md`.
- Dependencies: two downloaded library updates (parallax.js 1.5.0, matchHeight 0.7.2); two libraries removed.
- Behaviour: animations should look the same or very close; this needs a visual check on the home template, blog pages and the mobile menu.
- Assumptions: replacing scrollReveal with native code is preferred over upgrading to scrollReveal 4 (a rewrite of its API anyway, and also unmaintained). The two remaining libraries are upgraded rather than replaced because their API stays compatible.
