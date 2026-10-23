# Proposal

## Why

A security review of the forked Latte theme (v2.1.1) found no critical vulnerabilities, but several hardening gaps: a no-op Customizer sanitizer, loosely validated colour settings written into inline CSS, unescaped output that relies solely on save-time filtering, missing `rel="noopener"` on external links, and a bundled Bootstrap 3.3.4 with known XSS CVEs. The theme runs on a live personal site, so these should be closed before they combine with a plugin or a future edit to become exploitable.

## What Changes

- Make `latte_sanitize_text()` actually sanitize, and use `absint` for numeric settings (`latte_blogposts_items`).
- Add a colour sanitizer (hex / `rgb()` / `rgba()` only) for all `*_background_color` settings and use it on output in the inline CSS.
- Escape every remaining theme_mod echo (`sections/social.php`, search form, widget wrappers where applicable).
- Add `rel="noopener noreferrer"` to every `target="_blank"` link and switch hard-coded `http://` and protocol-relative URLs to `https://`.
- Replace `.html(newval)` in the Customizer live preview with a safe alternative.
- Remove the redundant `wp-load.php` / `admin.php` / `admin-header.php` requires from the welcome screen.
- Add `defined( 'ABSPATH' ) || exit;` guards to PHP files under `inc/`, `sections/` and `widgets/`.
- Upgrade bundled Bootstrap from 3.3.4 to 3.4.1 (patched final 3.x release).
- Fix the malformed `imagesloaded` enqueue in `functions.php`.

Out of scope: migrating to Bootstrap 5, replacing the abandoned jQuery plugins, self-hosting Google Fonts, removing the upstream footer credit. These are noted as follow-ups.

## Capabilities

### New Capabilities
- `customizer-input-sanitization`: every Customizer setting is validated and sanitized on save with a callback appropriate to its type.
- `front-end-output-escaping`: all dynamic values rendered in templates are escaped for their output context, and external links are rel-protected.
- `theme-file-hardening`: theme PHP files refuse direct access and admin screens do not re-bootstrap WordPress.

### Modified Capabilities

None. `openspec/specs/` is empty; these are the first specs.

## Impact

- Code: `functions.php`, `inc/customizer/customizer.php`, `inc/customizer/custom-css.php`, `inc/customizer/customizer-preview.js`, `inc/admin/welcome-screen/welcome-screen.php`, `inc/widgets/*.php`, `inc/other/*.php`, `sections/*.php`, `searchform.php`, `footer.php`.
- Dependencies: `assets/bootstrap/` (CSS, JS, theme CSS) replaced by 3.4.1.
- Behaviour: no visual change expected; previously saved invalid colour values would fall back to defaults. The Bootstrap bump needs a visual check of the home template and blog layouts.
- Assumption: Bootstrap stays on 3.x for now (user did not confirm scope for the upgrade; the 3.4.1 patch is the lowest-risk option).
