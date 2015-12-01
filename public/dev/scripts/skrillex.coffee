do (math, $) ->

  math_short = (1 + math.phi)
  math_long = math.phi

  exports = this
  exports.main = {}

  $resize = false
  $start = false
  $play = false
  
  $height = window.innerHeight
  $width = window.innerWidth

  $window = $(window)
  
  $header = $('header')
  $header_search = $('header > input.search')

  $controller_box = $('div.controller');
  $controller_box_close = $('div.controller > div.close')
  $controller_box_repeat = $('div.controller > div.repeat')
  $controller_box_detail = $('div.controller > div.detail')

  $logo_wrap = $('.logo-wrap')
  $logo_img = $('h1.logo')
  $logo_h2 = $('h2.logo')
  $logo_play = $('img.logo-play')

  $articles_wrap = $('div.articles')
  $article = $('div.articles > section')
  $articles_split = $('div.split')
  $articles_down = $('img.down')
  $articles_next = $('p.next')
  
  $controller_top = $("div.controller > div.top")
  $pshow = $(".pshow")
  
  $video_origin = $("video.origin").get(0)
  $video_origin_ = $("video.origin")
  $video_copy = $("video.copy").get(0)
  $video_copy_ = $("video.copy")
  $video_fade = $(".video-fade")
  video_longer = "";
  
  lyric_json = {};
  
  $div_origin = $("div.origin")
  $div_copy = $("div.copy")
  
  $meter = $("div.controller > div.meter")
  $meter_current = $("div.controller > div.meter.current")
  
  origin_load_flag = false
  copy_load_flag = false
  
  $video_origin.addEventListener "error", ->
    console.log "Error while loading origin"
    return

  $video_copy.addEventListener "error", ->
    console.log "Error while loading copy"
    return

  $video_origin.addEventListener "loadeddata", ->
    origin_load_flag = true
    return
  
  $video_copy.addEventListener "loadeddata", ->
    copy_load_flag = true
    return
    
  $video_origin.src = "./videos/skrillex_bangarang_origin.mp4"
  $video_copy.src = "./videos/skrillex_bangarang_cover_01.mp4"
  $video_origin.currentTime = 0
  $video_origin.volume = 0.5
  $video_copy.volume = 0.55
  $video_copy.currentTime = 1.27261
  
  $lyric = $(".lyric");
  $lyric_en = $(".lyric p.en");
  $lyric_ja = $(".lyric p.ja");
  
  setVideoSize = () ->
    origin_rate = $video_origin.videoWidth / $video_origin.videoHeight
    origin_height = $video_origin_.width() / origin_rate
    origin_margin_top = ($video_origin_.height() - origin_height) / 2

    copy_rate = $video_copy.videoWidth / $video_copy.videoHeight
    copy_height = $video_copy_.width() / copy_rate
    copy_margin_top = ($video_copy_.height() - copy_height) / 2
      
    if origin_height > copy_height
      copy_height = origin_height
      copy_margin_top = origin_margin_top
    if origin_height < copy_height
      origin_height = copy_height
      origin_margin_top = copy_margin_top
        
    setStyle $div_origin, origin_margin_top, 'margin-top'
    setStyle $div_copy, copy_margin_top, 'margin-top'
    setSize $div_origin, origin_height, 'height'
    setSize $div_copy, copy_height, 'height'
    setStyle $lyric, origin_margin_top, 'height'
    setStyle $lyric_en, ((origin_margin_top - getSize($controller_box, 'height')) / math_short) - 12, 'margin-top'
    return    
  
  getLongLength = (origin, copy) ->
    if origin > copy
      video_longer = "origin"
      return origin
    else
      video_longer = "copy"
      return copy
      
  setMeter = (ratio) ->
    meter_duration = getSize $meter, 'width'
    setSize $meter_current, meter_duration * ratio, 'width'
    
  showLyrics = (current) ->
    # console.log lyric_json
    # console.log current
    for key of lyric_json
      # console.log key + "+" + current
      if key < current
        $lyric_en.text lyric_json[key]["en"]
        $lyric_ja.text lyric_json[key]["ja"]
        delete lyric_json[key]
    return
    
  playMain = (duration) ->
    console.log duration
    $play = setInterval((->
      if video_longer == "copy"
        setMeter $video_copy.currentTime / duration
        showLyrics $video_copy.currentTime
      else
        setMeter $video_origin.currentTime / duration
        showLyrics $video_origin.currentTime
      return
    ), 1)
    return
  
  $start = setInterval((->
    # console.log origin_load_flag
    # console.log copy_load_flag
    if origin_load_flag == true && copy_load_flag == true
      $video_origin.play()
      $video_copy.play()
      clearInterval $start
      playMain getLongLength $video_origin.duration, $video_copy.duration
      setVideoSize()
      $video_fade.css('opacity','1')    
    return
  ), 80)
  
  getPhi = (length, flag) ->
    if flag == 'short'
      return length / (1 + math.phi)
    else if flag == 'long'
      return length / (1 + math.phi) * math.phi
    return

  getSize = (elem, flag) ->
    if flag == 'height'
      return elem.height()
    else if flag == 'width'
      return elem.width()
    return

  setSize = (elem, length, flag) ->
    if flag == 'height'
      elem.height length
    else if flag == 'width'
      elem.width length
    return

  setStyle = (elem, length, style) ->
    elem.css style, length
    return
    
  getHref = ->
    path = location.pathname
    if path == '/'
      return 'index'
    else
      return path.split('/')[1]
    return
    
  $.ajax(url: '/lyric?' + getHref()).done((data) ->
    console.log data
    lyric_json = JSON.parse data
    return
  ).fail (data) ->
    return

  main.init = (height, width) ->
    # set header
    header_height = ((height / math_short) / math_short) / math_short
    setSize $header, header_height, 'height'
    # set div.logo-wrap & div.articles-wrap $ section.article $ div.articles-split & img.articles_down
    logo_wrap_height = getSize($logo_wrap, 'height')
    articles_down_height = getSize($articles_down, 'height')
    articles_next_height = getSize($articles_next, 'height')
    logo_wrap_height = (height / math_long) + (height / math_short) / math_long
    setSize $logo_wrap, logo_wrap_height, 'height'
    setStyle $articles_down, (height -  logo_wrap_height) / math_short - articles_down_height / 2, 'margin-top'
    setStyle $articles_next, (height - logo_wrap_height) / math_long + ((height - logo_wrap_height) / math_short) / math_short - articles_next_height / 2, 'margin-top'
    # setSize $articles_wrap, logo_wrap_height, 'height'
    setSize $articles_wrap, height, 'height'
    setSize $articles_split, (width / math_short) / math_long, 'width'
    setSize $articles_split, logo_wrap_height, 'height'
    setSize $article, logo_wrap_height, 'height'
    # set img.logo
    setStyle $logo_img, (logo_wrap_height / math_short) - getSize($logo_img, 'height') / 2, 'margin-top'
    # set h2.logo
    setStyle $logo_h2, logo_wrap_height / math_long, 'top'
    setStyle $logo_h2, -1 * getSize($logo_h2, 'height')/2, 'margin-top'
    # set img.logo-play
    setStyle $logo_play, (logo_wrap_height / math_long) + (logo_wrap_height / math_short) / math_long, 'top'
    setStyle $logo_play, -1 * getSize($logo_play, 'height')/2, 'margin-top'
    # set div.controller-box
    setSize $controller_box, ((height / math_short) / math_short) / math_short, 'height'
    # set div.controller-box -> div.close & -> div.detail & -> div.repeat
    controller_height = getSize($controller_box, 'height')
    setSize $controller_box_close, controller_height, 'height'
    setSize $controller_box_close, controller_height, 'width'
    setSize $controller_box_detail, controller_height, 'height'
    setSize $controller_box_detail, controller_height, 'width'
    setSize $controller_box_repeat, controller_height, 'height'
    setSize $controller_box_repeat, controller_height, 'width'
    setStyle $controller_box_repeat, controller_height, 'right'
    # set Controllers
    setStyle $controller_top, header_height, 'margin-top'
    setSize $meter, width - controller_height, 'width'
    setSize $meter_current, width - controller_height, 'width'
    setStyle $meter, controller_height / 2 - 1, 'bottom'
    setStyle $meter_current, controller_height / 2 - 1, 'bottom'
    # set Pshow
    setSize $pshow, height - header_height, 'height'
    return

  main.init $height, $width

  $window.resize ->
    if $resize != false
      clearTimeout $resize
    $resize = setTimeout((->
      $height = window.innerHeight
      $width = window.innerWidth
      main.init $height, $width
      setVideoSize()
      return
    ), 80)
  return
  
  return
