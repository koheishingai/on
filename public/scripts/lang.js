(function() {
  (function(math, $) {
    var $body, getHref, getLang, init;
    $body = $('body');
    getLang = function() {
      var e, error;
      try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2);
      } catch (error) {
        e = error;
        return void 0;
      }
    };
    getHref = function() {
      var path;
      path = location.pathname;
      if (path === '/') {
        return 'index';
      } else {
        return path.split('/')[1];
      }
    };
    init = function() {
      var lang;
      lang = getLang();
      if (lang === 'en') {
        $body.removeClass('en').addClass('ja');
      } else {
        $body.removeClass('ja').addClass('en');
      }
    };
    init();
    return $.ajax({
      url: '/lang?' + getHref()
    }).done(function(data) {
      console.log(data);
    }).fail(function(data) {});
  })(math, $);

}).call(this);
