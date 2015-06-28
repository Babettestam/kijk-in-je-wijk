
   
function load_Active() {

	$('.category a').on('click', function(){

    $('a.active').removeClass('active');
    $(this).addClass('active');
});
}


