(function() {
  (function(math, $) {
    var $body, $controller_box_close, $logo_audio, $logo_play, $logo_wrap, $resize, $window, endAudio;
    $resize = false;
    $window = $(window);
    $body = $('body');
    $logo_play = $('img.logo-play');
    $logo_wrap = $('div.logo-wrap');
    $logo_audio = $('#logo-audio')[0];
    $controller_box_close = $('div.controller > div.close');
    endAudio = function() {
      var $height, $width;
      $logo_audio.currentTime = 0;
      $body.removeClass('play');
      $height = window.innerHeight;
      $width = window.innerWidth;
      main.init($height, $width);
    };
    $logo_play.click(function() {
      if ($logo_audio.paused === false) {
        $body.removeClass('play');
      } else {
        $body.addClass('play');
      }
    });

    /*	
    $logo_audio.onended = ->
      endAudio()
      return
     */
    return $controller_box_close.click(function() {
      endAudio();
    });
  })(math, $);

}).call(this);
