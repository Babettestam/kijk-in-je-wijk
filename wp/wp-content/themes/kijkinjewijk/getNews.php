<?php
  $args = array( 'posts_per_page' => 15 );
  $posts = get_posts();
  $longitude = '';
  $latitude = '';

  $output = array();
  		$GetVar = '';
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
    ); //einde array
	
	 if(isset($_GET['id']))
	{
		$GetVar = $_GET["id"];
	
		switch ($GetVar) {
		case 0:
			//echo "i equals 0";
			  /*  if($post->post_category == "Sport") 
			{
				echo "dit is cultuur";
			}
			else
			{
				echo $post->post_category;
				//echo "dit is geen cultuur";
			}
			break;
		case 1:
			echo "i equals 1";
			break;
		case 2:
			echo "i equals 2";
			break;
		}*/
	} 
	
  }//einde foreach
  


  
  
  $json = json_encode( $output );
?>