jQuery(window).load(function() {

	if( latte_script_var.latte_preloader_display != 1 ) {
		/* Preloader */
		jQuery(".status").fadeOut();
		jQuery(".preloader").delay(1000).fadeOut("slow");
	}

	if( latte_script_var.latte_animations_display != 1 ) {
		/* Scroll reveal */
		if ( window.latteReveal ) {
			window.latteReveal();
		}
	}

});

jQuery(document).ready(function($) {
	if( latte_script_var.latte_is_homepage != 1 ) {
		/* Smooth Scroll */
		jQuery('a[href*="#"]').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = jQuery(this.hash);
				target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					jQuery('html,body').animate({
						scrollTop: target.offset().top
					}, 1200);
					return false;
				}
			}
		});
		if( latte_script_var.latte_parallax_background != '' ) {
			/* Parallax */
			$('.site-wrapper').parallax({imageSrc: latte_script_var.latte_parallax_background, bleed: '10', androidFix: 'false'});
		}
	}

	if( latte_script_var.latte_menu_display != 1 ) {
		var menuLeft = document.getElementById( 'pmenu' ),
		showLeftPush = document.getElementById( 'showLeftPush' ),
		hideLeftPush = document.getElementById( 'hideLeftPush' ),
		body = document.body;

		showLeftPush.onclick = function() {
			this.classList.toggle( 'active' );
			body.classList.toggle( 'pmenu-push-toright' );
			if ( showLeftPush.classList.contains( 'fa-bars' ) ) {
				showLeftPush.classList.remove( 'fa-bars' );
				showLeftPush.classList.add( 'fa-times' );
			} else {
				showLeftPush.classList.add( 'fa-bars' );
			}
			menuLeft.classList.toggle( 'pmenu-open' );
			disableOther( 'showLeftPush' );
		};
		hideLeftPush.onclick = function() {
			this.classList.toggle( 'active' );
			body.classList.toggle( 'pmenu-push-toright' );
			menuLeft.classList.toggle( 'pmenu-open' );
			disableOther( 'hideLeftPush' );
			showLeftPush.classList.add( 'fa-bars' );
		};

		function disableOther( button ) {
			if( button !== 'showLeftPush' ) {
				showLeftPush.classList.toggle( 'disabled' );
			}
		}
	}

	if( latte_script_var.latte_is_homepage != 1 ) {
		if( latte_script_var.latte_skills_display != 1 ) {
			/* Skillbar animation speed */
			jQuery('.skillbar').each(function(){
				jQuery(this).find('.skillbar-bar').animate({
					width:jQuery(this).attr('data-percent')
				},6000);
			});
		}
		/* Apply matchHeight to match services grid */
		var byRow = $('body').hasClass('pmenu-push');
		if( latte_script_var.latte_services_display != 1 ) {
			$('.col-md-12').each(function() {
				$(this).children('.service-box').matchHeight(byRow);
			});
		}
		if( latte_script_var.latte_blogposts_display != 1 ) {
			$('#blogposts').imagesLoaded( function() {
				$('.col-md-12').each(function() {
					$(this).children('.blog-item').matchHeight(byRow);
				});
			});
		}
	}

});
