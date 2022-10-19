$(document).ready(function() {

  
  $("#header .menu-btn").click(function(){
    $('body').toggleClass("open-menu");
    $('html').toggleClass("open-menu");
    return false;
  });

  $('#main-navigation .menu li > a').mouseenter(function() {
    var tagid = $(this).data('tag');
    $('#main-navigation .menu-images .image').removeClass('active').addClass('d-none');
    $('#' + tagid).addClass('active').removeClass('d-none');
  });

  $(".timings-chart .toggle-btn").click(function(){
    $(this).parent(".timings-chart").toggleClass("open");
    return false;
  });

  
   $('.carousel1').owlCarousel({
    loop:true,
    autoplay:true,
    autoplaySpeed: 2000,
    autoplayHoverPause:true,
    margin:16,
    nav: false,
    dots: false,
    slideTransition: 'linear',
    responsive:{
      0: {
        items:2
      },768:{
          items:4,
      },992:{
        margin:24,
        items:6,
      }
    }
  });
 

$('.carousel2').owlCarousel({
  center: true,
  items:3,
  loop:true,
  margin:30,
  nav:false,
  dots: false,
  autoplay: true,
  slideTransition: 'linear',
  autoplayTimeout: 6000,
  autoplaySpeed: 6000,
  autoplayHoverPause: false,
  responsive:{
    0: {
      items:2
    },768:{
        items:4,
    },992:{
      margin:24,
      items:6,
    }
  }
});

$('.slideshow2').each(function(){
  var $this = $(this);
  $this.slick({
    slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: $this.next(),
      focusOnSelect: true,
      dots: false,
      // loop: true
  });  
});

$('.slideshow2-nav').each(function(){
  var $this = $(this);
  $this.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: $this.prev(),
      arrows: true,
      focusOnSelect: true,
      dots: false,
      vertical: true,
      verticalSwiping:true, 
      responsive: [
      {
        breakpoint: 991,
          settings: {
            vertical: false,
            verticalSwiping:false,
            variableWidth: true,
           
        }
    }
    ]
  });
});

$('.gallery1').height($('.gallery1 img').outerHeight());

var navs = $(".gallery1 > img");
setInterval(function(){
  var cur = $(".gallery1 > .active").index();
  var nxt = (cur + 1) % navs.length;
  if($(".gallery1 .active").index() == navs.length-1) {
    navs.eq(navs.length-1).prevAll().removeClass("completed");
    navs.eq(navs.length-1).addClass("completed").removeClass("active");
    navs.eq(0).addClass("active")
  }
  else {
    navs.eq(navs.length-1).removeClass("completed");
    navs.eq(cur).removeClass("active").prev().removeClass("completed");
    navs.eq(nxt).addClass("active").prev().addClass("completed");
  }


}, 3000);

$('.custom-accordion .custom-card.active').find('.custom-accordion-content').slideDown(200)
$('.custom-accordion .custom-accordion-header').click(function () {
  $(this).parent(".custom-card").toggleClass('active').siblings(".custom-card").removeClass("active");
  $(this).next('.custom-accordion-content').slideToggle(200);
  $(this).parent(".custom-card").siblings(".custom-card").find(".custom-accordion-content").slideUp();
  return false;
});

  if (/Edge\/\d./i.test(navigator.userAgent)){
    jQuery('html').addClass('ie');
  };

  $( "#datepicker" ).datepicker();
  
});
var s = skrollr.init();

$(window).resize(function() {
  $('.gallery1').height($('.gallery1 img').outerHeight());
});

$(window).load(function() {
  objectFitImages();
});
