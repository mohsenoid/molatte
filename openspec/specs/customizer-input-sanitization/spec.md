# customizer-input-sanitization Specification

## Purpose

Ensures every value saved through the theme's Customizer settings is validated and sanitized for its data type before it is stored, so that stored settings are safe to render regardless of how they were written.

## Requirements

### Requirement: Every setting has a type-appropriate sanitizer
The theme SHALL register a sanitization callback for every Customizer setting that actually transforms or validates the value. A callback that returns its input unchanged SHALL NOT be used.

#### Scenario: Plain text setting stores markup
- **WHEN** an administrator saves `<script>alert(1)</script>Hello` into a plain-text setting
- **THEN** the stored value contains no HTML tags

#### Scenario: Rich text setting keeps allowed markup only
- **WHEN** an administrator saves content containing `<strong>` and `<script>` into a rich-text setting
- **THEN** the stored value keeps `<strong>` and removes `<script>`

### Requirement: Numeric settings store non-negative integers
Settings that represent a count SHALL store a non-negative integer, and SHALL fall back to the setting's default when the input is not numeric.

#### Scenario: Non-numeric post count
- **WHEN** the blog posts item count is saved as `abc`
- **THEN** the stored value is a non-negative integer, not the string `abc`

#### Scenario: Negative post count
- **WHEN** the blog posts item count is saved as `-5`
- **THEN** the stored value is `5` or the default, never a negative number

### Requirement: Colour settings accept only valid colour values
Background colour settings SHALL accept only hexadecimal colours (3, 6 or 8 digits), `rgb()` and `rgba()` values with numeric components. Any other input SHALL be replaced with the setting's default.

#### Scenario: Valid rgba colour
- **WHEN** a colour setting is saved as `rgba(0, 0, 0, 0.7)`
- **THEN** the value is stored unchanged

#### Scenario: CSS injection attempt
- **WHEN** a colour setting is saved as `red;} body{display:none} /*`
- **THEN** the stored value is the setting's default

### Requirement: URL settings are stored as valid URLs
Settings holding links or image addresses SHALL be stored as URLs with an allowed protocol, and values with other protocols such as `javascript:` SHALL be discarded.

#### Scenario: javascript URL
- **WHEN** a social link is saved as `javascript:alert(1)`
- **THEN** the stored value is empty
