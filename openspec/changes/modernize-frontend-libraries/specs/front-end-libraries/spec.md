# Spec Delta

## Purpose

Keeps the theme's front-end behaviour (scroll animations, menu, parallax and equal-height layout) working on maintained, current dependencies so that the theme does not ship abandoned third-party code.

## ADDED Requirements

### Requirement: Bundled third-party scripts are current releases
The theme SHALL bundle parallax.js 1.5.0 or later and jquery.matchHeight 0.7.2 or later, and SHALL NOT bundle scrollReveal or classie.js.

#### Scenario: Script headers
- **WHEN** the bundled `parallax.min.js` and `jquery.matchHeight.js` headers are read
- **THEN** they report parallax.js 1.5.0+ and matchHeight 0.7.2+

#### Scenario: Removed libraries
- **WHEN** the theme's `assets/js/` directory is listed
- **THEN** it contains no scrollReveal or classie files and no PHP file enqueues them

### Requirement: Scroll-reveal animations work without a library
Elements carrying a `data-sr` attribute SHALL animate into view when they enter the viewport, using the attribute's direction (`enter left`, `enter right`, `enter top`) and delay, and SHALL appear immediately without animation when the animations option is disabled or the visitor prefers reduced motion.

#### Scenario: Element scrolls into view
- **WHEN** a visitor scrolls an element with `data-sr="enter left wait 0.25s"` into the viewport
- **THEN** it animates in from the left after about 0.25 seconds and ends fully visible

#### Scenario: Animations disabled in Customizer
- **WHEN** the "disable animations" option is on
- **THEN** all `data-sr` elements are visible on load with no animation

#### Scenario: Reduced motion
- **WHEN** the visitor's system prefers reduced motion
- **THEN** `data-sr` elements are shown without animation

#### Scenario: No script support
- **WHEN** JavaScript fails to load
- **THEN** `data-sr` elements are still visible

### Requirement: Slide-in menu behaves as before
The off-canvas menu toggle SHALL open and close the menu, switch the toggle icon between bars and close states, and shift the page content, with no dependency on classie.js.

#### Scenario: Open and close
- **WHEN** a visitor taps the menu button, then the close button
- **THEN** the menu opens and the icon changes to a close icon, then the menu closes and the icon returns to bars

### Requirement: Parallax and equal-height layouts are unchanged
The home page parallax background, equal-height service boxes and equal-height blog items SHALL render and align as they did before the library updates.

#### Scenario: Service boxes
- **WHEN** the home page renders services of different text lengths
- **THEN** boxes in the same row have equal height

#### Scenario: Parallax background
- **WHEN** a parallax background image is configured and the visitor scrolls
- **THEN** the background moves at a different rate than the content

### Requirement: Library credits match shipped code
The readme library credits SHALL list every third-party script the theme ships, with its version, and SHALL NOT list libraries that were removed.

#### Scenario: Credits after update
- **WHEN** `readme.txt` is read
- **THEN** it lists parallax.js and jquery.matchHeight at their new versions and no longer lists scrollReveal or classie.js

### Requirement: Asset URLs change with each theme release
The theme SHALL version its enqueued scripts and stylesheets with the theme's own version, so that browsers and caches fetch updated files after a release instead of reusing stale copies.

#### Scenario: Release bumps the theme version
- **WHEN** the theme version in `style.css` changes and a visitor with cached assets loads the site
- **THEN** the page requests the theme's scripts and styles with a new `ver` value and receives the updated files

#### Scenario: Scripts stay consistent
- **WHEN** a returning visitor loads the home page after an update
- **THEN** `scripts.js`, `parallax.min.js` and `reveal.js` all come from the same release

