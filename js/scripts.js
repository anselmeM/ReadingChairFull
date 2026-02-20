(function($){
	$(document).ready(function() {

		// Scroll to Top
		jQuery('.scrolltotop').click(function(){
			jQuery('html').animate({'scrollTop' : '0px'}, 400);
			return false;
		});

		jQuery(window).scroll(function(){
			var upto = jQuery(window).scrollTop();
			if(upto > 500) {
				jQuery('.scrolltotop').fadeIn();
			} else {
				jQuery('.scrolltotop').fadeOut();
			}
		});



		    var hamburgers = document.querySelectorAll(".hamburger");
		    if (hamburgers.length > 0) {
		      forEach(hamburgers, function(hamburger) {
		        hamburger.addEventListener("click", function() {
		          this.classList.toggle("is-active");
		        }, false);
		      });
		    }









	});
})(jQuery);