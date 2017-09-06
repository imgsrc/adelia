$(function () {

  var $menu = $('#mobileNav');
  var $icon = $('#mmenuIcon');

  $icon.on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $menu.toggleClass('active');
  });

});
