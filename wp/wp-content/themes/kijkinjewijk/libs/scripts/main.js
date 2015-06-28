;(function ($) {

  $( document ).ready( function() {
    mapInit();
    load_dotdotdot();
    newsItemHover();
    load_Active();

    $('.empty').on('click', function() {
      event.preventDefault();
    })

    $('.news-item').on('click', function() {
      openNewsItem(this);
    });
  });

  $( window ).resize( function() {
  });

  function openNewsItem(item) {
    var id = $(item).attr('id');
    // console.log(id);
    window.location.href = "?item=" + id;
  }

})(jQuery);