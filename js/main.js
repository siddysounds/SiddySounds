

'use strict';

(function ($) {
    // Legacy pages may still include the overlay markup.
    $('#preloder').remove();

    /*------------------
		Navigation
	--------------------*/
    if ($.fn.slicknav && $(".mobile-menu").length) $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });
    
    /*--------------------------
        Event Slider
    ----------------------------*/
    if ($.fn.owlCarousel && $(".event__slider").length) $(".event__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3,
            },
            768: {
                items: 2,
            },
            0: {
                items: 1,
            },
        }
    });
    
    /*--------------------------
        Videos Slider
    ----------------------------*/
    if ($.fn.owlCarousel && $(".videos__slider").length) $(".videos__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 4,
            },
            768: {
                items: 3,
            },
            576: {
                items: 2,
            },
            0: {
                items: 1,
            }
        }
    });

    /*------------------
		Magnific
	--------------------*/
    if ($.fn.magnificPopup && $('.video-popup').length) $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Barfiller
	--------------------*/
    if ($.fn.barfiller && $('#bar1').length) $('#bar1').barfiller({
        barColor: "#ffffff",
    });

    if ($.fn.barfiller && $('#bar2').length) $('#bar2').barfiller({
        barColor: "#ffffff",
    });

    if ($.fn.barfiller && $('#bar3').length) $('#bar3').barfiller({
        barColor: "#ffffff",
    });

    /*-------------------
		Nice Scroll
	--------------------- */
    if ($.fn.niceScroll && $(".nice-scroll").length) $(".nice-scroll").niceScroll({
        cursorcolor: "#111111",
        cursorwidth: "5px",
        background: "#e1e1e1",
        cursorborder: "",
        autohidemode: false,
        horizrailenabled: false
    });

})(jQuery);