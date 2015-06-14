<?php
  $args = array( 'posts_per_page' => 5  );
  $posts = get_posts();

  $output = array();
  foreach( $posts as $post ) {
    $output[] = array( 
      'id' => $post->ID, 
      'title' => $post->post_title,
      'longitude' => get_field('locatie', $post->ID)[lng],
      'latitude' => get_field('locatie', $post->ID)[lat],
      'text' => $post->post_content,
      'afbeelding' => 'null',
      'video' => 'null',
      'type' => $post->post_category
    );
  }
  $json = json_encode( $output );
?>