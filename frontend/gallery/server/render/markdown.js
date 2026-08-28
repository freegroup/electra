// Server-side Markdown pipeline for the gallery SSR.
//
// This mirrors the shared browser pipeline frontend/common/public/js/markdown.js
// (markdown-it + asciimath + container "info" + link-target) and the cloze
// worksheet/solution split from the author. The browser file is an ESM
// `export default`, so it cannot be required from this CommonJS server; the
// pipeline is rebuilt here against the same npm packages instead.
//
// The one browser dependency is AMTparseAMtoTeX, a pure string->TeX function
// living in ASCIIMathTeXImg.js, which the pages load via a <script> tag. It is
// loaded here with vm.runInThisContext behind minimal window/document shims -
// the function itself touches neither, only the file's load-time wiring does.

const fs = require("fs")
const path = require("path")
const vm = require("vm")

const MarkdownIt = require("markdown-it")
const container = require("markdown-it-container")
const linkTarget = require("markdown-it-link-target")
const katex = require("katex")

// The cloze gap plugins are shared, browser-free token manipulators; they live
// in common (frontend/common/public/js/cloze_*), reached here via the
// gallery/common symlink - the same shared copy the author editor uses.
const questionPlugin = require("../../common/js/cloze_question_plugin")
const solutionPlugin = require("../../common/js/cloze_solution_plugin")

// --- AMTparseAMtoTeX shim ---------------------------------------------------
// Provide just enough of a browser for ASCIIMathTeXImg.js to define its parser
// and hang it on `window`. The load-time addEventListener call is answered by a
// no-op so the file never reaches for `document`.
const AMTparseAMtoTeX = (function loadAsciiMath() {
  const identity = (s) => s
  try {
    const shimWindow = { addEventListener() {}, navigator: { appName: "", userAgent: "" } }
    global.window = shimWindow
    global.document = { getElementById: () => null, getElementsByTagName: () => [], createElement: () => ({}), createTextNode: () => ({}), createDocumentFragment: () => ({ appendChild() {} }) }
    global.navigator = shimWindow.navigator
    const src = fs.readFileSync(path.resolve(__dirname, "../../common/js/ASCIIMathTeXImg.js"), "utf8")
    vm.runInThisContext(src)
    return (global.window && global.window.AMTparseAMtoTeX) || identity
  } catch (err) {
    console.log(`[gallery] AsciiMath shim unavailable, math falls back to raw text: ${err && err.message}`)
    return identity
  }
})()

// --- asciimath markdown-it plugin -------------------------------------------
// A faithful, dependency-local rebuild of the vendored markdown-it-asciimath:
// fenced ```math / ```latex blocks and every inline `code` span render through
// KaTeX. Inline code without a keyword is treated as AsciiMath (useKeyword off,
// the shared default).
function preprocessMath(str) {
  let newstr = str.replace(/_(.*?)(\s|$|=|\(|\)|\*|\/|\^)/g, "_($1)$2")
  return AMTparseAMtoTeX(newstr)
}

function renderElement(str, disp) {
  return katex.renderToString(str, { displayMode: disp })
}

function renderBlock(str, disp, tex) {
  const arr = str.trim().split("\n")
  let result = ""
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      const body = tex ? arr[i] : preprocessMath(arr[i])
      result += "<p>" + renderElement(body, disp) + "<p>"
    }
  }
  return result
}

function asciimath(md) {
  const defaultFence = md.renderer.rules.fence
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    if (token.info === "math") return renderBlock(token.content, true, false)
    if (token.info === "latex") return renderBlock(token.content, true, true)
    return defaultFence(tokens, idx, options, env, self)
  }
  md.renderer.rules.code_inline = function (tokens, idx) {
    return renderElement(preprocessMath(tokens[idx].content.trim()), false)
  }
}

// --- heading demotion -------------------------------------------------------
// A gallery page already carries an <h1>: the document title. The document's own
// chapters are written as `# Chapter` and would produce a second, third, fourth
// <h1> on the same page - a flat outline where a hierarchy belongs.
//
// So every heading inside the rendered document moves down one level: the
// chapter becomes <h2>, its sections <h3>, and so on. <h6> has nowhere left to
// go and stays.
//
// This lives here and not in the shared pipeline on purpose: the author and the
// PDF export render a document as a whole page, where `# Chapter` IS the top
// level and demoting it would be wrong. Only the gallery frames the document
// with a title of its own.
function demoteHeadings(md) {
  md.core.ruler.push("demote_headings", (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== "heading_open" && token.type !== "heading_close") return
      const level = Number(token.tag.slice(1))
      if (level < 6) token.tag = `h${level + 1}`
    })
  })
}

// --- pipeline instances -----------------------------------------------------
// Mirrors common/js/markdown.js: one shared base, plus the cloze variants that
// blank the gaps (question) or fill them in (solution).
function base() {
  const md = new MarkdownIt()
  md.use(asciimath)
  md.use(container, "info")
  md.use(linkTarget)
  md.use(demoteHeadings)
  return md
}

const md = base()
const mdQuestion = base()
mdQuestion.use(questionPlugin)
const mdSolution = base()
mdSolution.use(solutionPlugin)

module.exports = { md, mdQuestion, mdSolution }
