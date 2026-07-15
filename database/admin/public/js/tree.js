// tree.js — renders the god-view scope tree.
//
// Model from /god/tree: a flat list of scopes (each with parentId, name,
// isLeaf, members). We fetch /god/versions?scope=<root> once to know which
// documents/versions live where, then render:
//
//   scope
//     ▸ shared        → versions stored on the scope row itself
//     ▸ sub-scopes    → recurse (non-leaf children)
//     ▸ 👤 person     → one node per leaf child; its versions listed inside
//
// Exposed as global `Tree`.

const Tree = (() => {
  let onSelectDoc = () => {}
  let onSelectNode = () => {}     // (kind, ctx) — left-click selects a node
  let onNodeMenu = () => {}       // (kind, ctx, x, y) — see attachMenu below
  let nameOf = (ref) => ref // hash → friendly handle (set by app.js)
  let selectedEl = null     // currently highlighted row
  let selectedKey = null    // stable key of the selection (survives re-render)

  function selectRow(row) {
    if (selectedEl) selectedEl.classList.remove("selected")
    selectedEl = row
    if (row) { row.classList.add("selected"); selectedKey = row.dataset.key || null }
  }

  // A stable, URL-friendly key per node — the deep-link identity.
  function keyOf(kind, ctx) {
    if (kind === "scope" || kind === "leaf") return `${kind}/${ctx.scope.id}`
    if (kind === "doc") return `doc/${ctx.scope.id}/${encodeURIComponent(ctx.path)}`
    return null
  }

  // Re-apply the highlight to the row matching `key` after a re-render, and
  // reveal it by opening any collapsed ancestor groups.
  function highlightKey(key) {
    selectedKey = key
    if (selectedEl) { selectedEl.classList.remove("selected"); selectedEl = null }
    if (!key) return
    const row = document.querySelector(`#tree .row[data-key="${cssEscape(key)}"]`)
    if (!row) return
    // Walk up: for each ancestor .children that's hidden, show it + flip twisty.
    let node = row.parentElement
    while (node && node.id !== "tree") {
      if (node.classList && node.classList.contains("children") && node.style.display === "none") {
        node.style.display = ""
        const headRow = node.previousElementSibling
        const tw = headRow && headRow.querySelector(".twisty")
        if (tw && tw.textContent === "▸") tw.textContent = "▾"
      }
      node = node.parentElement
    }
    selectRow(row)
    row.scrollIntoView({ block: "nearest" })
  }
  function cssEscape(s) { return s.replace(/["\\]/g, "\\$&") }

  // Wire a row: stable key (for deep-link highlight) + right-click/⋯ menu.
  // kind: "scope" | "leaf" | "doc"; ctx carries what the menu needs.
  function attachMenu(row, kind, ctx) {
    const key = keyOf(kind, ctx)
    if (key) row.dataset.key = key
    row.addEventListener("contextmenu", (ev) => {
      ev.preventDefault(); ev.stopPropagation()
      onNodeMenu(kind, ctx, ev.clientX, ev.clientY)
    })
    const dots = el("span", "row-menu", "⋯")
    dots.title = "actions"
    dots.addEventListener("click", (ev) => {
      ev.preventDefault(); ev.stopPropagation()
      const r = dots.getBoundingClientRect()
      onNodeMenu(kind, ctx, r.right, r.bottom)
    })
    row.appendChild(dots)
  }

  // Shorten a raw personRef hash for display when we have no friendly name.
  function short(ref) {
    const friendly = nameOf(ref)
    if (friendly && friendly !== ref) return friendly
    return ref.length > 12 ? ref.slice(0, 8) + "…" : ref
  }

  function group(versions, scopeRef) {
    // versions for exactly this scope id
    return versions.filter((v) => v.scopeRef === scopeRef)
  }

  function versionBadges(list) {
    // Collapse to "path vN status" lines, newest version first per path.
    const byPath = new Map()
    for (const v of list) {
      if (!byPath.has(v.path)) byPath.set(v.path, [])
      byPath.get(v.path).push(v)
    }
    const out = []
    for (const [p, vs] of byPath) {
      vs.sort((a, b) => b.version - a.version)
      out.push({ path: p, versions: vs })
    }
    out.sort((a, b) => a.path.localeCompare(b.path))
    return out
  }

  function el(tag, cls, txt) {
    const e = document.createElement(tag)
    if (cls) e.className = cls
    if (txt != null) e.textContent = txt
    return e
  }

  function twisty(open) {
    const t = el("span", "twisty", open ? "▾" : "▸")
    return t
  }

  // Render a document line (click → select/detail; right-click/⋯ → doc menu).
  // `scope` is the scope the doc physically lives on (a leaf, or a shared scope).
  function docLine(scope, entry) {
    const node = el("div", "node")
    const row = el("div", "row")
    row.appendChild(el("span", "twisty", " "))
    row.appendChild(el("span", "doc-name", entry.path))
    for (const v of entry.versions) {
      const b = el("span", "badge " + (v.isDeletion ? "deleted" : v.status),
        "v" + v.version + (v.isDeletion ? " ✗" : v.status === "pending" ? " ⏳" : ""))
      row.appendChild(b)
    }
    const active = entry.versions[0] // newest first (versionBadges sorts desc)
    const ctx = { scope, path: entry.path, active, inLeaf: !!scope.isLeaf }
    row.addEventListener("click", () => { selectRow(row); onSelectNode("doc", ctx) })
    attachMenu(row, "doc", ctx)
    node.appendChild(row)
    return node
  }

  // Collapsible group ("shared", "👤 person") holding document lines.
  // When `leafScope` is given, the header selects the leaf (detail) on click and
  // carries the leaf context menu; the twisty toggles expand/collapse.
  function docGroup(label, cls, scope, entries, openByDefault, leafScope) {
    const node = el("div", "node")
    const row = el("div", "row")
    let open = !!openByDefault
    const tw = twisty(open)
    row.appendChild(tw)
    row.appendChild(el("span", cls, label))
    if (entries.length) row.appendChild(el("span", "badge", entries.length + ""))
    if (leafScope) attachMenu(row, "leaf", { scope: leafScope })
    node.appendChild(row)

    const children = el("div", "children")
    children.style.display = open ? "" : "none"
    for (const e of entries) children.appendChild(docLine(scope, e))
    node.appendChild(children)

    const toggle = () => { open = !open; tw.textContent = open ? "▾" : "▸"; children.style.display = open ? "" : "none" }
    tw.addEventListener("click", (ev) => { ev.stopPropagation(); toggle() })
    row.addEventListener("click", () => {
      if (leafScope) { selectRow(row); onSelectNode("leaf", { scope: leafScope }) }
      else toggle() // the "shared" group has no detail — just expand/collapse
    })
    return node
  }

  // Recursively render a scope node.
  function scopeNode(scope, childrenOf, versions) {
    const node = el("div", "node")
    const row = el("div", "row")

    let open = true
    const tw = twisty(open)
    row.appendChild(tw)
    const nameCls = scope.isLeaf ? "leaf-name" : "scope-name"
    const displayName = scope.isLeaf ? "👤 " + short(scope.name) : short(scope.name)
    row.appendChild(el("span", nameCls, displayName))
    if (scope.promoteCeiling) {
      row.appendChild(el("span", "badge ceiling", "⛔ ceiling"))
    }
    if (scope.bootstrap) {
      row.appendChild(el("span", "badge bootstrap", "🚀 bootstrap"))
    }
    if (scope.anonymous) {
      row.appendChild(el("span", "badge anonymous", "🌐 anonymous"))
    }
    // Member/role badges intentionally omitted — membership lives in the scope
    // detail pane now (master/detail).
    if (!scope.isLeaf) attachMenu(row, "scope", { scope })
    node.appendChild(row)

    const kids = childrenOf.get(scope.id) || []
    const subScopes = kids.filter((c) => !c.isLeaf)
    const leaves = kids.filter((c) => c.isLeaf)

    const container = el("div", "children")

    if (scope.isLeaf) {
      // A leaf: just its own documents.
      const entries = versionBadges(group(versions, scope.id))
      for (const e of entries) container.appendChild(docLine(scope, e))
    } else {
      // Shared documents on this scope.
      const sharedEntries = versionBadges(group(versions, scope.id))
      if (sharedEntries.length) {
        container.appendChild(docGroup("shared", "group-name", scope, sharedEntries, false))
      }
      // Sub-scopes (recurse).
      for (const c of subScopes) {
        container.appendChild(scopeNode(c, childrenOf, versions))
      }
      // One node per person's leaf.
      for (const leaf of leaves) {
        const entries = versionBadges(group(versions, leaf.id))
        container.appendChild(docGroup("👤 " + short(leaf.name), "leaf-name", leaf, entries, false, leaf))
      }
    }

    node.appendChild(container)
    container.style.display = open ? "" : "none"

    // Twisty toggles expand/collapse; clicking the name selects the scope and
    // routes to its detail view (master/detail).
    const toggle = () => { open = !open; tw.textContent = open ? "▾" : "▸"; container.style.display = open ? "" : "none" }
    tw.addEventListener("click", (ev) => { ev.stopPropagation(); toggle() })
    row.addEventListener("click", (ev) => {
      ev.stopPropagation()
      if (!scope.isLeaf) { selectRow(row); onSelectNode("scope", { scope }) }
      else toggle()
    })

    return node
  }

  async function render(container) {
    const treeRes = await API.god("tree")
    if (!treeRes.ok) {
      container.textContent = "failed to load tree: " + JSON.stringify(treeRes.body)
      return { scopes: [] }
    }
    const scopes = treeRes.body.scopes
    const root = scopes.find((s) => s.parentId === null)
    if (!root) { container.textContent = "no root scope"; return { scopes } }

    const versRes = await API.god("versions?scope=" + root.id)
    const versions = versRes.ok ? versRes.body.versions : []

    const childrenOf = new Map()
    for (const s of scopes) {
      if (s.parentId == null) continue
      if (!childrenOf.has(s.parentId)) childrenOf.set(s.parentId, [])
      childrenOf.get(s.parentId).push(s)
    }

    container.innerHTML = ""
    container.appendChild(scopeNode(root, childrenOf, versions))
    if (selectedKey) highlightKey(selectedKey) // survive re-render
    return { scopes }
  }

  return {
    render,
    onSelectDoc: (fn) => { onSelectDoc = fn },
    onSelectNode: (fn) => { onSelectNode = fn },
    onNodeMenu: (fn) => { onNodeMenu = fn },
    setNameResolver: (fn) => { nameOf = fn },
    highlightKey,
    keyOf,
  }
})()
