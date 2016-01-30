(function() {
  (function(math, $) {
    var $controller_box_close, $logo_audio, $logo_play, $logo_wrap, $resize, $window, endAudio;
    $resize = false;
    $window = $(window);
    $logo_play = $('.main.box .logo-play, .switch');
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
      if ($(this).parents(".box").hasClass("play") === true) {
        console.log($logo_audio.volume);
        return $logo_audio.play();
      } else {
        return $logo_audio.pause();
      }
    });
    return;
    $logo_audio.onended = function() {
      endAudio();
    };
    return $controller_box_close.click(function() {
      endAudio();
    });
  })(math, $);

}).call(this);
