<?php
  $args = array( 'posts_per_page' => 25 );
  $posts = get_posts($args);
  $longitude = '';
  $latitude = '';

  $output = array();
  		// $GetVar = '';
  foreach( $posts as $post ) {

    $longitude = get_field('locatie', $post->ID)[lng];
    $latitude = get_field('locatie', $post->ID)[lat];
    // $title = mysqli_real_escape_string($post->post_title);
    // $text = mysqli_real_escape_string($post->post_content);
    $title = addslashes($post->post_title);
    $text = mysqli_real_escape_string($post->post_content);

    if(isset($_GET['id'])) {
      if(isset($_GET["id"])) {
        $GetVar = $_GET["id"];
      }
      else {
        $GetVar = "";
      }
      
      // switch ($GetVar) {
      //           case 0:
      //             //echo "i equals 0";
                    
      //               echo "dit is cultuur";

      //             break;
      //           case 1:
      //             echo "i equals 1";
      //             break;
      //           case 2:
      //             echo "i equals 2";
      //             break;
      //         }//einde switch
    } 

    $output[] = array( 
      'id' => $post->ID, 
      'title' => $title,
      'longitude' => $longitude,
      'latitude' => $latitude,
      'text' => $text,
      'image' => get_field('gallery', $post->ID),
      'video' => 'null',
      'category' => $post->post_category,
      'filter' => $GetVar
    ); //einde array
	
	 
	
  }//einde foreach
  


  
  
  $json = json_encode( $output );
?>