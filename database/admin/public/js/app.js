// app.js — explorer wiring. Plain DOM, no framework.
//
// Model: the left tree is the map; right-clicking (or the ⋯ button) on a node
// opens a context menu whose entries open dialogs. The right pane is just a
// document editor bound to an explicit { scopeId, personaHandle } context —
// writing always names a scope (a new doc has no origin to infer one from).

;(function () {
  const $ = (id) => document.getElementById(id)

  // ---- state -------------------------------------------------------------
  const state = {
    scopes: [],         // flat list from the last tree render
    personas: [],       // known persona handles for the persona bar
    hashToHandle: {},   // personRef (SHA-256) → friendly handle, for display
    // The editor's bound context. scopeId = the scope we write "in"; persona =
    // the handle we act as for THIS document (may differ from the top bar when
    // editing inside someone's leaf).
    editing: null,      // { scopeId, scopeName, personaHandle, path } | null
  }

  // Known handles the admin recognizes. The DB only stores the one-way hash
  // (personRef = SHA-256(handle)); we hash these locally so the tree can show
  // real names. Persisted in localStorage. Nothing is sent to the DB.
  const SEED_HANDLES = ["admin@electra.academy", "test-root@electra.local", "anna", "bob", "zoe"]
  function loadKnownHandles() {
    let saved = []
    try { saved = JSON.parse(localStorage.getItem("db-admin-handles") || "[]") } catch {}
    return [...new Set([...SEED_HANDLES, ...saved])]
  }
  function saveKnownHandle(handle) {
    let saved = []
    try { saved = JSON.parse(localStorage.getItem("db-admin-handles") || "[]") } catch {}
    if (!saved.includes(handle)) { saved.push(handle); localStorage.setItem("db-admin-handles", JSON.stringify(saved)) }
  }
  async function resolveKnownHandles() {
    for (const h of loadKnownHandles()) state.hashToHandle[await API.personRef(h)] = h
  }
  function rememberHandle(handle, hash) {
    state.hashToHandle[hash] = handle
    if (!state.personas.includes(handle)) state.personas.push(handle)
    saveKnownHandle(handle)
  }
  const short = (ref) => (ref && ref.length > 12 ? ref.slice(0, 8) + "…" : ref)
  const nameOf = (ref) => state.hashToHandle[ref] || ref

  // ---- logging -----------------------------------------------------------
  function log(msg, kind) {
    const line = UI.el("div", kind)
    line.textContent = `[${new Date().toISOString().slice(11, 19)}] ${msg}`
    $("log").prepend(line)
  }
  function logResult(label, r) { log(`${label} — ${summarize(r)}`, r.ok ? "ok" : "err") }
  function summarize(r) {
    const b = r.body
    if (!r.ok) {
      const code = b && b.error && b.error.code
      const msg = b && b.error && b.error.message
      return `✗ ${r.status} ${code || ""}${msg ? " — " + msg : ""}`.trim()
    }
    if (b && b.version != null && b.status) return `✓ saved v${b.version} (${b.status})`
    if (b && b.status && b.scopeRef) return `✓ ${b.status}${b.version ? " v" + b.version : ""} on scope ${b.scopeRef}`
    if (b && b.publicId) return `✓ published → /database/public/${b.publicId}`
    if (b && Array.isArray(b.distributions)) return "✓ distributed: " + b.distributions.map((d) => `${d.targetScopeRef}:${d.status}`).join(", ")
    if (b && typeof b.deleted === "number") return `✓ removed ${b.deleted} version(s)`
    if (b && b.committed !== undefined) return `✓ ${b.committed ? "approved & committed" : "vote recorded (still pending)"}`
    if (b && b.rejected) return "✓ rejected"
    if (b && b.moved !== undefined) return `✓ moved ${b.moved}`
    return `✓ ${r.status}`
  }

  // ---- persona bar -------------------------------------------------------
  function refreshPersonaSelect() {
    const sel = $("persona")
    const cur = API.persona.email
    sel.innerHTML = ""
    for (const p of state.personas) {
      const o = document.createElement("option"); o.value = p; o.textContent = p; sel.appendChild(o)
    }
    if (state.personas.includes(cur)) sel.value = cur
  }
  async function addPersona(handle, makeActive = true) {
    if (!handle) return
    if (!state.personas.includes(handle)) state.personas.push(handle)
    if (makeActive) API.persona.email = handle
    rememberHandle(handle, await API.personRef(handle))
    refreshPersonaSelect()
  }

  // ---- helpers -----------------------------------------------------------
  const sanitizePath = (p) => String(p || "").trim().replace(/\/+/g, "/").replace(/^\/|\/$/g, "")
  function scopePath(scope) {
    const byId = new Map(state.scopes.map((s) => [s.id, s]))
    const parts = []
    let cur = scope
    while (cur) { parts.unshift(nameOf(cur.name)); cur = cur.parentId ? byId.get(cur.parentId) : null }
    return parts.join("/")
  }
  // Non-leaf scopes, as { id, path } sorted — for pickers.
  function scopeChoices() {
    return state.scopes.filter((s) => !s.isLeaf)
      .map((s) => ({ id: s.id, path: scopePath(s) }))
      .sort((a, b) => a.path.localeCompare(b.path))
  }

  // Scopes a persona is an EXPLICIT member of (can write in). The god-view tree
  // carries every scope's members; a person may write wherever they hold an
  // is_member row. Returns [{ id, path }] sorted, always including `include`.
  async function memberScopes(personaHandle, include) {
    const ref = await API.personRef(personaHandle)
    const ids = new Set()
    for (const s of state.scopes) {
      if (s.isLeaf) continue
      if ((s.members || []).some((m) => m.personRef === ref && m.isMember)) ids.add(s.id)
    }
    if (include) ids.add(include)
    return [...ids]
      .map((id) => state.scopes.find((s) => s.id === id))
      .filter(Boolean)
      .map((s) => ({ id: s.id, path: scopePath(s) }))
      .sort((a, b) => a.path.localeCompare(b.path))
  }

  // ---- tree --------------------------------------------------------------
  async function reloadTree() {
    const { scopes } = await Tree.render($("tree"))
    state.scopes = scopes
    const refs = new Set(state.personas)
    for (const s of scopes) for (const m of s.members) refs.add(m.personRef)
    state.personas = [...refs]
    refreshPersonaSelect()
  }
  async function afterMutation() { await reloadTree() }

  // Inspect (read-only, god-view) when a doc row is left-clicked.
  Tree.onSelectDoc(async (scope, path) => {
    const r = await API.god(`doc?scope=${scope.id}&path=${encodeURIComponent(path)}`)
    if (!r.ok) { logResult("inspect", r); return }
    const doc = r.body
    // Bind the editor: if the doc lives in a leaf, we edit as its owner in the
    // parent scope; if it's a shared doc, we edit as the current persona in
    // that scope. Either way the write target is explicit.
    if (scope.isLeaf) {
      const owner = nameOf(scope.name)
      await bindEditor({ scopeId: scope.parentId, personaHandle: owner, path })
    } else {
      await bindEditor({ scopeId: scope.id, personaHandle: API.persona.email, path })
    }
    Doc.clear()
    Doc.fill("doc-data", "doc-meta", doc)
    log(`inspect ${path} @ scope ${scope.id} v${doc.version} — read-only god-view`, "ok")
  })

  // ---- editor binding ----------------------------------------------------
  // Binds the editor to { scopeId, personaHandle, path } and fills the
  // "save in" selector with every scope the persona may write in. The passed
  // scopeId is pre-selected but the user may redirect the save to any other
  // membership scope (e.g. fix a school doc but land it in a task-force leaf).
  async function bindEditor({ scopeId, personaHandle, path }) {
    const persona = personaHandle || API.persona.email
    const choices = await memberScopes(persona, scopeId)
    const sel = $("edit-scope")
    sel.innerHTML = ""
    for (const c of choices) {
      const o = document.createElement("option"); o.value = c.id; o.textContent = c.path
      sel.appendChild(o)
    }
    if (scopeId) sel.value = scopeId

    state.editing = { personaHandle: persona, path: path || "" }
    $("doc-path").value = state.editing.path
    $("edit-persona").textContent = persona
    $("edit-target").classList.remove("hidden")
    $("editor").classList.remove("hidden")
    updateEditContext()
  }
  function currentEditScopeId() {
    return $("edit-scope").value || null
  }
  function updateEditContext() {
    if (!state.editing) return
    const id = currentEditScopeId()
    const path = state.editing.path || "(new)"
    $("edit-context").textContent =
      `editing "${path}" — Save lands in ${scopePathById(id)} as ${state.editing.personaHandle}`
  }
  // Run a call as a specific persona (reflected in the top bar).
  function actAs(handle) {
    if (handle && handle !== API.persona.email) { API.persona.email = handle; refreshPersonaSelect() }
  }

  async function saveDoc() {
    if (!state.editing) { log("open or create a document first", "err"); return }
    const scopeId = currentEditScopeId()
    if (!scopeId) { log("choose a scope to save in", "err"); return }
    const path = sanitizePath($("doc-path").value)
    if (!path) { log("enter a document path", "err"); return }
    let data, meta
    try { data = Doc.parseEditor("doc-data"); meta = Doc.parseEditor("doc-meta") }
    catch (e) { log(e.message, "err"); return }
    actAs(state.editing.personaHandle)
    const r = await API.call("PUT", `scopes/${scopeId}/docs?path=${encodeURIComponent(path)}`,
      Doc.putBody(data, meta))
    logResult(`save ${path} → ${scopePathById(scopeId)}`, r)
    if (r.ok) { Doc.setCurrent(r.body); state.editing.path = path }
    await afterMutation()
  }

  // ---- document actions (explicit context) -------------------------------
  // Each takes { scopeId, path, persona } so menus can act on any node.
  async function actPromote({ scopeId, path, persona, active }) {
    actAs(persona)
    const ok = await UI.dialog({
      title: "Promote", okLabel: "Promote",
      fields: [
        { key: "scope", label: "from scope", type: "static", value: scopePathById(scopeId) },
        { key: "path", label: "path", type: "static", value: path },
        { key: "as", label: "as", type: "static", value: persona },
        { key: "v", label: "version", type: "static", value: active ? active.version : "(current)" },
      ],
    })
    if (!ok) return
    const body = active && active.version != null ? { version: active.version } : {}
    logResult(`promote ${path}`, await API.call("POST", `scopes/${scopeId}/docs/promote?path=${encodeURIComponent(path)}`, body))
    await afterMutation()
  }

  async function actDistribute({ scopeId, path, persona, active }) {
    actAs(persona)
    const list = UI.el("div", "check-list")
    const boxes = []
    for (const c of scopeChoices()) {
      if (c.id === scopeId) continue
      const row = UI.el("label", "check-row")
      const cb = document.createElement("input"); cb.type = "checkbox"; cb.value = c.id
      row.append(cb, document.createTextNode(" " + c.path))
      list.appendChild(row); boxes.push(cb)
    }
    const res = await UI.dialog({
      title: `Distribute ${path}`, okLabel: "Distribute",
      fields: [{ key: "targets", label: "to scopes", type: "custom", el: list,
        get: () => boxes.filter((b) => b.checked).map((b) => b.value) }],
    })
    if (!res) return
    const targetScopeRefs = res.targets
    if (!targetScopeRefs.length) { log("pick at least one target scope", "err"); return }
    const body = { path, targetScopeRefs }
    if (active && active.version != null) body.version = active.version
    logResult(`distribute ${path}`, await API.call("POST", `scopes/${scopeId}/docs/distribute`, body))
    await afterMutation()
  }

  async function actRename({ scopeId, path, persona, active }) {
    actAs(persona)
    const res = await UI.dialog({
      title: `Rename ${path}`, okLabel: "Rename",
      fields: [{ key: "newPath", label: "new path", type: "text", value: path }],
    })
    if (!res) return
    const newPath = sanitizePath(res.newPath)
    if (!newPath || newPath === path) return
    const body = { path, newPath }
    if (active && active.version != null) body.version = active.version
    let r = await API.call("POST", `scopes/${scopeId}/docs/rename`, body)
    if (r.ok || r.status !== 404) { logResult(`rename ${path}`, r); await afterMutation(); return }
    // Inherited doc: copy to new path + tombstone old (UI-level move).
    log("inherited doc — renaming via copy + local tombstone", "ok")
    const read = await API.call("GET", `scopes/${scopeId}/docs?path=${encodeURIComponent(path)}`)
    if (!read.ok) { logResult("rename/read", read); return }
    const putR = await API.call("PUT", `scopes/${scopeId}/docs?path=${encodeURIComponent(newPath)}`,
      { data: read.body.data, meta: read.body.meta })
    if (!putR.ok) { logResult("rename/copy", putR); return }
    logResult(`rename (copy+tombstone) → ${newPath}`,
      await API.call("DELETE", `scopes/${scopeId}/docs?path=${encodeURIComponent(path)}`, {}))
    await afterMutation()
  }

  async function actDelete({ scopeId, path, persona, active }) {
    actAs(persona)
    if (!(await UI.confirm({ title: "Delete", message: `Delete "${path}" (as ${persona})? A local tombstone hides it from this persona; promote it to remove it for the group.`, okLabel: "Delete", danger: true }))) return
    const body = active && active.version != null ? { version: active.version } : {}
    logResult(`delete ${path}`, await API.call("DELETE", `scopes/${scopeId}/docs?path=${encodeURIComponent(path)}`, body))
    await afterMutation()
  }

  async function actRevert({ scopeId, path, persona }) {
    actAs(persona)
    if (!(await UI.confirm({ title: "Revert", message: `Physically drop ALL of ${persona}'s local versions of "${path}"? This cannot be undone; published links from these versions stop working.`, okLabel: "Revert", danger: true }))) return
    logResult(`revert ${path}`, await API.call("POST", `scopes/${scopeId}/docs/revert`, { path }))
    await afterMutation()
  }

  async function actPublish({ scopeId, path, persona }) {
    actAs(persona)
    const r = await API.call("POST", `scopes/${scopeId}/docs/publish`, { path })
    logResult(`publish ${path}`, r)
    if (r.ok && r.body.publicId) {
      await UI.dialog({ title: "Published", okLabel: "OK", cancelLabel: "Close",
        fields: [{ key: "url", label: "public URL", type: "static", value: `/database/public/${r.body.publicId}` }] })
    }
    await afterMutation()
  }
  async function actUnpublish({ scopeId, path, persona }) {
    actAs(persona)
    logResult(`unpublish ${path}`, await API.call("POST", `scopes/${scopeId}/docs/unpublish`, { path }))
    await afterMutation()
  }

  async function actHistory({ scopeId, path, persona }) {
    actAs(persona)
    const r = await API.call("GET", `scopes/${scopeId}/docs/history?path=${encodeURIComponent(path)}`)
    if (!r.ok) { logResult("history", r); return }
    const tbl = UI.el("div", "hist")
    for (const h of r.body.history) {
      const votes = (h.votes || []).map((v) => `${short(v.voter)}:${v.kind}`).join(",")
      const row = UI.el("div", "hist-row",
        `v${h.version}  ${h.status}${h.isDeletion ? " ✗" : ""}  by ${short(h.author)}  @ ${h.scope}${votes ? "  [" + votes + "]" : ""}`)
      tbl.appendChild(row)
    }
    if (!r.body.history.length) tbl.appendChild(UI.el("div", "empty", "no history"))
    await UI.dialog({ title: `History — ${path}`, okLabel: "Close", cancelLabel: "Close", body: tbl })
  }

  function scopePathById(id) {
    const s = state.scopes.find((x) => x.id === id)
    return s ? scopePath(s) : String(id)
  }

  // ---- new document ------------------------------------------------------
  // scope + persona + path chosen explicitly (a new doc has no origin).
  async function newDocument({ scopeId, persona }) {
    const sel = document.createElement("select")
    for (const c of scopeChoices()) {
      const o = document.createElement("option"); o.value = c.id; o.textContent = c.path; sel.appendChild(o)
    }
    if (scopeId) sel.value = scopeId
    const res = await UI.dialog({
      title: "New document", okLabel: "Create & edit",
      fields: [
        { key: "scopeId", label: "in scope", type: "custom", el: sel, get: () => sel.value },
        { key: "persona", label: "as persona", type: "text", value: persona || API.persona.email },
        { key: "path", label: "path", type: "text", placeholder: "e.g. math/quadratic.json" },
      ],
    })
    if (!res) return
    const path = sanitizePath(res.path)
    if (!path) { log("enter a path for the new document", "err"); return }
    await addPersona(res.persona, false)
    await bindEditor({ scopeId: res.scopeId, personaHandle: res.persona, path })
    Doc.clear()
    document.getElementById("doc-data").value = "{}"
    document.getElementById("doc-meta").value = "{}"
    log(`new document ${path} in ${scopePathById(res.scopeId)} as ${res.persona} — edit + Save`, "ok")
  }

  // ---- scope admin dialogs ----------------------------------------------
  async function scopeProperties(scope) {
    // Fetch fresh metadata + build a members/reviewers editor.
    const body = UI.el("div", "props")
    body.appendChild(UI.el("div", "props-line", `path: ${scopePath(scope)}`))

    const scoreInput = document.createElement("input")
    scoreInput.type = "number"; scoreInput.min = 0; scoreInput.value = scope.requiredApprovalScore || 0
    const scoreRow = UI.el("div", "form-row")
    scoreRow.append(UI.el("label", "form-label", "required approval score"), scoreInput)
    body.appendChild(scoreRow)

    const ceil = document.createElement("input")
    ceil.type = "checkbox"; ceil.checked = !!scope.promoteCeiling
    const ceilRow = UI.el("div", "form-row")
    ceilRow.append(UI.el("label", "form-label", "promote ceiling"), ceil)
    body.appendChild(ceilRow)

    // Members / reviewers / admins live editors (each row: handle + remove).
    body.appendChild(rolesEditor(scope))

    const res = await UI.dialog({ title: `Scope — ${scopePath(scope)}`, okLabel: "Save config", body })
    if (!res) return
    const patch = {}
    if (Number(scoreInput.value) !== (scope.requiredApprovalScore || 0)) patch.requiredApprovalScore = Number(scoreInput.value)
    if (ceil.checked !== !!scope.promoteCeiling) patch.promoteCeiling = ceil.checked
    if (Object.keys(patch).length) logResult("scope config", await API.call("PATCH", `scopes/${scope.id}`, patch))
    await afterMutation()
  }

  // A compact members+reviewers+admins editor with add controls. Changes apply
  // immediately (each add/remove is its own call) so the dialog stays simple.
  function rolesEditor(scope) {
    const wrap = UI.el("div", "roles-editor")
    const render = () => {
      wrap.innerHTML = ""
      wrap.appendChild(UI.el("div", "props-line", "members / roles"))
      for (const m of scope.members) {
        if (m.personRef === scope.name) continue // skip the scope's own row
        const row = UI.el("div", "role-row")
        const roles = []
        if (m.isMember) roles.push("member")
        if (m.isAdmin) roles.push("admin")
        if (m.reviewerScore != null) roles.push("rev:" + m.reviewerScore)
        row.appendChild(UI.el("span", "role-name", `${nameOf(m.personRef)}  [${roles.join(", ") || "—"}]`))
        const rm = UI.el("button", "link", "remove member")
        rm.onclick = async () => {
          logResult("remove member", await API.call("DELETE", `scopes/${scope.id}/members/${m.personRef}`))
          await afterMutation(); const fresh = state.scopes.find((s) => s.id === scope.id); if (fresh) { scope.members = fresh.members; render() }
        }
        row.appendChild(rm)
        wrap.appendChild(row)
      }
      // Add controls.
      const add = UI.el("div", "role-add")
      const handle = document.createElement("input"); handle.placeholder = "persona handle"
      const asMember = UI.el("button", null, "add member")
      const asReviewer = UI.el("button", null, "add reviewer(5)")
      asMember.onclick = async () => {
        const h = handle.value.trim(); if (!h) return
        const ref = await API.personRef(h); rememberHandle(h, ref)
        logResult(`add member ${h}`, await API.call("POST", `scopes/${scope.id}/members`, { personRef: ref }))
        await refreshAfterRole(scope); render()
      }
      asReviewer.onclick = async () => {
        const h = handle.value.trim(); if (!h) return
        const ref = await API.personRef(h); rememberHandle(h, ref)
        logResult(`add reviewer ${h}`, await API.call("POST", `scopes/${scope.id}/reviewers`, { personRef: ref, score: 5 }))
        await refreshAfterRole(scope); render()
      }
      add.append(handle, asMember, asReviewer)
      wrap.appendChild(add)
    }
    render()
    return wrap
  }
  async function refreshAfterRole(scope) {
    await reloadTree()
    const fresh = state.scopes.find((s) => s.id === scope.id)
    if (fresh) scope.members = fresh.members
  }

  async function addSubScope(scope) {
    const res = await UI.dialog({
      title: `New sub-scope under ${scopePath(scope)}`, okLabel: "Create",
      fields: [
        { key: "name", label: "name", type: "text", placeholder: "e.g. klasse8a" },
        { key: "requiredApprovalScore", label: "required approval score", type: "number", value: 0, min: 0 },
        { key: "promoteCeiling", label: "promote ceiling", type: "checkbox", value: false },
      ],
    })
    if (!res || !res.name) return
    logResult(`create sub-scope ${res.name}`, await API.call("POST", `scopes/${scope.id}/scopes`, {
      name: res.name, requiredApprovalScore: res.requiredApprovalScore, promoteCeiling: res.promoteCeiling,
    }))
    await afterMutation()
  }

  async function deleteScope(scope) {
    if (!(await UI.confirm({ title: "Delete scope", message: `Delete scope "${scopePath(scope)}"? Only works if it has no sub-scopes/leaves.`, okLabel: "Delete", danger: true }))) return
    logResult(`delete scope ${scope.name}`, await API.call("DELETE", `scopes/${scope.id}`))
    await afterMutation()
  }

  async function reviewQueue(scope) {
    // Any persona that reviews this scope can act; use the current persona.
    const r = await API.call("GET", `scopes/${scope.id}/pending`)
    if (!r.ok) { logResult("review", r); return }
    const list = UI.el("div", "pending")
    for (const p of r.body.pending) {
      const row = UI.el("div", "pending-item")
      row.appendChild(UI.el("span", "grow", `${p.path} v${p.version} by ${short(p.author)}${p.isDeletion ? " (delete)" : ""}`))
      const ok = UI.el("button", null, "approve")
      ok.onclick = async () => {
        logResult("approve", await API.call("POST", `scopes/${scope.id}/pending/approve`, { path: p.path, version: p.version }))
        await afterMutation(); UI.closeMenu()
      }
      const no = UI.el("button", "danger", "reject")
      no.onclick = async () => {
        const rr = await UI.dialog({ title: "Reject", okLabel: "Reject", fields: [{ key: "reason", label: "reason", type: "text" }] })
        if (!rr) return
        logResult("reject", await API.call("POST", `scopes/${scope.id}/pending/reject`, { path: p.path, version: p.version, reason: rr.reason || undefined }))
        await afterMutation()
      }
      row.append(ok, no)
      list.appendChild(row)
    }
    if (!r.body.pending.length) list.appendChild(UI.el("div", "empty", "nothing pending"))
    await UI.dialog({ title: `Review — ${scopePath(scope)}`, okLabel: "Close", cancelLabel: "Close", body: list })
  }

  // ---- node menus --------------------------------------------------------
  Tree.onNodeMenu((kind, ctx, x, y) => {
    if (kind === "scope") return scopeMenu(ctx.scope, x, y)
    if (kind === "leaf") return leafMenu(ctx.scope, x, y)
    if (kind === "doc") return docMenu(ctx, x, y)
  })

  function scopeMenu(scope, x, y) {
    UI.menu(x, y, [
      { label: "New document here…", onClick: () => newDocument({ scopeId: scope.id, persona: API.persona.email }) },
      { label: "Scope properties…", onClick: () => scopeProperties(scope) },
      { label: "Add sub-scope…", onClick: () => addSubScope(scope) },
      { label: "Review queue…", onClick: () => reviewQueue(scope) },
      null,
      { label: "Delete scope", danger: true, onClick: () => deleteScope(scope) },
    ])
  }

  function leafMenu(leaf, x, y) {
    const owner = nameOf(leaf.name)
    const known = state.hashToHandle[leaf.name] !== undefined
    UI.menu(x, y, [
      known
        ? { label: `New document as ${owner}…`, onClick: () => newDocument({ scopeId: leaf.parentId, persona: owner }) }
        : { label: "Unknown persona — add its handle to act as them", disabled: true },
    ])
  }

  function docMenu(ctx, x, y) {
    const { scope, path, active, inLeaf } = ctx
    if (!inLeaf) {
      // A shared doc — you can inspect/open and view history; acting on it needs
      // your own leaf version first, which Open→edit→Save creates.
      return UI.menu(x, y, [
        { label: "Open (edit → creates your copy)", onClick: () => openShared(scope, path) },
        { label: "History…", onClick: () => actHistory({ scopeId: scope.id, path, persona: API.persona.email }) },
      ])
    }
    const owner = nameOf(scope.name)
    const known = state.hashToHandle[scope.name] !== undefined
    if (!known) {
      return UI.menu(x, y, [{ label: "Unknown persona — add its handle to act on this leaf", disabled: true }])
    }
    const base = { scopeId: scope.parentId, path, persona: owner, active }
    UI.menu(x, y, [
      { label: "Open", onClick: () => openLeafDoc(scope, path, owner) },
      { label: "Promote…", onClick: () => actPromote(base) },
      { label: "Distribute…", onClick: () => actDistribute(base) },
      { label: "Rename…", onClick: () => actRename(base) },
      { label: "History…", onClick: () => actHistory(base) },
      null,
      { label: "Publish", onClick: () => actPublish(base) },
      { label: "Unpublish", onClick: () => actUnpublish(base) },
      null,
      { label: "Revert", danger: true, onClick: () => actRevert(base) },
      { label: "Delete", danger: true, onClick: () => actDelete(base) },
    ])
  }

  // Open helpers load content into the editor bound to the right context.
  async function openLeafDoc(leafScope, path, owner) {
    const r = await API.god(`doc?scope=${leafScope.id}&path=${encodeURIComponent(path)}`)
    if (!r.ok) { logResult("open", r); return }
    actAs(owner)
    await bindEditor({ scopeId: leafScope.parentId, personaHandle: owner, path })
    Doc.setCurrent(r.body)
    Doc.fill("doc-data", "doc-meta", r.body)
  }
  async function openShared(scope, path) {
    const r = await API.god(`doc?scope=${scope.id}&path=${encodeURIComponent(path)}`)
    if (!r.ok) { logResult("open", r); return }
    await bindEditor({ scopeId: scope.id, personaHandle: API.persona.email, path })
    Doc.clear() // editing a shared doc starts a fresh leaf copy on Save
    Doc.fill("doc-data", "doc-meta", r.body)
  }

  // ---- health ------------------------------------------------------------
  async function checkHealth() {
    const badge = $("db-status")
    try {
      const r = await fetch("api/health"); const j = await r.json()
      badge.textContent = "DB: " + (j.status || "?"); badge.className = "status " + (r.ok ? "ok" : "bad")
    } catch { badge.textContent = "DB: unreachable"; badge.className = "status bad" }
  }

  // ---- init --------------------------------------------------------------
  function init() {
    $("persona").addEventListener("change", (e) => { API.persona.email = e.target.value })
    $("role").addEventListener("change", (e) => { API.persona.role = e.target.value })
    $("persona-new").addEventListener("keydown", async (e) => {
      if (e.key === "Enter") { const h = e.target.value.trim(); e.target.value = ""; if (h) { await addPersona(h); await reloadTree() } }
    })
    $("btn-save").onclick = saveDoc
    $("edit-scope").addEventListener("change", updateEditContext)
    $("reload-tree").onclick = reloadTree
    $("clear-log").onclick = () => { $("log").innerHTML = "" }

    Tree.setNameResolver((ref) => state.hashToHandle[ref] || ref)
    addPersona("admin@electra.academy")
    checkHealth()
    resolveKnownHandles().then(reloadTree)
  }
  document.addEventListener("DOMContentLoaded", init)
})()
