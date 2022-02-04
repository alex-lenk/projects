'use strict'

$(document).ready(function () {
  $('.js__go-anchor').on('click', function (e) {
    e.preventDefault();
    let fixed_offset = 90;
    $('html, body').stop().animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 300);
  });
});
