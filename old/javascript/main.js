// Javascript pour les pages

$(document).ready(function() {

/* Page avec les drapeaux */
	/* Lorsqu'on clique sur un lien, on fait apparaire le détail correspondant */
	$( "[id^='flag']" ).click(function(e) {
		$('#boxDetail').html($(this).attr("detail"));
		$('#boxDetail').css('background-color', $(this).attr("main-color"));
		if (initialLeft = '')
			initialLeft = $('#boxDetail').css('left');
		
		if ($(document).scrollLeft() != 0) 
			$('#boxDetail').css('left', ($(document).scrollLeft() + 15)+'px');
		else
			$('#boxDetail').css('left', initialLeft);
		
		$('#detailBoxContainer').fadeIn(1000);
		e.preventDefault();
	});
	
	/* Click sur detailBoxContainer le cache */
	$('#detailBoxContainer').click(function() {
		$(this).fadeOut();
	});

/* Page Les publics */
	$( ".publics_box").click(function(e) {
		boxDetail = '#' + $(this).attr("id") + '_Detail';
		if ($(boxDetail).css('display') == "none")
			$(boxDetail).fadeIn(1000);
		else
			$(boxDetail).fadeOut();
		/* e.preventDefault(); -> inutile, semble-t-il */
	});
	
/* Fait disparaitre la page de détail  */
	$( ".publicsDetail_box" ).click(function(e) {
		$(this).fadeOut();
	});
	
/* 
 * CV : apparition et disparition
 */
	$('.JS_InOut_Click').click(function(e) {;
		if ($('#CV').css('display') == 'none') {
			// Calcule la bonne taille de la div
			$('#CV').fadeIn(500);
			$('#bodyContent').hide();
		} else {
			$('#bodyContent').show();
			$('#CV').fadeOut();
		}
	});
	
	//divCV_resize();
});


$(window).resize(function() {
	//divCV_resize();
});

function divCV_resize() {
	//var newHeight = $(bodyContent).height() - 5;
	//$('#CV').height(newHeight);
}


