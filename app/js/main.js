$(function () {

  var $menu = $('#mobileNav');
  var $icon = $('#mmenuIcon');

  $icon.on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $menu.toggleClass('active');
  });

  $('.head-slider').slick({
    autoplay: true,
    dots: true,
    dotsClass: 'head-slider__dots',
    prevArrow: '<button class="head-slider__arrows_left"><i class="mdi' +
    ' mdi-arrow-left-drop-circle-outline"></i></button>',
    nextArrow: '<button class="head-slider__arrows_right"><i class="mdi' +
    ' mdi-arrow-right-drop-circle-outline"></i></button>'
  });

});
