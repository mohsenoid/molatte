# Design

## Context

Libraries are vendored files in `assets/js/`, enqueued from `functions.php` and driven by `assets/js/scripts.js` with options passed in `latte_script_var`. Current usage observed in the code:

- scrollReveal 2.x: `new scrollReveal()` once on window load; 18 `data-sr` attributes across `sections/*.php` (`ease-in-out wait 0.25s`, `enter left|right|top wait 0.25s`).
- parallax.js 1.3.1: `$('.site-wrapper').parallax({imageSrc, bleed:'10', androidFix:'false'})` on non-home pages.
- matchHeight 0.5.1: `.matchHeight(byRow)` with a boolean on `.service-box` and `.blog-item`.
- classie.js: `has/add/remove/toggle` calls in the menu handlers only.

See proposal.md for motivation. There is no JS test setup; verification is manual in a browser plus grep checks.

## Goals / Non-Goals

**Goals:** drop unmaintained dependencies where cheap, upgrade the rest to their latest releases, keep visual behaviour and Customizer options.

**Non-Goals:** removing jQuery (WordPress core ships it), redesigning animations, touching markup or Customizer settings.

## Decisions

**D1. Replace scrollReveal with a ~40-line IntersectionObserver script.**
The theme uses only a small subset (direction, easing, delay). scrollReveal 4 changes to a JS-config API, so upgrading would mean rewriting the 18 attributes anyway, and it is itself barely maintained. A native script parses the existing `data-sr` strings, so no markup changes. Initial hidden state is applied by the script (adding a class), not by CSS alone, so content stays visible if JS fails. Alternative: CSS scroll-driven animations; rejected, browser support is still uneven.

**D2. Honour `prefers-reduced-motion` and the existing disable option.**
The script returns early (leaving elements visible) when either applies.

**D3. Replace classie with `classList`.**
Direct 1:1 mapping (`has`→`contains`, `add`, `remove`, `toggle`); `classList` is supported by every browser WordPress supports. Removes a file and an enqueue.

**D4. Upgrade parallax.js to 1.5.0 and matchHeight to 0.7.2, keep call sites.**
Both are the latest releases and API-compatible for how the theme uses them. matchHeight 0.7 still accepts a boolean argument for `byRow`; this must be confirmed in the browser, and if it is not honoured the call changes to `matchHeight({ byRow: byRow })`. Alternative: replace with CSS flex/grid equal heights; rejected for now, since it would touch the markup/CSS layout of the services and blog grids.

**D5. Downloads from official sources only.**
parallax.js from the pixelcog/parallax.js release, matchHeight from the liabru/jquery-match-height release. Each download needs explicit approval at apply time.

## Risks / Trade-offs

- [Reveal animation looks different from scrollReveal] → Keep the same distance, duration and easing values, then compare on staging; adjust the CSS if needed.
- [matchHeight 0.7 handles byRow or timing differently] → Check the services and blog grids at desktop and mobile widths; fall back to the options-object form.
- [Elements hidden if the script errors after adding the hidden class] → Add the hidden class only inside the same script that observes, and wrap start-up so a failure reveals everything.
- [Custom script becomes new code to maintain] → Kept small and in one file; far less surface than a vendored library.

## Migration Plan

1. Implement on a branch and test on staging, covering the home page, blog, a single post and a mobile viewport.
2. Deploy theme files together; no database changes.
3. Rollback: redeploy the previous commit.
