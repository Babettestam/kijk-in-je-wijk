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
    <?php
    if (isset($_GET['item']) ) {
      if($_GET['item'] != null) {

        $post = get_post($_GET['item']);

        $image = get_field('gallery', $_GET['item']);
        $title = $post->post_title;
        $text = $post->post_content;
        $id = $post->ID;

        // 
        // Detail newsitem
        // 

        ?>
        <div class="news-item-detail">
          <img src="<?php echo $image['url'] ?>">
          <h2><?php echo $title; ?></h2>
          <div>
           <?php echo wpautop($text); ?>
          </div>
          <div class="buttons-wrapper">
            <a class="button">
              Vul dit stuk aan
            </a>
            <a class="button">
              Deel dit verhaal
            </a>
          </div>
        </div>
        <?php
      }
    }
    else {

      // 
      // all news items || or with category
      // 

      ?>
      <div class="news-items">
        <?php
          $args = array( 'posts_per_page' => 15 );
          $posts = get_posts($args);
          $longitude = '';
          $latitude = '';

          foreach( $posts as $post ) {

            $title = $post->post_title;
            $image = get_field('gallery');
            $text = $post->post_content;
            $id = $post->ID;
            if(!isset($_GET['id']) || $_GET['id'] == 0) {
              // if($_GET['id'] == null || $_GET['id'] == "0")?>
                <div class="news-item dotdotdot" data-id="<?php echo $id ?>" id="<?php echo $id ?>">
                <?php if($image) { ?>
                  <img class="news-image" src="<?php echo $image['url'] ?>">
                <?php } ?>
                <div class="text-wrapper">
                  <h2><?php echo $title ?></h2>
                  <div class=""><?php echo $text ?></div>
                </div>
              </div><?php
              // }
            }
            if($_GET['id'] == $post->post_category[0]) {
              ?>
              <div class="news-item dotdotdot" data-id="<?php echo $id ?>" id="<?php echo $id ?>">
                <?php if($image) { ?>
                  <img class="news-image" src="<?php echo $image['url'] ?>">
                <?php } ?>
                <div class="text-wrapper">
                  <h2><?php echo $title ?></h2>
                  <div class=""><?php echo $text ?></div>
                </div>
              </div>
              <?php
            }
          }
          $json = json_encode( $output );
        ?>
      </div>
      <?php
    }
    ?>
    
  </div>
</div>

<script type="text/javascript">
  var jsonData = '<?php echo $json ?>';
</script>

<?php get_footer(); ?>