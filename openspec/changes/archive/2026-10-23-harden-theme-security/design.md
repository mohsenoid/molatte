# Design

## Context

Latte 2.1.1 is a classic PHP theme with no build step, no test suite and no Composer/npm manifest. All user-controlled data enters through the Customizer (`theme_mods`) and widget instances, both of which WordPress already protects with nonces and capability checks. Findings and rationale are in proposal.md. Constraints:

- The site is live, so there must be no visual regression.
- Libraries are vendored files in `assets/`, replaced by copying files.
- Verification is `php -l`, grep-based checks and manual checks in a local WordPress; there is no automated suite to extend.

## Goals / Non-Goals

**Goals:**
- Close the gaps listed in the proposal with small, reviewable edits.
- Defence in depth: sanitize on save and escape on output.

**Non-Goals:**
- Bootstrap 5 migration, replacing abandoned jQuery plugins, self-hosting fonts, adding a test framework or build tooling, removing the upstream footer credit.

## Decisions

**D1. Dedicated colour sanitizer instead of `sanitize_hex_color`.**
The alpha-colour control stores `rgba(...)` values, which `sanitize_hex_color` rejects. A small function accepts `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb(...)` and `rgba(...)` via a strict regex and returns the setting default otherwise. Alternative: validate only in the control JS; rejected because it can be bypassed. The same validator is reused at output time in `custom-css.php` (replacing `esc_html`, which is wrong for CSS context).

**D2. Fix `latte_sanitize_text` in place rather than swapping every call site.**
Make it call `sanitize_text_field`. The four affected settings keep their callback name, so the change is one function. `latte_blogposts_items` gets `absint` instead, as it is numeric. Alternative: remove the helper; rejected as larger churn for no gain.

**D3. Escape at output even where save-time sanitization exists.**
`sections/social.php` gets `esc_html()` to match the pattern already used in `subscribe.php` and `blogposts.php`. Search heading and form value get `esc_html`/`esc_attr`. Widget `$before_widget`/`$after_widget` stay unescaped because they are core-provided markup; `extract()` is replaced with direct `$args[...]` reads in the two widgets.

**D4. Live preview uses `.text()` for plain fields and a kept `.html()` only for the rich About field.**
The About content setting is `wp_kses_post`-sanitized on save, and the preview is shown only to a logged-in administrator, so the remaining `.html()` call is acceptable. It will be commented to explain why. Alternative: run a JS sanitizer; rejected as overkill.

**D5. Bootstrap 3.4.1 drop-in.**
It is the final patched 3.x release and API-compatible with 3.3.4, so no markup changes. Replace `bootstrap.css`, `.min.css`, theme CSS, `bootstrap.js`, `.min.js` and the glyphicon fonts together. Alternative: Bootstrap 5; rejected here (markup rewrite, jQuery removal) and recorded as a follow-up.

**D6. `ABSPATH` guard on non-template files only.**
Guard files in `inc/`, `sections/` and widgets. Root templates (`page.php`, etc.) are only loaded by WordPress and are left as they are to keep the diff small, though guarding them would be harmless. `functions.php` is also skipped.

**D7. Welcome screen: delete the three requires, keep the page.**
The callback already runs inside `admin.php`, so they are redundant. The page stays, since removing it is a product decision, not a security fix.

**D8. `rel` attributes and HTTPS by direct edit.**
Plain find-and-edit across `sections/social.php`, `footer.php`, the welcome content and the services widget. Fonts remain on Google but switch to `https:`.

## Risks / Trade-offs

- [Colour sanitizer rejects a previously saved but unusual valid value, e.g. `hsl()` or a named colour] → Check the currently saved values on the live site before deploying; the control only produces hex/rgba so this is unlikely. Default colours apply on failure.
- [Bootstrap 3.4.1 introduces a subtle layout shift] → Visually compare the home template, blog, single post and archive on staging before release.
- [Adding `exit` guards breaks a file that is legitimately included early] → `ABSPATH` is defined before themes load, so guarded includes are unaffected; confirm via loading every page type.
- [`.html()` retained in preview] → Documented in D4; revisit if more editors are added to the site.

## Migration Plan

1. Implement on a branch and test locally or on staging.
2. Deploy theme files in one go. No database migration is needed, and theme_mods are not rewritten.
3. Rollback: redeploy the previous commit. Saved settings are unaffected either way.
