import {Remarkable, utils} from "remarkable"

export default class FigureMarkdownEdit {

  constructor() {
    this.mdHtml = null
    this.scrollMap = null

    this.lineHeight = 1.45
    this.defaults = {
      html: true,               // Enable HTML tags in source
      xhtmlOut: false,          // Use '/' to close single tags (<br />)
      breaks: false,            // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',  // CSS language prefix for fenced blocks
      linkTarget: '_blank',     // set target to open link in
      typographer: true         // Enable smartypants and other sweet transforms
    }
  }

  /**
   */
  show() {
    Mousetrap.pause()
    this.mdHtml = new Remarkable('full', this.defaults)
    this.mdHtml.inline.validateLink = this.validateLink


    let markdown = shape_designer.app.getConfiguration("markdown")
    markdown = markdown ? markdown : "# Header \n## Subheader \nbe nice and write a help file for your new \ncreated ***Brainbox*** shape. \n\n  - point 1\n  - point 2\n  - point 3"
    let splash = $(`
      <div id="FigureMarkdownEdit" class="overlay-scale">
          <pre class="source full-height">${markdown}</pre>
          <div class="full-height markdownRendering">
          </div>
          <div class="header">
             <span class="left">Markdown Editor (<a target="_blank" href="https://en.wikipedia.org/wiki/Markdown">markdown syntax </a>)</span>
             <span class="right">HTML Preview</span>
          </div>
          <div class="tinyFlyoverMenu">
            <div id="test_commit" class="fa-regular fa-check-square"></div>
            <div id="test_cancel" class='fa-regular fa-minus-square' ></div>
          </div>
      <div>
      `)

    // fadeTo MUSS leider sein. Man kann mit raphael keine paper.text elemente einfügen
    // wenn das canvas nicht sichtbar ist. In diesen Fall mach ich das Canvas "leicht" sichtbar und raphael ist
    // zufrieden.
    $("body").append(splash)

    $(".tinyFlyoverMenu").on("click", "#test_commit", () => {
      Mousetrap.unpause()
      shape_designer.app.setConfiguration({markdown: this.editor.getValue()})
      splash.removeClass("open")
      setTimeout( () => {
        splash.remove()
      }, 400)
    })
    
    $(".tinyFlyoverMenu").on("click", "#test_cancel", () => {
      Mousetrap.unpause()
      splash.removeClass("open")
      setTimeout(() => {
        splash.remove()
      }, 400)
    })

    setTimeout( () => {
      splash.addClass("open")
    }, 100)


    // Inject line numbers for sync scroll.
    //
    this.mdHtml.renderer.rules.paragraph_open =  (tokens, idx) =>{
      let line
      if (tokens[idx].lines && tokens[idx].level === 0) {
        line = tokens[idx].lines[0]
        return '<p class="line" data-line="' + line + '">'
      }
      return '<p>'
    }

    this.mdHtml.renderer.rules.heading_open =  (tokens, idx) =>{
      let line
      if (tokens[idx].lines && tokens[idx].level === 0) {
        line = tokens[idx].lines[0]
        return '<h' + tokens[idx].hLevel + ' class="line" data-line="' + line + '">'
      }
      return '<h' + tokens[idx].hLevel + '>'
    }

    this.$preview = $("#FigureMarkdownEdit .markdownRendering")
    this.$source = $('#FigureMarkdownEdit .source')

    let editor = ace.edit(this.$source[0]),session = editor.getSession()
    this.editor = editor
    editor.moveCursorTo(5, 0)
    editor.focus()

    session.setMode("ace/mode/markdown")

    session.on('changeScrollTop', this._debounce($.proxy(this.syncScroll, this), 50, false))

    editor.keyBinding.addKeyboardHandler({handleKeyboard: this._debounce($.proxy(this.updateResult, this), 300, false)})

    this.updateResult()
  }

  updateResult() {
    var source = this.editor.getValue()
    this.$preview.html(this.mdHtml.render(source))
    // reset lines mapping cache on content update
    this.scrollMap = null
  }


  // Build offsets for each line (lines can be wrapped)
  // That's a bit dirty to process each line everytime, but ok for demo.
  // Optimizations are required only for big texts.
  buildScrollMap() {
    var _this = this

    var i, offset, nonEmptyList, pos, a, b, lineHeightMap, linesCount,
      acc, sourceLikeDiv,
      _scrollMap

    sourceLikeDiv = $('<div />').css({
      position: 'absolute',
      visibility: 'hidden',
      height: 'auto',
      width: $("#FigureMarkdownEdit .left")[0].clientWidth,
      'font-size': '10pt',
      'font-family': 'tahoma',
      'line-height': this.lineHeight,
      'white-space': 'nowrap'
    }).appendTo('body')

    offset = this.$preview.scrollTop() - this.$preview.offset().top - 40
    _scrollMap = []
    nonEmptyList = []
    lineHeightMap = []

    acc = 0
    this.editor.getValue().split('\n').forEach(function (str) {
      var h, lh

      lineHeightMap.push(acc)

      if (str.length === 0) {
        acc++
        return
      }

      sourceLikeDiv.text(str)
      h = parseFloat(sourceLikeDiv.css('height'))
      lh = parseFloat(_this.lineHeight)
      acc += Math.round(h / lh)
    })
    sourceLikeDiv.remove()
    lineHeightMap.push(acc)
    linesCount = acc

    for (i = 0; i < linesCount; i++) {
      _scrollMap.push(-1)
    }

    nonEmptyList.push(0)
    _scrollMap[0] = 0

    $('.line').each(function (n, el) {
      var $el = $(el), t = $el.data('line')
      if (t === '') {
        return
      }
      t = lineHeightMap[t]
      if (t !== 0) {
        nonEmptyList.push(t)
      }
      _scrollMap[t] = Math.round($el.offset().top + offset)
    })

    nonEmptyList.push(linesCount)
    _scrollMap[linesCount] = this.$preview[0].scrollHeight

    pos = 0
    for (i = 1; i < linesCount; i++) {
      if (_scrollMap[i] !== -1) {
        pos++
        continue
      }

      a = nonEmptyList[pos]
      b = nonEmptyList[pos + 1]
      _scrollMap[i] = Math.round((_scrollMap[b] * (i - a) + _scrollMap[a] * (b - i)) / (b - a))
    }

    return _scrollMap
  }


  syncScroll(scroll) {
    var lineNo, posTo
    lineNo = Math.floor(scroll / this.lineHeight)
    if (!this.scrollMap) {
      this.scrollMap = this.buildScrollMap()
    }
    posTo = this.scrollMap[lineNo]
    this.$preview.stop(true).animate({
      scrollTop: posTo
    }, 400, 'linear')
  }

  validateLink(url) {
    let BAD_PROTOCOLS = [ 'vbscript', 'javascript', 'file'];
    let str = url.trim().toLowerCase();
    // Care about digital entities "javascript&#x3A;alert(1)"
    str = utils.replaceEntities(str);
    if (str.indexOf(':') !== -1 && BAD_PROTOCOLS.indexOf(str.split(':')[0]) !== -1) {
      return false;
    }
    return true;
  }

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _debounce(func, wait, immediate) {
    var timeout
    return function () {
      var context = this, args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}
