<?php
  $args = array( 'posts_per_page' => 5  );
  $posts = get_posts();
  $longitude = '';
  $latitude = '';
  // $longitude = get_field('locatie', $post->ID);
  // $latitude = get_field('locatie', $post->ID)[lat];
  // if(!empty(get_field('locatie', $post->ID) && get_field('locatie', $post->ID)[lat]) {
  //   $longitude = get_field('locatie', $post->ID)[lng];
  //   $latitude = get_field('locatie', $post->ID)[lat]
  // }

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
    // echo $text;
  }
  $json = json_encode( $output );
?>