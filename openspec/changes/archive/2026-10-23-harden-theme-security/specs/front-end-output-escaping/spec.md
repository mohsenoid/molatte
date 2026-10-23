# Spec Delta

## Purpose

Guarantees that every dynamic value the theme renders is escaped for its output context and that external links cannot give the destination page control over the opener window.

## ADDED Requirements

### Requirement: Dynamic values are escaped at output
The theme SHALL escape every dynamic value for its context (HTML text, attribute, URL, or CSS) at the point of output, independent of any sanitization applied when the value was saved.

#### Scenario: Stored setting contains markup
- **WHEN** a theme setting already holds `<img src=x onerror=alert(1)>` in the database
- **THEN** the page renders it as inert text and no script executes

#### Scenario: Search query contains markup
- **WHEN** a visitor searches for `"><script>alert(1)</script>`
- **THEN** the search heading and search form field show the text escaped and no script executes

### Requirement: Inline CSS values are validated before output
Values written into inline `<style>` blocks SHALL be validated as CSS-safe tokens at output time, and any value that fails validation SHALL be omitted.

#### Scenario: Corrupt colour in database
- **WHEN** a background colour setting holds a value that is not a valid colour
- **THEN** the corresponding CSS rule is not emitted

### Requirement: External links are protected from the opener
Every link that opens in a new browsing context SHALL carry `rel="noopener noreferrer"`.

#### Scenario: Social link
- **WHEN** a social icon link is rendered with `target="_blank"`
- **THEN** its `rel` attribute contains `noopener` and `noreferrer`

#### Scenario: Widget link in new window
- **WHEN** a service widget is configured to open its link in a new window
- **THEN** the rendered anchor includes `rel="noopener noreferrer"`

### Requirement: External resources use HTTPS
The theme SHALL reference external links and resources over `https://` and SHALL NOT use `http://` or protocol-relative URLs.

#### Scenario: Page source
- **WHEN** the home page is rendered
- **THEN** no theme-generated link or resource URL begins with `http://` or `//`

### Requirement: Customizer live preview does not inject markup
The Customizer live preview SHALL insert user-entered values as text, or sanitized markup where rich text is intended, and SHALL NOT assign raw input as HTML.

#### Scenario: Preview of rich text field
- **WHEN** an administrator types `<script>alert(1)</script>` into the About content field with live preview open
- **THEN** no script executes in the preview frame
