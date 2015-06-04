<?php

// 
// Custom post type
// 


// 
// Page Slug Body Class
// 

function add_slug_body_class( $classes ) {
  global $post;
  if ( isset( $post ) ) {
    $classes[] = $post->post_type . '-' . $post->post_name;
  }
  return $classes;
}

add_filter( 'body_class', 'add_slug_body_class' );


function my_single_template($single) {
	if(file_exists(get_template_directory() . 'single-' . get_the_ID() . '.php'))
		return get_template_directory() . 'single-' . get_the_ID() . '.php';
	return $single;
}
add_filter('single_template', 'my_single_template');

// THIS THEME USES wp_nav_menu() IN TWO LOCATIONS FOR CUSTOM MENU.
if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus(
		array(
		  'primary' => 'Primary Header Nav'
		)
	);
}

remove_all_filters('posts_orderby');

?>