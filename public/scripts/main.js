(function() {
  (function(math, $) {
    var $body, $bottom, $bottom_menu, $bottom_menu_img, $bottom_menu_shadow, $bottom_under_menu, $contents, $controller_box, $controller_box_close, $controller_top, $cover, $fade, $header, $header_share, $height, $iframe, $logo_h2, $logo_img, $logo_play, $logo_play_bottom, $main, $resize, $switch, $switch_tri, $width, $window, exports, getPhi, getSize, setSize, setStyle;
    exports = this;
    exports.main = {};
    $resize = false;
    $body = $('body');
    $height = $body.height();
    $width = $body.width();
    $window = $(window);
    $header = $('header');
    $header_share = $('header .share');
    $logo_img = $('img.logo');
    $logo_h2 = $('h2.logo');
    $logo_play = $('.main .logo-play');
    $logo_play_bottom = $('.bottom img.logo-play');
    $switch = $(".switch");
    $switch_tri = $(".switch, img.logo-play");
    $iframe = $('iframe');
    $main = $('div.main');
    $contents = $('.contents');
    $cover = $('.cover');
    $bottom = $('div.bottom');
    $bottom_menu = $('div.bottom > div.bottom_menu');
    $bottom_under_menu = $('div.bottom > div.bottom_menu > div.menu');
    $bottom_menu_shadow = $('div.bottom > div.bottom_menu > div.menu > div.shadow');
    $bottom_menu_img = $('div.bottom > div.bottom_menu > div.menu img');
    $controller_box = $('div.controller');
    $controller_box_close = $('div.controller > div.close');
    $controller_top = $("div.controller > div.top");
    $fade = $('.fade');
    getPhi = function(length, flag) {
      if (flag === 'short') {
        return length / (1 + math.phi);
      } else if (flag === 'long') {
        return length / (1 + math.phi) * math.phi;
      }
    };
    getSize = function(elem, flag) {
      if (flag === 'height') {
        return elem.height();
      } else if (flag === 'width') {
        return elem.width();
      }
    };
    setSize = function(elem, length, flag) {
      if (flag === 'height') {
        elem.height(length);
      } else if (flag === 'width') {
        elem.width(length);
      }
    };
    setStyle = function(elem, length, style) {
      elem.css(style, length);
    };
    main.init = function(height, width) {
      var bottom_height, bottom_menu_height, bottom_text_width, header_height, logo_play_height, main_height, math_long, math_short;
      if ($height > $width) {
        $body.addClass("tall");
      } else {
        $body.removeClass("tall");
      }
      math_short = 1 + math.phi;
      math_long = math.phi;
      header_height = ((height / math_short) / math_short) / math_short;
      setSize($header, header_height, 'height');
      main_height = height / math_long + height / math_short / math_short + header_height / math_short;
      setSize($main, main_height, 'height');
      setSize($contents, main_height, 'height');
      setSize($cover, main_height, 'height');
      setSize($bottom, height - (main_height + 1), 'height');
      setStyle($logo_h2, main_height / math_long - getPhi(getPhi(getPhi(main_height / math_short, 'short'), 'short'), 'short'), 'top');
      setStyle($logo_h2, -1 * getSize($logo_h2, 'height') / 2, 'margin-top');
      setSize($logo_img, getPhi(getPhi(width, 'long'), 'short'), 'width');
      setStyle($logo_img, (getPhi(main_height, 'short') + getPhi(getPhi(getPhi(getPhi(main_height, 'short'), 'short'), 'short'), 'short')) - getSize($logo_img, 'height') / 2, 'margin-top');
      logo_play_height = getPhi(main_height, 'long') + getPhi(getPhi(getPhi(main_height, 'short'), 'short'), 'long');
      setStyle($logo_play, logo_play_height, 'top');
      setStyle($switch, logo_play_height, 'top');
      setStyle($logo_play, -1 * getSize($logo_play, 'height') / 2, 'margin-top');
      setSize($bottom, main_height + header_height, 'height');
      bottom_menu_height = height - main_height;
      setSize($bottom_menu, header_height, 'height');
      if (header_height < 34.9415) {
        $bottom_menu.css('line-height', 34.9415 + "px");
      } else {
        $bottom_menu.css('line-height', header_height + "px");
      }
      if (width < 701) {

      } else {

      }
      if (width < 701) {
        setSize($bottom_menu_shadow, width, 'width');
      } else {
        setSize($bottom_menu_shadow, width / 2, 'width');
      }
      bottom_text_width = (width / 2) / math_short;
      setSize($bottom_menu_img, bottom_text_width, 'width');
      bottom_height = height - main_height;
      if (width < 701) {
        setStyle($bottom_menu_img, (bottom_height - bottom_text_width * 0.40752351097178685) / 2 - 16, 'margin-top');
      } else {
        setStyle($bottom_menu_img, (bottom_height - bottom_text_width * 0.40752351097178685) / 2 + 6, 'margin-top');
      }
      $fade.css("opacity", 1);
      setSize($controller_box, header_height, 'height');
      setSize($controller_box_close, header_height, 'height');
      setSize($controller_box_close, header_height, 'width');
      setStyle($controller_top, header_height, 'margin-top');
    };
    main.init($height, $width);
    $logo_play_bottom.click(function() {
      $iframe.attr("src", "/taylor_swift").load(function() {
        $body.addClass("play");
        location.hash = "/taylor_swift";
        $(this).fadeIn("slow");
      });
    });
    $controller_box_close.click(function() {
      $iframe.fadeOut(function() {
        $body.removeClass("play");
        $(this).contents().find("body").html('');
        location.hash = "";
      });
    });
    $header_share.click(function() {
      $body.toggleClass("share");
    });
    $switch_tri.click(function() {
      $(this).parents(".box").toggleClass("play");
    });
    $window.resize(function() {
      if ($resize !== false) {
        clearTimeout($resize);
      }
      $resize = setTimeout((function() {
        $fade.css("opacity", 0);
        $height = $body.height();
        $width = $body.width();
        main.init($height, $width);
      }), 80);
    });
  })(math, $);

}).call(this);
