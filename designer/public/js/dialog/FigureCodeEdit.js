import FigureTest from "./FigureTest"

export default class FigureCodeEdit {
  constructor() {
  }

  show() {
    Mousetrap.pause()
    let code = app.getConfiguration("code")

    let splash = $(`
          <div id="codeDialog">
            <pre class="codeContainer">
            </pre>
              <div class="tinyFlyoverMenu codeOverlay">
                <button id="test_run"    class="electra-button">&#9654;</button>
                <button data-i18n="common:button.save" id="test_commit" class="electra-button">${t("common:button.save")}</button>
                <button data-i18n="common:button.close" id="test_cancel" class='electra-button'>${t("common:button.close")}</button>
              </div>
          </div>
            `
    )

    splash.hide()
    $("body").append(splash)
    splash.fadeIn()

    let before = function (obj, method, wrapper) {
      let orig = obj[method]
      obj[method] = function () {
        let args = Array.prototype.slice.call(arguments)
        return wrapper.call(this, function () {
          return orig.apply(obj, args)
        }, args)
      }

      return obj[method]
    }

    let intersects = function (range) {
      return editor.getSelectionRange().intersects(range)
    }

    let preventReadonly = function (next, args) {
      if (intersects(range)) return
      next()
    }

    let lines = code.split("\n")
    let last = lines.length - 1
    let first = lines.findIndex(function (element, index, array) {
      return element.startsWith("testShape")
    })

    let editor = ace.edit($("#codeDialog .codeContainer")[0]),
      session = editor.getSession(),
      Range = ace.require("ace/range").Range,
      range = new Range(0, 0, first, lines[first].length),
      range2 = new Range(last, 0, last, lines[last].length)

    editor.setValue(code)
    session.addMarker(range, "readonly-highlight")
    session.addMarker(range2, "readonly-highlight")
    session.setMode("ace/mode/javascript")
    session.setUseWrapMode(true)
    editor.moveCursorTo(first + 1, 0)
    editor.focus()

    editor.keyBinding.addKeyboardHandler({
      handleKeyboard: function (data, hash, keyString, keyCode, event) {
        if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false

        if (intersects(range) || intersects(range2)) {
          return {command: "null", passEvent: false}
        }
      }
    })

    before(editor, 'onPaste', preventReadonly)
    before(editor, 'onCut', preventReadonly)

    range.start = session.doc.createAnchor(range.start)
    range.end = session.doc.createAnchor(range.end)
    range.end.$insertRight = true

    range2.start = session.doc.createAnchor(range2.start)
    range2.end = session.doc.createAnchor(range2.end)
    range2.end.$insertRight = true

    $(".tinyFlyoverMenu").on("click", "#test_commit", () => {
      let code = editor.getValue()
      app.setConfiguration({code: code})
      Mousetrap.unpause()
      splash.fadeOut(function () {
        splash.remove()
      })
    })

    $(".tinyFlyoverMenu" ).on("click", "#test_cancel", () => {
      Mousetrap.unpause()
      splash.fadeOut(function () {
        splash.remove()
      })
    })

    $(".tinyFlyoverMenu").on("click", "#test_run", () => {
      let code = editor.getValue()
      app.setConfiguration({code: code})
      new FigureTest().show()
    })
  }
}
