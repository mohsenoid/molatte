# Proposal

## Why

The footer signature still reads "Latte" and links to the original theme author's portfolio page. This site runs the MoLatte fork, so the credit should name the fork and point to its repository.

## What Changes

- Change the footer signature text from "Latte" to "MoLatte".
- Point the signature link at the fork's GitHub repository, `https://github.com/mohsenoid/molatte`.
- Keep the "Proudly powered by WordPress" line, the new-window behaviour and the `rel="noopener noreferrer"` attribute unchanged.

Out of scope: renaming the theme in `style.css`, the admin welcome screen, text domain or other upstream links (Pro/donate pages in the welcome screen).

## Capabilities

### New Capabilities
- `site-footer-credit`: what the footer signature says and where it links.

### Modified Capabilities

None. The existing `front-end-output-escaping` requirements on `rel` and HTTPS still apply and are not changed.

## Impact

- Code: `footer.php` only.
- No dependencies, settings or database changes.
- Assumption: "the old github repo" means the upstream author's link in the footer, and the new target is the fork's `origin` remote, `https://github.com/mohsenoid/molatte`. Change the URL in tasks/spec if a different target is wanted.
