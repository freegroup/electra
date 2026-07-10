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
  let nameOf = (ref) => ref // hash → friendly handle (set by app.js)

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

  // Render a document line (clickable → loads that scope+path into the editor).
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
    row.addEventListener("click", () => onSelectDoc(scope, entry.path))
    node.appendChild(row)
    return node
  }

  // Collapsible group ("shared", "👤 person") holding document lines.
  function docGroup(label, cls, scope, entries, openByDefault) {
    const node = el("div", "node")
    const row = el("div", "row")
    let open = !!openByDefault
    const tw = twisty(open)
    row.appendChild(tw)
    row.appendChild(el("span", cls, label))
    if (entries.length) row.appendChild(el("span", "badge", entries.length + ""))
    node.appendChild(row)

    const children = el("div", "children")
    children.style.display = open ? "" : "none"
    for (const e of entries) children.appendChild(docLine(scope, e))
    node.appendChild(children)

    row.addEventListener("click", () => {
      open = !open
      tw.textContent = open ? "▾" : "▸"
      children.style.display = open ? "" : "none"
    })
    return node
  }

  function memberBadges(row, members, scopeName) {
    for (const m of members) {
      // Skip the scope owner's own membership row — showing "d2e7ab02 admin"
      // right under a scope literally named d2e7ab02 is just noise.
      if (m.personRef === scopeName) continue
      const roles = []
      if (m.isAdmin) roles.push("admin")
      if (m.reviewerScore !== null && m.reviewerScore !== undefined) roles.push("rev:" + m.reviewerScore)
      if (roles.length) {
        row.appendChild(el("span", "badge role", short(m.personRef) + " " + roles.join(",")))
      }
    }
  }

  // Recursively render a scope node.
  function scopeNode(scope, childrenOf, versions, selectedScopeRef) {
    const node = el("div", "node")
    const row = el("div", "row")
    if (scope.id === selectedScopeRef) row.classList.add("selected")

    let open = true
    const tw = twisty(open)
    row.appendChild(tw)
    const nameCls = scope.isLeaf ? "leaf-name" : "scope-name"
    const displayName = scope.isLeaf ? "👤 " + short(scope.name) : short(scope.name)
    row.appendChild(el("span", nameCls, displayName))
    if (!scope.isLeaf) memberBadges(row, scope.members, scope.name)
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
        container.appendChild(scopeNode(c, childrenOf, versions, selectedScopeRef))
      }
      // One node per person's leaf.
      for (const leaf of leaves) {
        const entries = versionBadges(group(versions, leaf.id))
        container.appendChild(docGroup("👤 " + short(leaf.name), "leaf-name", leaf, entries, false))
      }
    }

    node.appendChild(container)
    container.style.display = open ? "" : "none"

    // Clicking a scope only expands/collapses it — selecting the working scope
    // is done in card 1's dropdown, so the tree stays a pure overview.
    row.addEventListener("click", (ev) => {
      open = !open
      tw.textContent = open ? "▾" : "▸"
      container.style.display = open ? "" : "none"
      ev.stopPropagation()
    })

    return node
  }

  async function render(container, selectedScopeRef) {
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
    container.appendChild(scopeNode(root, childrenOf, versions, selectedScopeRef))
    return { scopes }
  }

  return {
    render,
    onSelectDoc: (fn) => { onSelectDoc = fn },
    setNameResolver: (fn) => { nameOf = fn },
  }
})()
