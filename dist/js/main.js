$(function() {
  "use strict";

  var nav_offset_top = $('header').height() + 50; 
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/
    function navbarFixed(){
        if ( $('.header_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();



    /*-------------------------------------------------------------------------------
	  clients logo slider
	-------------------------------------------------------------------------------*/
    if ($('.clients_slider').length) {
      $('.clients_slider').owlCarousel({
          loop: true,
          margin: 30,
          items: 5,
          nav: false,
          dots: false,
          responsiveClass: true,
          autoplay: 2500,
          slideSpeed: 300,
          paginationSpeed: 500,
          responsive: {
              0: {
                  items: 1,
              },
              768: {
                  items: 3,
              },
              1024: {
                  items: 4,
              },
              1224: {
                  items: 5
              }
          }
      })
    }


    /*-------------------------------------------------------------------------------
	  testimonial slider
	-------------------------------------------------------------------------------*/
    if ($('.testimonial').length) {
      $('.testimonial').owlCarousel({
          loop: true,
          margin: 30,
          items: 5,
          nav: false,
          dots: true,
          responsiveClass: true,
          slideSpeed: 300,
          paginationSpeed: 500,
          responsive: {
              0: {
                  items: 1
              }
          }
      })
    }


  /*-------------------------------------------------------------------------------
	  Mailchimp 
	-------------------------------------------------------------------------------*/
	function mailChimp() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	}
  mailChimp();
  

	//Get the button
	var topButton = document.getElementById("top_button");
	
	if( topButton != null ) {
		// When the user scrolls down 20px from the top of the document, show the button
		window.onscroll = function() {
			scrollFunction()
		};

		function scrollFunction() {
			if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
				topButton.classList.add( "button-in" );
			} else {
				topButton.classList.remove( "button-in" );
			}
		}

	}
});

// When the user clicks on the button, scroll to the top of the document
function gotoTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}


