$( document ).ready(function() {
   


	$('.category a').on('click', function(){

    $('a.active').removeClass('active');
    $(this).addClass('active');
});


});//end onready
