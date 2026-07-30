// ui.js — tiny UI primitives (context menu + modal dialog), no framework.
// Exposed as global `UI`.

const UI = (() => {
  function el(tag, cls, txt) {
    const e = document.createElement(tag)
    if (cls) e.className = cls
    if (txt != null) e.textContent = txt
    return e
  }

  // ---- context menu ------------------------------------------------------
  // items: [{ label, danger?, disabled?, onClick }] — a null item = separator.
  let openMenu = null
  function closeMenu() {
    if (openMenu) { openMenu.remove(); openMenu = null }
    document.removeEventListener("click", onDocClick, true)
    document.removeEventListener("keydown", onKey, true)
  }
  function onDocClick() { closeMenu() }
  function onKey(e) { if (e.key === "Escape") closeMenu() }

  function menu(x, y, items) {
    closeMenu()
    const m = el("div", "ctx-menu")
    for (const it of items) {
      if (!it) { m.appendChild(el("div", "ctx-sep")); continue }
      const row = el("div", "ctx-item" + (it.danger ? " danger" : "") + (it.disabled ? " disabled" : ""), it.label)
      if (!it.disabled) {
        row.addEventListener("click", (ev) => {
          ev.stopPropagation()
          closeMenu()
          it.onClick && it.onClick()
        })
      }
      m.appendChild(row)
    }
    document.body.appendChild(m)
    // Keep on-screen.
    const r = m.getBoundingClientRect()
    const px = Math.min(x, window.innerWidth - r.width - 8)
    const py = Math.min(y, window.innerHeight - r.height - 8)
    m.style.left = px + "px"
    m.style.top = py + "px"
    openMenu = m
    // Defer listener so the opening click doesn't immediately close it.
    setTimeout(() => {
      document.addEventListener("click", onDocClick, true)
      document.addEventListener("keydown", onKey, true)
    }, 0)
  }

  // ---- dialog ------------------------------------------------------------
  // fields: [{ key, label, type: "text"|"number"|"checkbox"|"static"|"custom",
  //            value?, placeholder?, min?, max?, el? (for custom) }]
  // Returns a Promise resolving to a values object, or null if cancelled.
  function dialog({ title, fields = [], okLabel = "OK", cancelLabel = "Cancel", body }) {
    return new Promise((resolve) => {
      const overlay = el("div", "modal-overlay")
      const box = el("div", "modal")
      box.appendChild(el("div", "modal-title", title))

      const form = el("div", "modal-body")
      const getters = {}

      if (body) {
        form.appendChild(body)
      }
      for (const f of fields) {
        const rowEl = el("div", "form-row")
        if (f.label) rowEl.appendChild(el("label", "form-label", f.label))
        let input
        if (f.type === "static") {
          input = el("div", "form-static", f.value == null ? "" : String(f.value))
          getters[f.key] = () => f.value
        } else if (f.type === "checkbox") {
          input = el("input"); input.type = "checkbox"; input.checked = !!f.value
          getters[f.key] = () => input.checked
        } else if (f.type === "custom") {
          input = f.el
          getters[f.key] = f.get || (() => undefined)
        } else {
          input = el("input"); input.type = f.type || "text"
          if (f.value != null) input.value = f.value
          if (f.placeholder) input.placeholder = f.placeholder
          if (f.min != null) input.min = f.min
          if (f.max != null) input.max = f.max
          getters[f.key] = () => (f.type === "number" ? Number(input.value) : input.value)
        }
        input.classList.add("form-input")
        rowEl.appendChild(input)
        form.appendChild(rowEl)
      }
      box.appendChild(form)

      const btns = el("div", "modal-btns")
      const cancel = el("button", null, cancelLabel)
      const ok = el("button", "primary", okLabel)
      btns.append(cancel, ok)
      box.appendChild(btns)

      function close(result) {
        document.removeEventListener("keydown", onKey, true)
        overlay.remove()
        resolve(result)
      }
      function submit() {
        const values = {}
        for (const k of Object.keys(getters)) values[k] = getters[k]()
        close(values)
      }
      // ESC → cancel; ENTER → activate the default (OK) button. Enter is
      // ignored inside a textarea (multi-line) and left to native handling in
      // a select, so those keep working normally.
      function onKey(e) {
        if (e.key === "Escape") { e.preventDefault(); close(null); return }
        if (e.key === "Enter") {
          const tag = e.target && e.target.tagName
          if (tag === "TEXTAREA" || tag === "SELECT") return
          e.preventDefault()
          submit()
        }
      }

      cancel.addEventListener("click", () => close(null))
      ok.addEventListener("click", submit)
      overlay.addEventListener("click", (e) => { if (e.target === overlay) close(null) })
      document.addEventListener("keydown", onKey, true)

      overlay.appendChild(box)
      document.body.appendChild(overlay)
      const first = box.querySelector("input, textarea, select")
      if (first) first.focus()
    })
  }

  // Convenience: a yes/no confirm dialog.
  function confirm({ title, message, okLabel = "OK", danger = false }) {
    const msg = el("div", "modal-message", message)
    return dialog({ title, body: msg, okLabel, fields: [] }).then((r) => r !== null)
  }

  return { el, menu, closeMenu, dialog, confirm }
})()
