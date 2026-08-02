/**
 * markdown-it-asciimath 1.0.0 - vendored from npm, MIT, Copyright (c) 2016 quertt
 * https://github.com/quertt/markdown-it-asciimath
 *
 * Kept here instead of as a dependency because the published package does two
 * things a page-wide dependency must not do:
 *
 *   1. it logs on every render - `console.log(useKeyword)` at setup and again
 *      per inline code span, plus bare "1"/"2" markers. That noise showed up in
 *      every browser console of every app that renders markdown.
 *   2. it overwrites String.prototype.trim globally with its own regex version.
 *      Native trim has been in the language since ES5; replacing it for the
 *      whole application to save nothing is a trap for everyone else.
 *
 * Both are removed below. The rendering logic is otherwise unchanged, including
 * the unrequired global AMTparseAMtoTeX - that comes from ASCIIMathTeXImg.js,
 * which the pages load via a <script> tag.
 */
var katex = require("katex")

var defaults = {
  useKeyword: false
}

function setup(md, options) {
  if (typeof options === "undefined") {
    options = defaults
  }
  var useKeyword = options.useKeyword

  var defaultRender = md.renderer.rules.fence

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    var token = tokens[idx]

    if (token.info === "math") {
      return render(token.content, true)
    }

    if (token.info === "latex") {
      return renderTeX(token.content, true)
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self)
  }

  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    var token = tokens[idx]

    if (!useKeyword) {
      return renderInline(token.content.trim(), false)
    } else {
      if (token.content.substr(0, 4) === "math") {
        return renderInline(token.content.substr(4).trim(), false)
      } else if (token.content.substr(0, 5) === "latex") {
        return renderElement(token.content.substr(5).trim(), false)
      }
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

function render(str, disp) {
  // split content
  var arr = str.trim().split("\n")
  var result = ""

  // render each line, skipping empty lines
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      result += "<p>" + renderElement(preprocessMath(arr[i]), disp) + "<p>"
    }
  }

  return result
}

function renderTeX(str, disp) {
  // split content
  var arr = str.trim().split("\n")
  var result = ""

  // render each line, skipping empty lines
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      result += "<p>" + renderElement(arr[i], disp) + "<p>"
    }
  }

  return result
}

function renderInline(str, disp) {
  return renderElement(preprocessMath(str), disp)
}

function renderElement(str, disp) {
  return katex.renderToString(str, {displayMode: disp})
}

function preprocessMath(str) {
  var newstr

  // correct index-texts
  newstr = str.replace(/_(.*?)(\s|$|=|\(|\)|\*|\/|\^)/g, "_($1)$2")

  // parse to TeX - global from ASCIIMathTeXImg.js
  newstr = AMTparseAMtoTeX(newstr)

  return newstr
}

module.exports = setup
