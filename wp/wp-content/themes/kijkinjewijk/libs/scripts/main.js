;(function ($) {

  $( document ).ready( function() {
    mapInit();
    load_dotdotdot();
    newsItemHover();
    load_Active();

    $('.empty').on('click', function() {
      event.preventDefault();
    })
  });

  $( window ).resize( function() {
  });

})(jQuery);