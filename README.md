# MoLatte #
MoLatte is a personal fork of [Latte](https://www.hardeepasrani.com/portfolio/latte/) by Hardeep Asrani, maintained at https://github.com/mohsenoid/molatte. Latte is a one-page parallax WordPress theme for developers, designers & freelancers, to showcase their profile. It comes with many options, including services section, and more. Plus, it's easy to customize! You don't need a page builder or a drag & drop editor. Every thing can be customized straight from the WordPress Customizer.

# Installation #
1. Download the zip file from the [Releases](https://github.com/mohsenoid/molatte/releases) page.
2. Go to Appearance > Themes and click on the *Install Themes* tab.
3. Click on the *Upload* link.
4. Upload the zip file that you downloaded and click *Install Now*.
5. Click *Activate* to use the theme you just installed.

# Copyright, License & Other info #

License: [GNU General Public License v2.0] or later (license.txt file)
Unless otherwise specified, all the theme files, scripts and images are licensed under GNU General Public License. See License URI in style.css for further details.

## Libraries ##

Alpha Color Picker, https://github.com/BraadMartin/components/tree/master/customizer/alpha-color-picker
Copyright © 2015 Braad Martin, Inc, GPL License (version not specified), http://www.gnu.org/licenses/gpl-3.0.en.html

Bootstrap 3.4.1, https://getbootstrap.com/
Copyright © 2011-2019 Twitter, Inc, MIT License, http://www.opensource.org/licenses/MIT

FontAwesome 4.7.0, http://fontawesome.io/
Copyright © 2015, Dave Gandy,
Font Awesome licensed under SIL OFL 1.1, http://scripts.sil.org/OFL
Code licensed under MIT License, http://www.opensource.org/licenses/MIT
Documentation licensed under CC BY 3.0, http://creativecommons.org/licenses/by/3.0/

jquery.matchHeight.js 0.7.2, http://brm.io/jquery-match-height/
Copyright © 2014, liabru, MIT License, http://www.opensource.org/licenses/MIT

parallax.js 1.5.0, http://pixelcog.github.io/parallax.js/
Copyright © 2016, PixelCog Inc, MIT License, http://www.opensource.org/licenses/MIT

Post Format Tools from Hybrid Core , https://github.com/justintadlock/hybrid-core
2008 – 2015 © Justin Tadlock, GNU GPL, version 2 or later, http://www.gnu.org/licenses/old-licenses/gpl-2.0.html

## Images ##

avatar.jpg, https://pixabay.com/en/hoodie-sweater-dark-night-evening-691449/
Copyright © 2015, Unsplash, CC0 Public Domain, https://creativecommons.org/publicdomain/zero/1.0/deed.en

background.jpg, https://pixabay.com/en/pencils-writing-write-blog-blogger-762555/
Copyright © 2015, StockSlap, CC0 Public Domain, https://creativecommons.org/publicdomain/zero/1.0/deed.en

blog.jpg, https://pixabay.com/en/pencils-writing-write-blog-blogger-762555/
Copyright © 2015, kaboompics, CC0 Public Domain, https://creativecommons.org/publicdomain/zero/1.0/deed.en

# Changelog #

## Version 1.0 ##

- Initial Release.

## Version 1.1 ##

- Better Customizer support.
- Add more social icons.

## Version 1.1.1 ##

- Minor changes.

## Version 1.1.2 ##

- Added multilingual support for Polylang.
- Updated FontAwesome to latest build.
- Added more social icons.

## Version 2.0 ##

- Service section now display icons.
- Added option to choose category in Blog section.
- Added hooks to homepage template.
- Added imagesloaded to load images properly.
- Added more social icons.
- Fixed default in Alpha Control.
- Fixed selective refresh issue, which was causing Customizer to return in older version of WordPress.
- Fixed text overlapping issue in mobile.

## Version 2.1 ##

- Added image option to Services widget
- Added color picker to Skills widget.
- Added more social icons.
- Added a default icon for unknown links.
- Added homepage link to site title.
- Loading imagesloader from the core now.
- Updated Sendinblue instructions.
- Fixed word wrapping in homepage.

## Version 3.0 ##

- Forked as MoLatte; footer signature now links to the fork's repository.
- Updated Font Awesome to 4.7.0.
- Updated Bootstrap to 3.4.1 (security fixes).
- Replaced removed create_function() with closures for PHP 8 compatibility.
- Security hardening: sanitizers for Customizer settings and colours, output escaping, rel="noopener noreferrer" on external links, HTTPS URLs, direct-access guards on PHP files.
- Fixed imagesloaded enqueue and simplified the welcome screen.

## Version 3.0.1 ##

- Replaced scrollReveal and classie.js with small native scripts; updated parallax.js to 1.5.0 and jquery.matchHeight to 0.7.2.
- Scripts and styles are now versioned with the theme version, so browsers pick up updated files after a release (fixes a hidden parallax background caused by stale cached scripts).
