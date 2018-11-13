(function($) {
  $(function() {

    $('.sidenav').sidenav();
    $('.type-text').teletype({
      text: ['IT en Rotaract.'],
      typeDelay: 0,
      backDelay: 9999999999,
      cursor: '▋',
    });

    $('#btn-colaborar').click(function() {
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#sct-projects").offset().top
      }, 2000);
    });

  });
})(jQuery);
