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
  async function afterMutation() { await reloadTree(); await routeHash() }

  // ---- deep links: the URL hash is the source of truth for selection -------
  //   #scope/<id>   #leaf/<id>   #doc/<scopeId>/<encodedPath>
  // Left-clicking a node sets the hash; the hashchange handler renders detail
  // and highlights the tree — so tree and detail can never drift, and any
  // node is bookmarkable.
  function keyForCtx(kind, ctx) {
    if (kind === "scope" || kind === "leaf") return `${kind}/${ctx.scope.id}`
    if (kind === "doc") return `doc/${ctx.scope.id}/${encodeURIComponent(ctx.path)}`
    return null
  }
  function navigate(kind, ctx) {
    const key = keyForCtx(kind, ctx)
    if (key) location.hash = key
  }
  // Rebuild a render ctx from a hash key using the current tree state.
  function ctxFromHash() {
    const raw = location.hash.replace(/^#/, "")
    if (!raw) return null
    const parts = raw.split("/")
    const kind = parts[0]
    if (kind === "scope" || kind === "leaf") {
      const scope = state.scopes.find((s) => s.id === parts[1])
      return scope ? { kind, ctx: { scope } } : null
    }
    if (kind === "doc") {
      const scope = state.scopes.find((s) => s.id === parts[1])
      const path = decodeURIComponent(parts.slice(2).join("/"))
      if (!scope) return null
      return { kind, ctx: { scope, path, active: null, inLeaf: !!scope.isLeaf } }
    }
    return null
  }
  async function routeHash() {
    const sel = ctxFromHash()
    if (!sel) { Detail.clear(); Tree.highlightKey(null); return }
    Tree.highlightKey(keyForCtx(sel.kind, sel.ctx))
    await Detail.show(sel.kind, sel.ctx)
  }

  // Left-click a node → set the hash (routeHash does the rest).
  Tree.onSelectNode((kind, ctx) => navigate(kind, ctx))

  // Run a call as a specific persona (reflected in the top bar).
  function actAs(handle) {
    if (handle && handle !== API.persona.email) { API.persona.email = handle; refreshPersonaSelect() }
  }

  // =======================================================================
  // DETAIL RENDERERS — one per node kind. Registered in init().
  // =======================================================================

  // ---- doc detail: the editor + per-doc action row -----------------------
  // ctx: { scope, path, active, inLeaf }. A leaf doc is edited/acted-on as its
  // owner; a shared doc is edited as the current persona (Save forks a copy).
  async function renderDocDetail(container, ctx) {
    const { scope, path, inLeaf } = ctx
    const owner = inLeaf ? nameOf(scope.name) : API.persona.email
    const knownOwner = !inLeaf || state.hashToHandle[scope.name] !== undefined
    const operatingScopeId = inLeaf ? scope.parentId : scope.id

    if (inLeaf) actAs(owner)

    // Load the exact version (god-view, read-only fetch of content).
    const godScope = scope.id
    const r = await API.god(`doc?scope=${godScope}&path=${encodeURIComponent(path)}`)
    const doc = r.ok ? r.body : { data: {}, meta: {}, version: "?", status: "?" }

    Detail.setTitle(`Document: ${path}`)

    // "visible for" = the scope whose members may see this version. This IS the
    // permission (not a storage location); the write lands in the persona's
    // leaf under it. Defaults to the current scope; changeable to any scope the
    // persona is a member of (e.g. steer a fix into a task-force scope).
    const choices = await memberScopes(owner, operatingScopeId)
    const saveSel = document.createElement("select")
    for (const c of choices) {
      const o = document.createElement("option"); o.value = c.id; o.textContent = c.path; saveSel.appendChild(o)
    }
    saveSel.value = operatingScopeId
    const tRow = UI.el("div", "form-row")
    tRow.append(UI.el("label", "form-label", "visible for"), saveSel)
    container.appendChild(tRow)
    // (persona is shown in the top bar; a leaf doc auto-switches it to the owner)

    // path + editors (reuse Doc IDs so Doc.* helpers keep working).
    const pathInput = document.createElement("input"); pathInput.id = "doc-path"; pathInput.value = path
    const pRow = UI.el("div", "form-row"); pRow.append(UI.el("label", "form-label", "path"), pathInput)
    container.appendChild(pRow)

    const editors = UI.el("div", "editors")
    const dWrap = UI.el("div", "editor"); dWrap.appendChild(UI.el("div", "editor-label", "data"))
    const dTa = document.createElement("textarea"); dTa.id = "doc-data"; dTa.spellcheck = false
    dWrap.appendChild(dTa)
    const mWrap = UI.el("div", "editor"); mWrap.appendChild(UI.el("div", "editor-label", "meta"))
    const mTa = document.createElement("textarea"); mTa.id = "doc-meta"; mTa.spellcheck = false
    mWrap.appendChild(mTa)
    editors.append(dWrap, mWrap)
    container.appendChild(editors)
    Doc.setCurrent(inLeaf ? doc : null) // shared edit forks; leaf edit is concurrency-checked
    Doc.fill("doc-data", "doc-meta", doc)

    // action toolbar (under the header)
    const save = UI.el("button", "primary", "Save")
    save.onclick = () => saveDocFrom(saveSel.value, owner)
    const buttons = [save]
    const base = { scopeId: operatingScopeId, path, persona: owner, active: ctx.active }
    if (inLeaf && knownOwner) {
      buttons.push(
        actionBtn("Promote", () => actPromote(base)),
        actionBtn("Distribute", () => actDistribute(base)),
        actionBtn("Rename", () => actRename(base)),
        actionBtn("Publish", () => actPublish(base)),
        actionBtn("Unpublish", () => actUnpublish(base)),
        actionBtn("Revert", () => actRevert(base), true),
        actionBtn("Delete", () => actDelete(base), true),
      )
    } else if (!inLeaf) {
      // Shared/inherited doc: Save forks a copy; Delete = tombstone + promote.
      buttons.push(actionBtn("Delete", () => actDelete(base), true))
    }
    buttons.push(actionBtn("History", () => actHistory(base)))
    Detail.setActions(buttons)

    if (inLeaf && !knownOwner) {
      container.appendChild(UI.el("div", "detail-note",
        "Unknown persona — add this leaf owner's handle (top bar) to act as them."))
    }
  }
  function actionBtn(label, fn, danger) {
    const b = UI.el("button", danger ? "danger" : null, label)
    b.onclick = fn
    return b
  }

  async function saveDocFrom(scopeId, persona) {
    if (!scopeId) { log("choose a scope to save in", "err"); return }
    const path = sanitizePath($("doc-path").value)
    if (!path) { log("enter a document path", "err"); return }
    let data, meta
    try { data = Doc.parseEditor("doc-data"); meta = Doc.parseEditor("doc-meta") }
    catch (e) { log(e.message, "err"); return }
    actAs(persona)
    const r = await API.call("PUT", `scopes/${scopeId}/docs?path=${encodeURIComponent(path)}`, Doc.putBody(data, meta))
    logResult(`save ${path} → ${scopePathById(scopeId)}`, r)
    if (r.ok) {
      Doc.setCurrent(r.body)
      await reloadTree()
      // The write landed in the persona's leaf under scopeId — point the deep
      // link at that leaf doc so tree + detail select the row that now exists.
      const ref = await API.personRef(persona)
      const leaf = state.scopes.find((s) => s.parentId === scopeId && s.name === ref)
      if (leaf) { navigate("doc", { scope: leaf, path }); return }
    }
    await afterMutation()
  }

  // ---- leaf detail: owner + their docs -----------------------------------
  async function renderLeafDetail(container, { scope }) {
    const owner = nameOf(scope.name)
    const known = state.hashToHandle[scope.name] !== undefined
    Detail.setTitle(`Person: ${owner}`)
    container.appendChild(UI.el("div", "detail-sub", `personal leaf under ${scopePathById(scope.parentId)}`))

    const vr = await API.god("versions?scope=" + scope.id)
    const versions = vr.ok ? vr.body.versions : []
    const byPath = new Map()
    for (const v of versions) { if (!byPath.has(v.path)) byPath.set(v.path, v) }
    const listWrap = UI.el("div", "detail-section")
    listWrap.appendChild(UI.el("div", "props-line", "documents"))
    if (!byPath.size) listWrap.appendChild(UI.el("div", "empty", "no documents"))
    for (const [p, v] of byPath) {
      const row = UI.el("div", "leaf-doc")
      const link = UI.el("span", "doc-link", `${p}  v${v.version} ${v.status}`)
      link.onclick = () => navigate("doc", { scope, path: p })
      row.appendChild(link)
      listWrap.appendChild(row)
    }
    container.appendChild(listWrap)

    if (known) Detail.setActions([actionBtn("Add document", () => newDocument({ scopeId: scope.parentId, persona: owner }))])
    else container.appendChild(UI.el("div", "detail-note", "Unknown persona — add its handle (top bar) to act as them."))
  }

  // ---- scope detail: editable properties + roles + actions ---------------
  async function renderScopeDetail(container, { scope }) {
    // Use the freshest copy from state (afterMutation reloads the tree).
    scope = state.scopes.find((s) => s.id === scope.id) || scope
    Detail.setTitle(`Scope: ${scopePath(scope)}`)

    // config: name + score + ceiling (Save lives in the toolbar)
    const cfg = UI.el("div", "detail-section")
    const nameInput = document.createElement("input")
    nameInput.type = "text"; nameInput.value = scope.name
    const nRow = UI.el("div", "form-row"); nRow.append(UI.el("label", "form-label", "name"), nameInput)
    cfg.appendChild(nRow)
    const scoreInput = document.createElement("input")
    scoreInput.type = "number"; scoreInput.min = 0; scoreInput.value = scope.requiredApprovalScore || 0
    const sRow = UI.el("div", "form-row"); sRow.append(UI.el("label", "form-label", "required approval score"), scoreInput)
    cfg.appendChild(sRow)
    const ceil = document.createElement("input"); ceil.type = "checkbox"; ceil.checked = !!scope.promoteCeiling
    const cRow = UI.el("div", "form-row"); cRow.append(UI.el("label", "form-label", "promote ceiling"), ceil)
    cfg.appendChild(cRow)
    container.appendChild(cfg)

    const saveConfig = async () => {
      const patch = {}
      const newName = nameInput.value.trim()
      if (newName && newName !== scope.name) patch.name = newName
      if (Number(scoreInput.value) !== (scope.requiredApprovalScore || 0)) patch.requiredApprovalScore = Number(scoreInput.value)
      if (ceil.checked !== !!scope.promoteCeiling) patch.promoteCeiling = ceil.checked
      if (!Object.keys(patch).length) { log("no config changes", "ok"); return }
      logResult("scope config", await API.call("PATCH", `scopes/${scope.id}`, patch))
      await afterMutation()
    }

    // roles editor (members / reviewers)
    container.appendChild(rolesEditor(scope))

    // action toolbar (under the header) — Save first, like the document view.
    const save = UI.el("button", "primary", "Save")
    save.onclick = saveConfig
    Detail.setActions([
      save,
      actionBtn("Add document", () => newDocument({ scopeId: scope.id, persona: API.persona.email })),
      actionBtn("Add sub-scope", () => addSubScope(scope)),
      actionBtn("Review queue", () => reviewQueue(scope)),
      actionBtn("Delete scope", () => deleteScope(scope), true),
    ])
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

  // Delete = the document is gone (for the group). Always tombstone + promote.
  // Works uniformly whether the caller has an own leaf copy or only the
  // inherited/shared original — the DELETE endpoint writes the tombstone into
  // the caller's leaf either way; promote then removes it for the scope.
  async function actDelete({ scopeId, path, persona }) {
    actAs(persona)
    if (!(await UI.confirm({
      title: "Delete",
      message: `Delete "${path}" as ${persona}? Writes a delete and promotes it — removed for ${scopePathById(scopeId)}, subject to that scope's review.`,
      okLabel: "Delete", danger: true,
    }))) return
    const del = await API.call("DELETE", `scopes/${scopeId}/docs?path=${encodeURIComponent(path)}`, {})
    logResult(`delete ${path}`, del)
    if (!del.ok) { await afterMutation(); return }
    const pbody = del.body && del.body.version != null ? { version: del.body.version } : {}
    logResult(`promote delete ${path}`, await API.call("POST", `scopes/${scopeId}/docs/promote?path=${encodeURIComponent(path)}`, pbody))
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
        { key: "scopeId", label: "visible for", type: "custom", el: sel, get: () => sel.value },
        { key: "persona", label: "as persona", type: "text", value: persona || API.persona.email },
        { key: "path", label: "path", type: "text", placeholder: "e.g. math/quadratic.json" },
      ],
    })
    if (!res) return
    const path = sanitizePath(res.path)
    if (!path) { log("enter a path for the new document", "err"); return }
    await addPersona(res.persona, false)
    // Point the deep link at where the doc will show: the persona's leaf if it
    // already exists here, else the scope itself (Save provisions the leaf).
    const scope = state.scopes.find((s) => s.id === res.scopeId)
    const personaRef = await API.personRef(res.persona)
    const leaf = scope
      ? state.scopes.find((s) => s.parentId === scope.id && s.name === personaRef)
      : null
    navigate("doc", { scope: leaf || scope, path })
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
      { label: "Add document…", onClick: () => newDocument({ scopeId: scope.id, persona: API.persona.email }) },
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
      // A shared/inherited doc — acted on as the current persona; Delete writes
      // a tombstone into their leaf and promotes it (removed for the group).
      return UI.menu(x, y, [
        { label: "Open", onClick: () => navigate("doc", ctx) },
        { label: "History…", onClick: () => actHistory({ scopeId: scope.id, path, persona: API.persona.email }) },
        null,
        { label: "Delete", danger: true, onClick: () => actDelete({ scopeId: scope.id, path, persona: API.persona.email }) },
      ])
    }
    const owner = nameOf(scope.name)
    const known = state.hashToHandle[scope.name] !== undefined
    if (!known) {
      return UI.menu(x, y, [{ label: "Unknown persona — add its handle to act on this leaf", disabled: true }])
    }
    const base = { scopeId: scope.parentId, path, persona: owner, active }
    UI.menu(x, y, [
      { label: "Open", onClick: () => navigate("doc", ctx) },
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
    $("reload-tree").onclick = reloadTree
    $("clear-log").onclick = () => { $("log").innerHTML = "" }

    // Detail registry: each node kind → its renderer.
    Detail.init($("detail"), "Select a scope, person, or document in the tree.", $("detail-head"), $("detail-toolbar"))
    Detail.register("scope", renderScopeDetail)
    Detail.register("leaf", renderLeafDetail)
    Detail.register("doc", renderDocDetail)

    Tree.setNameResolver((ref) => state.hashToHandle[ref] || ref)
    // The hash drives selection: clicks set it, this renders it. Also fires for
    // back/forward and for bookmarked deep links.
    window.addEventListener("hashchange", routeHash)
    addPersona("admin@electra.academy")
    checkHealth()
    // First render, then route to whatever the (possibly bookmarked) hash says.
    resolveKnownHandles().then(reloadTree).then(routeHash)
  }
  document.addEventListener("DOMContentLoaded", init)
})()
