<?php
  $args = array( 'posts_per_page' => 15 );
  $posts = get_posts();
  $longitude = '';
  $latitude = '';

  $output = array();
  foreach( $posts as $post ) {

    $longitude = get_field('locatie', $post->ID)[lng];
    $latitude = get_field('locatie', $post->ID)[lat];
    $text = mysql_real_escape_string($post->post_content);

    $output[] = array( 
      'id' => $post->ID, 
      'title' => $post->post_title,
      'longitude' => $longitude,
      'latitude' => $latitude,
      'text' => $text,
      'image' => 'null',
      'video' => 'null',
      'category' => $post->post_category
    );
  }
  $json = json_encode( $output );
?>