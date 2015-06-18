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
        Headlines
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
          $option = '<option value="/category/archives/'.$category->category_nicename.'">';
          $option .= $category->cat_name;
          $category_count = $category->category_count;
          $option .= '</option>';
          ?>
          <div class="category <?php $category->category_nicename ?>">
            <?php echo $category->cat_name?>
          </div>
          <?php

          // echo $option;
        }
        ?> 
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  var jsonData = '<?php echo $json ?>';
</script>

<?php get_footer(); ?>