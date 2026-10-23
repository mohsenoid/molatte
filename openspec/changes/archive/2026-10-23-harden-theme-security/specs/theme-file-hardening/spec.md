# Spec Delta

## Purpose

Limits the theme's attack surface by refusing direct execution of its PHP files, avoiding unnecessary WordPress re-bootstrapping in admin screens, and shipping patched front-end libraries.

## ADDED Requirements

### Requirement: PHP files refuse direct access
Every PHP file in the theme that is not a template loaded by WordPress core SHALL terminate immediately when requested directly rather than through WordPress.

#### Scenario: Direct request to an include file
- **WHEN** a client requests `/wp-content/themes/<theme>/inc/customizer/custom-css.php` directly
- **THEN** the response body is empty and no PHP notices or paths are disclosed

### Requirement: Admin screens rely on the existing WordPress context
Theme admin pages SHALL NOT re-include `wp-load.php`, `wp-admin/admin.php` or `wp-admin/admin-header.php` from within their render callbacks.

#### Scenario: Welcome screen renders
- **WHEN** an administrator opens Appearance > Latte
- **THEN** the page renders correctly and the callback performs no core bootstrap includes

### Requirement: Admin screens enforce capability checks
Theme admin pages SHALL be registered with the minimum capability required to use them, and SHALL NOT be reachable by users lacking it.

#### Scenario: Editor opens welcome page
- **WHEN** a user without `activate_plugins` requests `themes.php?page=latte-welcome`
- **THEN** WordPress denies access

### Requirement: Bundled Bootstrap is the patched 3.x release
The theme SHALL bundle Bootstrap 3.4.1 or later within the 3.x line, with CSS, JS and fonts from the same release.

#### Scenario: Version banner
- **WHEN** the bundled `bootstrap.min.js` and `bootstrap.min.css` headers are read
- **THEN** both report version 3.4.1 or later

### Requirement: Script enqueues are well-formed
Every script and style the theme enqueues SHALL use valid handle, source, dependency and version arguments, and SHALL load only where it is used.

#### Scenario: Home template scripts
- **WHEN** the home page template renders
- **THEN** `imagesloaded` is enqueued by its registered handle with no malformed arguments
