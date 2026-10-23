/**
 * Scroll reveal for elements carrying a data-sr attribute.
 *
 * Understands the values the theme uses: "enter left|right|top|bottom",
 * "ease-in-out" and "wait <n>s". Elements stay visible when the browser has
 * no IntersectionObserver, the visitor prefers reduced motion, the device is
 * a phone/tablet, or anything goes wrong.
 */
window.latteReveal = function() {
	'use strict';

	var els = document.querySelectorAll( '[data-sr]' ),
		MOVE = 8,
		SCALE = 0.95,
		DURATION = 0.6,
		VIEWPORT_FACTOR = 0.6;

	if ( ! els.length || ! ( 'IntersectionObserver' in window ) ) {
		return;
	}
	if ( window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		return;
	}
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
		return;
	}

	function parse( value ) {
		var enter = 'bottom',
			wait = 0,
			easing = 'ease',
			match;

		if ( ( match = /enter\s+(left|right|top|bottom)/.exec( value ) ) ) {
			enter = match[1];
		}
		if ( ( match = /wait\s+([\d.]+)s/.exec( value ) ) ) {
			wait = parseFloat( match[1] );
		}
		if ( /ease-in-out/.test( value ) ) {
			easing = 'ease-in-out';
		}
		return { enter: enter, wait: wait, easing: easing };
	}

	function offset( enter ) {
		switch ( enter ) {
			case 'left':
				return 'translateX(-' + MOVE + 'px)';
			case 'right':
				return 'translateX(' + MOVE + 'px)';
			case 'top':
				return 'translateY(-' + MOVE + 'px)';
			default:
				return 'translateY(' + MOVE + 'px)';
		}
	}

	function showAll() {
		Array.prototype.forEach.call( els, function( el ) {
			el.style.opacity = '';
			el.style.transform = '';
			el.style.transition = '';
		} );
	}

	try {
		var observer = new IntersectionObserver( function( entries ) {
			entries.forEach( function( entry ) {
				var el = entry.target,
					cfg = el._latteSr,
					visible = entry.intersectionRatio >= VIEWPORT_FACTOR ||
						entry.intersectionRect.height >= window.innerHeight * VIEWPORT_FACTOR;

				if ( ! visible ) {
					return;
				}
				observer.unobserve( el );
				el.style.transition = 'opacity ' + DURATION + 's ' + cfg.easing + ' ' + cfg.wait + 's, transform ' + DURATION + 's ' + cfg.easing + ' ' + cfg.wait + 's';
				el.style.opacity = '1';
				el.style.transform = 'none';
				window.setTimeout( function() {
					el.style.opacity = '';
					el.style.transform = '';
					el.style.transition = '';
				}, ( DURATION + cfg.wait ) * 1000 + 100 );
			} );
		}, { threshold: [ 0, VIEWPORT_FACTOR ] } );

		Array.prototype.forEach.call( els, function( el ) {
			var cfg = parse( el.getAttribute( 'data-sr' ) );
			el._latteSr = cfg;
			el.style.opacity = '0';
			el.style.transform = offset( cfg.enter ) + ' scale(' + SCALE + ')';
			observer.observe( el );
		} );
	} catch ( e ) {
		showAll();
	}
};
