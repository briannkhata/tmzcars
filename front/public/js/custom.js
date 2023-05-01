// PRE LOADER JS

setTimeout(function() {
    $('#ctn-preloader').addClass('loaded');
    // Una vez haya terminado el preloader aparezca el scroll
    $('body').removeClass('no-scroll-y');

    if ($('#ctn-preloader').hasClass('loaded')) {
      // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
      $('#preloader').delay(1000).queue(function() {
        $(this).remove();
      });
    }
}, 600);

// TESTIMONIAL CAROUSEL JS

$('.testimonial-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  responsive:{
    0:{
      items:1
    }
  }
})

// REVIEW CAROUSEL JS
$('.review-carousel').owlCarousel({
  loop:true,
  nav:false,
  responsive:{
      0:{
          items:1
      },
      768:{
          items:2
      },
      1000:{
          items:3
      }
  }
})

// PRODUCT CAROUSEL JS
$(".product-slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  fade: true,
  asNavFor: ".product-thumbnail",
  autoplay: false,
});

$(".product-thumbnail").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: ".product-slider",
  dots: false,
  arrows: false,
  focusOnSelect: true,
  loop: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },

  ],
});