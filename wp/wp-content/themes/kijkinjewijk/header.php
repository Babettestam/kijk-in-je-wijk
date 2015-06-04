<html>
<?php wp_head(); ?>
<head>
  <title>My Theme</title>
  <link rel="stylesheet" href="<?php bloginfo('template_directory');?>/libs/fonts/fontello/css/fontello.css">
  <link rel="stylesheet" href="<?php bloginfo('stylesheet_directory');?>/css/style.css">
</head>
<body <?php body_class( $class ); ?>>
<div id="wrapper">
<!-- <div id="header">
	<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
</div> -->