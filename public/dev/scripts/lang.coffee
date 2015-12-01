do (math, $) ->

  $body = $('body')

  getLang = ->
    try
      return (navigator.browserLanguage or navigator.language or navigator.userLanguage).substr(0, 2)
    catch e
      return undefined
    return

  getHref = ->
    path = location.pathname
    if path == '/'
      return 'index'
    else
      return path.split('/')[1]
    return
  
  init = ->  
    lang = getLang()
    if lang == 'en'
      $body.removeClass('en').addClass 'ja'    
    else
      $body.removeClass('ja').addClass 'en'
    return
  
  init()
    
  $.ajax(url: '/lang?' + getHref()).done((data) ->
    console.log data
    return
  ).fail (data) ->
    return