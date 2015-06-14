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

<script type="text/javascript">
  var jsonData = '<?php echo $json ?>';
</script>

<?php get_footer(); ?>