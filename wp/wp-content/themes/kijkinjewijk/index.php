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

<!-- <script type="text/javascript" src="myscript.js"></script> -->


<div id="news-wrapper">
  <div class="news-items-wrapper">
    <div class="categories">
      <div class="category <?php $category->category_nicename ?>">
        <a href="?id=0" id="0">Headlines</a>
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

      foreach ($categories as $category) 
      {
        $empty = "";
        if ($category->category_count == 0) {
          $empty = "empty";
        }
				?>
				<div class="category <?php echo $category->category_nicename; echo " ".$empty ?>" >
  				<a id="<?php echo $category->cat_ID ?>" href="?id=<?php echo $category->cat_ID ?>" data-category="<?php echo $category->cat_ID ?>">
  				<img src="<?php bloginfo('template_directory');?>/libs/img/tab_<?php echo $category->category_nicename ?>.png">
  				<?php echo $category->cat_name?>
  				</a>
				</div>
				<?php
  		}
      ?> 
    </div>
    <div class="news-items">
      <?php
        $args = array( 'posts_per_page' => 15 );
        $posts = get_posts();
        $longitude = '';
        $latitude = '';

        foreach( $posts as $post ) {

          $title = $post->post_title;
          $image = get_field('image');
          $text = $post->post_content;
          $id = $post->ID;
		 
		  
          ?>
          <div class="news-item dotdotdot data-id="<?php echo $id ?>">
            <?php if($image) { ?>
              <img src="<?php echo $image ?>">
            <?php } ?>
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

<script type="text/javascript">
  var jsonData = '<?php echo $json ?>';
</script>

<?php get_footer(); ?>