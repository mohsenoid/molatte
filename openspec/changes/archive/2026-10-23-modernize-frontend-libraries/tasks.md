# Tasks

## 1. Remove classie.js

- [x] 1.1 Rewrite the menu handlers in `assets/js/scripts.js` with `classList` and remove the `latte_classie` enqueue in `functions.php` and `assets/js/classie.js`; verify `grep -rn classie . --include='*.php' --include='*.js'` returns nothing and the mobile menu opens, closes and swaps its icon on staging

## 2. Replace scrollReveal

- [x] 2.1 Add `assets/js/reveal.js` (IntersectionObserver) that parses the existing `data-sr` values (direction, `wait` delay), skips itself when animations are disabled or reduced motion is preferred, and reveals everything if it errors; verify with the four existing `data-sr` variants on staging
- [x] 2.2 Match scrollReveal's defaults in `reveal.js` (8px move, 5% scale-up, 0.6s, `ease`/`ease-in-out`, reveals at 60% visible, disabled on phones and tablets as before); no `style.css` change is needed because the hidden state is applied by the script, so content stays visible without JS; verify side by side with the live site that the animation looks equivalent
- [x] 2.3 Replace `new scrollReveal()` in `assets/js/scripts.js` and the `scrollReveal.min.js` enqueue in `functions.php` with the new script (still gated by the animations option) and delete `assets/js/scrollReveal.min.js`; verify turning the Customizer "disable animations" option on shows all sections instantly and no console errors appear

## 3. Update parallax.js and matchHeight

- [x] 3.1 Download parallax.js 1.5.0 and jquery.matchHeight 0.7.2 from their official releases (ask for approval first), replace `assets/js/parallax.min.js` and `assets/js/jquery.matchHeight.js`; verify the file headers show the new versions
- [x] 3.2 Check the `.matchHeight(byRow)` calls against 0.7.2 and change them to `matchHeight({ byRow: byRow })` only if the boolean is not honoured; verify services and blog items align at desktop and mobile widths
- [x] 3.3 Verify the parallax background still works on a non-home page with a background image configured, with no console errors

## 4. Documentation and final checks

- [x] 4.1 Update the Libraries section of `readme.txt` and `README.md` (same text in both) to list the new versions and drop scrollReveal and classie.js; verify `diff README.md readme.txt` is empty and neither mentions the removed libraries
- [x] 4.2 Run `php -l` on `functions.php`, load the home page, a blog page, a single post and a mobile viewport on staging with `WP_DEBUG` on; verify there are no PHP notices or browser console errors and animations, menu, parallax and grids behave as before

- [x] 4.3 Version every enqueued theme script and stylesheet in `functions.php` with the theme version (a returning visitor had a stale cached `parallax.min.js` 1.3.1 and `scripts.js` against the new HTML, which hid the parallax background until scroll); verified in Chrome that fresh files render the background at load with the library measuring the window

## Workflow follow-up

- Archive the change after verification on the live site.
