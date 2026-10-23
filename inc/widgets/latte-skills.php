<?php
defined( 'ABSPATH' ) || exit;
/**
 * Skills Widget - Latte
 */

class latte_skills_widget extends WP_Widget {

	function __construct() {
		parent::__construct(
			'latte_skills_widget',
			__( 'Latte - Skills Widget', 'latte' ),
			array( 'description' => __( 'Skills widget for Latte theme\'s Skills section.', 'latte' ), )
		);
		add_action('admin_enqueue_scripts', array($this, 'widget_scripts'));
	}

	function widget_scripts() {
		wp_enqueue_script( 'iris', array( 'jquery' ) );
		wp_enqueue_script( 'latte_skills_widget_js', get_template_directory_uri() . '/assets/js/skills.js', array( 'jquery' ) ,'', true );
		wp_localize_script( 'latte_skills_widget_js', 'latte_skills_var', array(
			'titlecolor' => $this->get_field_id('titlecolor'),
			'titlebackground' => $this->get_field_id('titlebackground'),
			'barbackground' => $this->get_field_id('barbackground'),
		));
	}

	function form($instance) {
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('title') ); ?>"><?php esc_html_e('Skill', 'latte'); ?></label> 
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name('title') ); ?>" type="text" value="<?php if( !empty($instance['title']) ): echo esc_html($instance['title']); endif; ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('percentage') ); ?>"><?php esc_html_e('Percentage', 'latte'); ?></label> 
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('percentage') ); ?>" name="<?php echo esc_attr( $this->get_field_name('percentage') ); ?>" type="number" min="0" max="100" value="<?php if( !empty($instance['percentage']) ): echo intval($instance['percentage']); endif; ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('titlecolor') ); ?>"><?php esc_html_e('Title Color', 'latte'); ?></label> 
			<br/>
			<input class="color" id="<?php echo esc_attr( $this->get_field_id('titlecolor') ); ?>" name="<?php echo esc_attr( $this->get_field_name('titlecolor') ); ?>" type="text" value="<?php if( !empty($instance['titlecolor']) ): echo latte_sanitize_color($instance['titlecolor'], 'transparent'); else: echo'#FFFFFF'; endif; ?>" style="background:<?php if( !empty($instance['titlecolor']) ): echo latte_sanitize_color($instance['titlecolor'], 'transparent'); else: echo'#FFFFFF'; endif; ?>;" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('titlebackground') ); ?>"><?php esc_html_e('Title Background', 'latte'); ?></label> 
			<br/>
			<input class="color" id="<?php echo esc_attr( $this->get_field_id('titlebackground') ); ?>" name="<?php echo esc_attr( $this->get_field_name('titlebackground') ); ?>" type="text" value="<?php if( !empty($instance['titlebackground']) ): echo latte_sanitize_color($instance['titlebackground'], 'transparent'); else: echo'#D35400'; endif; ?>" style="background:<?php if( !empty($instance['titlebackground']) ): echo latte_sanitize_color($instance['titlebackground'], 'transparent'); else: echo'#D35400'; endif; ?>;" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('barbackground') ); ?>"><?php esc_html_e('Bar Background', 'latte'); ?></label> 
			<br/>
			<input class="color" id="<?php echo esc_attr( $this->get_field_id('barbackground') ); ?>" name="<?php echo esc_attr( $this->get_field_name('barbackground') ); ?>" type="text" value="<?php if( !empty($instance['barbackground']) ): echo latte_sanitize_color($instance['barbackground'], 'transparent'); else: echo'#E67E22'; endif; ?>" style="background:<?php if( !empty($instance['barbackground']) ): echo latte_sanitize_color($instance['barbackground'], 'transparent'); else: echo'#E67E22'; endif; ?>;" />
		</p>
		<?php
	}

	function update($new_instance, $old_instance) {
		$instance = $old_instance;
		$instance['title'] = esc_html($new_instance['title']);
		$instance['percentage'] = intval($new_instance['percentage']);
		$instance['titlecolor'] = latte_sanitize_color($new_instance['titlecolor']);
		$instance['titlebackground'] = latte_sanitize_color($new_instance['titlebackground']);
		$instance['barbackground'] = latte_sanitize_color($new_instance['barbackground']);
		return $instance;
	}

	function widget($args, $instance) {
				?>
			<?php echo $args['before_widget']; ?>
					<div data-sr="ease-in-out wait 0.25s" class="col-md-6 col-sm-12 skill-box">
						<div class="skillbar clearfix " data-percent="<?php if( !empty($instance['percentage']) ): echo intval($instance['percentage']); endif; ?>%">
							<div class="skillbar-title" style="background: <?php if( !empty($instance['titlebackground']) ): echo latte_sanitize_color($instance['titlebackground'], 'transparent'); endif; ?>;"><span style="color:<?php if( !empty($instance['titlecolor']) ): echo latte_sanitize_color($instance['titlecolor'], 'transparent'); endif; ?>;"><?php if( !empty($instance['title']) ): echo esc_html($instance['title']); endif; ?></span></div>
							<div class="skillbar-bar" style="background: <?php if( !empty($instance['barbackground']) ): echo latte_sanitize_color($instance['barbackground'], 'transparent'); endif; ?>;"></div>
							<div class="skill-bar-percent"><?php if( !empty($instance['percentage']) ): echo esc_html($instance['percentage']); endif; ?>%</div>
						</div>
					</div>
			<?php echo $args['after_widget']; ?>
		<?php
	}

}

add_action( 'widgets_init', function () {
	register_widget( 'latte_skills_widget' );
} );
?>