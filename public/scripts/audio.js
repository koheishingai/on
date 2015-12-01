(function() {
  (function(math, $) {
    var $controller_box_close, $logo_audio, $logo_play, $logo_wrap, $resize, $window, endAudio;
    $resize = false;
    $window = $(window);
    $logo_play = $('img.logo-play');
    $logo_wrap = $('div.logo-wrap');
    $logo_audio = $('#logo-audio')[0];
    $controller_box_close = $('div.controller > div.close');
    endAudio = function() {
      var $height, $width;
      $logo_audio.pause();
      $logo_audio.currentTime = 0;
      $logo_wrap.removeClass('play');
      $height = window.innerHeight;
      $width = window.innerWidth;
      main.init($height, $width);
    };
    $logo_play.click(function() {
      if ($logo_audio.paused === false) {
        $logo_audio.pause();
        $logo_wrap.removeClass('play');
      } else {
        $logo_audio.play();
        $logo_wrap.addClass('play');
      }
    });
    $logo_audio.onended = function() {
      endAudio();
    };
    return $controller_box_close.click(function() {
      endAudio();
    });
  })(math, $);

}).call(this);
