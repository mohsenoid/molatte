# Spec Delta

## Purpose

Defines the credit line shown in the site footer so that it names the theme variant actually in use and links to its own repository.

## ADDED Requirements

### Requirement: Footer signature names the fork
The footer SHALL display the signature text "MoLatte", followed by the line "Proudly powered by WordPress".

#### Scenario: Footer on any page
- **WHEN** any front-end page is rendered
- **THEN** the footer shows "MoLatte" above "Proudly powered by WordPress" and does not show the word "Latte" on its own as the signature

### Requirement: Footer signature links to the fork repository
The footer signature SHALL link to `https://github.com/mohsenoid/molatte` and SHALL NOT link to the original author's website.

#### Scenario: Signature link target
- **WHEN** a visitor inspects the footer signature link
- **THEN** its `href` is `https://github.com/mohsenoid/molatte`

#### Scenario: New-window link is protected
- **WHEN** the signature link opens in a new tab
- **THEN** its `rel` attribute contains `noopener` and `noreferrer`
