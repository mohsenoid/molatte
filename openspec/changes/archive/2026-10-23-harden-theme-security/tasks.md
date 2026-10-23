# Tasks

## 1. Customizer input sanitization

- [x] 1.1 Make `latte_sanitize_text()` in `inc/customizer/customizer.php` call `sanitize_text_field`; verify `php -l` passes and saving `<script>x</script>Hi` in the Customizer stores `Hi`
- [x] 1.2 Use `absint` (falling back to the default of 6) for `latte_blogposts_items`; verify saving `abc` and `-5` yields a non-negative integer
- [x] 1.3 Add `latte_sanitize_color()` accepting hex, `rgb()`, `rgba()` only (default on failure) and assign it to all seven `*_background_color` settings; verify `rgba(0, 0, 0, 0.7)` is kept and `red;} body{display:none} /*` falls back to the default
- [x] 1.4 Confirm every `esc_url_raw` URL setting rejects `javascript:` input; verify by saving one in the Customizer and checking the stored value is empty

## 2. Output escaping and link safety

- [x] 2.1 Wrap the social section title and the five social item titles in `esc_html()` in `sections/social.php`; verify a grep for unescaped `echo $latte_social` returns nothing
- [x] 2.2 Escape the search heading and form value (`esc_html`/`esc_attr`) in `search.php` and `searchform.php`, and `esc_url` on `home_url()`; verify searching for `"><script>alert(1)</script>` renders inert text
- [x] 2.3 Validate colours with `latte_sanitize_color()` at output in `inc/customizer/custom-css.php` instead of `esc_html`; verify the page source shows valid CSS and a corrupted stored value emits no rule
- [x] 2.4 Add `rel="noopener noreferrer"` to every `target="_blank"` in `sections/social.php`, `footer.php`, `inc/admin/welcome-screen/content/content.php` and `inc/widgets/latte-services.php`; verify `grep -rn '_blank' . | grep -v noopener` returns nothing
- [x] 2.5 Replace `http://` and `//fonts.googleapis.com` URLs with `https://` in `functions.php`, `header.php`, `footer.php` and the welcome content; verify the rendered home page source has no `http://` or `//` theme URLs
- [x] 2.6 Replace `extract( $args )` in `inc/widgets/latte-services.php` and `latte-skills.php` with explicit `$args[...]` reads; verify both widgets still render in a sidebar
- [x] 2.7 Change the plain-text `.html(newval)` calls in `inc/customizer/customizer-preview.js` to `.text(newval)` and comment why the About content field keeps `.html()`; verify the live preview shows entered `<b>` as text and no script runs

## 3. File and admin hardening

- [x] 3.1 Add `defined( 'ABSPATH' ) || exit;` to every PHP file in `inc/` and `sections/`; verify `curl` against a few of them on a local server returns an empty body and the site still loads on every page type
- [x] 3.2 Remove the `wp-load.php`, `admin.php` and `admin-header.php` requires from `latte_welcome_screen()`; verify Appearance > Latte still renders
- [x] 3.3 Fix the `imagesloaded` enqueue in `functions.php` (use the registered handle, correct arguments); verify the home template loads with no PHP notices in `debug.log`

## 4. Bundled library upgrade

- [x] 4.1 Replace the Bootstrap 3.3.4 CSS, JS and fonts under `assets/bootstrap/` with the 3.4.1 release; verify the file headers read 3.4.1 and no references to removed files remain
- [x] 4.2 Visually compare the home template, blog index, single post, archive and search on staging before and after; verify there are no layout differences and no console errors

## 5. Integration check

- [x] 5.1 Run `php -l` on every changed PHP file and load each page type with `WP_DEBUG` on; verify there are no notices, warnings or fatal errors
- [x] 5.2 Re-run the security greps from the review (`target="_blank"` without noopener, unescaped `echo $latte_`, `extract(`, missing `ABSPATH` guards); verify each returns zero hits

## Workflow follow-up

- Archive the change after review and deployment to the live site.
- Follow-ups noted, not in scope: Bootstrap 5 migration, replacing old jQuery plugins, self-hosting Google Fonts, removing the upstream footer credit.
