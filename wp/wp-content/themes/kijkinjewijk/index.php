<?php
/*
Standard template
*/
get_header(); ?>

<div id="primary" class="content-area">
  <div id="content" class="site-content" role="main">
    <div class="page-inner">
      <div id="map-canvas"></div>
    </div>
  </div>
</div>

<?php 
  include "getNews.php";
?>

<div id="news-wrapper">
  <div class="container">
    <div class="news-items-wrapper">
      <div class="categories">
        <div class="category <?php $category->category_nicename ?>">
        <a href="#" class="active">Headlines</a>
        </div>
        <?php
        $args = array(
          'type'                     => 'post',
          'child_of'                 => 0,
          'parent'                   => '',
          'orderby'                  => 'id',
          'order'                    => 'ASC',
          'hide_empty'               => 0,
          'hierarchical'             => 1,
          'exclude'                  => '1',
          'include'                  => '',
          'number'                   => '',
          'taxonomy'                 => 'category',
          'pad_counts'               => false
        );

        $categories = get_categories( $args ); 

        foreach ($categories as $category) {
          ?>
          <div class="category <?php $category->category_nicename ?>">
            <a href="#" data-category="<?php echo $category->cat_ID ?>"><?php echo $category->cat_name?></a>
          </div>
          <?php

          // echo $option;
        }
        ?> 
      </div>
      <div class="news-items">
        <?php
          $args = array( 'posts_per_page' => 15 );
          $posts = get_posts();
          $longitude = '';
          $latitude = '';

          $output = array();
          foreach( $posts as $post ) {

            $title = $post->post_title;
            $image = get_field('image');

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
            ?>
            <div class="news-item dotdotdot">
              <img src="<?php echo $image ?>">
              <div class="text-wrapper">
                <h2><?php echo $title ?></h2>
                <div class=""><?php echo $text ?></div>
              </div>
            </div>
            <?php
          }
          $json = json_encode( $output );
        ?>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  var jsonData = '<?php echo $json ?>';
</script>

<?php get_footer(); ?>