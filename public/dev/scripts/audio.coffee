do (math, $) ->

  $resize = false
  
  $window = $(window)
	
  $logo_play = $('img.logo-play')
  $logo_wrap = $('div.logo-wrap')
  $logo_audio = $('#logo-audio')[0]
  
  $controller_box_close = $('div.controller > div.close')
  
  endAudio = ->
    $logo_audio.pause()
    $logo_audio.currentTime = 0;
    $logo_wrap.removeClass 'play'
    $height = window.innerHeight
    $width = window.innerWidth
    main.init $height, $width    
    return    
  
  $logo_play.click ->
    if $logo_audio.paused == false
      $logo_audio.pause()
      $logo_wrap.removeClass 'play'
    else
      $logo_audio.play()
      $logo_wrap.addClass 'play'
    return
	
  $logo_audio.onended = ->
    endAudio()
    return
    
  $controller_box_close.click ->
    endAudio()
    return    
    
  
