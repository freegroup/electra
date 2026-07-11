// detail.js — master/detail registry. Each node kind maps to a renderer that
// fills the right-hand pane. Exposed as global `Detail`.
//
//   Detail.register("scope", (container, ctx) => { ... })
//   Detail.show("scope", ctx)   // selected a node → render its detail
//   Detail.refresh()            // re-render the current selection (after a
//                               // mutation) so the pane stays in sync
//   Detail.clear()              // empty state

const Detail = (() => {
  const renderers = {}
  let container = null
  let headEl = null
  let current = null // { kind, ctx }
  let emptyHint = "Select a node in the tree."

  function init(el, hint, head) {
    container = el
    headEl = head || null
    if (hint) emptyHint = hint
    clear()
  }

  function register(kind, renderFn) { renderers[kind] = renderFn }

  function setTitle(t) { if (headEl) headEl.textContent = t }

  function clear() {
    current = null
    setTitle("Detail")
    if (!container) return
    container.innerHTML = ""
    const empty = document.createElement("div")
    empty.className = "detail-empty"
    empty.textContent = emptyHint
    container.appendChild(empty)
  }

  async function show(kind, ctx) {
    const fn = renderers[kind]
    if (!fn) { clear(); return }
    current = { kind, ctx }
    container.innerHTML = ""
    await fn(container, ctx)
  }

  // Re-render whatever is currently shown (renderers read fresh app state).
  async function refresh() {
    if (!current) return
    await show(current.kind, current.ctx)
  }

  function currentSelection() { return current }

  return { init, register, show, refresh, clear, currentSelection, setTitle }
})()
