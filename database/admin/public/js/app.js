// app.js — wires the explorer together. Plain DOM, no framework.

;(function () {
  const $ = (id) => document.getElementById(id)

  // ---- state -------------------------------------------------------------
  const state = {
    scope: null,        // selected operating scope { id, name, isLeaf, members }
    scopes: [],         // flat list from the last tree render
    personas: [],       // known persona handles (emails) for the dropdown
    hashToHandle: {},   // personRef (SHA-256) → friendly handle, for display
  }

  // Known handles the admin recognizes. The DB only ever stores the one-way
  // hash (personRef = SHA-256(handle)) — good for privacy, painful for an
  // admin staring at hashes. We hash these locally at startup and whenever the
  // admin adds one, so the tree/dropdown can show real names. Nothing is sent
  // to or stored by the DB. Persisted in localStorage for convenience.
  const SEED_HANDLES = [
    "admin@electra.academy",
    "test-root@electra.local",
    "anna", "bob", "zoe",
  ]
  function loadKnownHandles() {
    let saved = []
    try { saved = JSON.parse(localStorage.getItem("db-admin-handles") || "[]") } catch {}
    return [...new Set([...SEED_HANDLES, ...saved])]
  }
  function saveKnownHandle(handle) {
    let saved = []
    try { saved = JSON.parse(localStorage.getItem("db-admin-handles") || "[]") } catch {}
    if (!saved.includes(handle)) {
      saved.push(handle)
      localStorage.setItem("db-admin-handles", JSON.stringify(saved))
    }
  }
  async function resolveKnownHandles() {
    for (const h of loadKnownHandles()) {
      state.hashToHandle[await API.personRef(h)] = h
    }
  }

  // Record the handle↔hash mapping so the tree can show friendly names and the
  // reviewer check can match the current persona against god-view personRefs.
  function rememberHandle(handle, hash) {
    state.hashToHandle[hash] = handle
    if (!state.personas.includes(handle)) state.personas.push(handle)
    saveKnownHandle(handle)
  }

  // ---- logging -----------------------------------------------------------
  function log(msg, kind) {
    const pre = $("log")
    const line = document.createElement("div")
    if (kind) line.className = kind
    const ts = new Date().toISOString().slice(11, 19)
    line.textContent = `[${ts}] ${msg}`
    pre.prepend(line)
  }
  function logResult(label, r) {
    const kind = r.ok ? "ok" : "err"
    log(`${label} — ${summarize(r)}`, kind)
  }

  // Turn a raw response into a short human sentence.
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
    if (b && Array.isArray(b.distributions)) {
      return "✓ distributed: " + b.distributions.map((d) => `${d.targetScopeRef}:${d.status}`).join(", ")
    }
    if (b && Array.isArray(b.docs)) return `✓ ${b.docs.length} document(s) visible`
    if (b && Array.isArray(b.history)) return `✓ ${b.history.length} version(s) in history`
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
      const o = document.createElement("option")
      o.value = p; o.textContent = p
      sel.appendChild(o)
    }
    if (state.personas.includes(cur)) sel.value = cur
  }
  async function addPersona(email) {
    if (!email) return
    if (!state.personas.includes(email)) state.personas.push(email)
    API.persona.email = email
    // Record its hash so the tree can show this handle instead of the raw ref.
    rememberHandle(email, await API.personRef(email))
    refreshPersonaSelect()
  }

  // ---- scope selection ---------------------------------------------------
  function selectScope(scope) {
    state.scope = scope
    // Keep the "working in" dropdown in sync (leaves resolve to their parent).
    const sel = $("scope-select")
    if (scope) sel.value = scope.isLeaf ? (scope.parentId || "") : scope.id
    // Show the scope-admin card for the selected scope (not for leaves).
    const adminCard = $("admin-card")
    if (scope && !scope.isLeaf) {
      adminCard.classList.remove("hidden")
      $("admin-scope-name").textContent = scope.name
      $("f-ceiling").checked = !!scope.promoteCeiling
    } else {
      adminCard.classList.add("hidden")
    }
    updateReviewPanel()
  }

  // Full path of a scope (e.g. "electra/apps/brains") from the flat list,
  // with any personRef segment shown as its friendly handle when known.
  function scopePath(scope) {
    const byId = new Map(state.scopes.map((s) => [s.id, s]))
    const parts = []
    let cur = scope
    while (cur) {
      parts.unshift(state.hashToHandle[cur.name] || cur.name)
      cur = cur.parentId ? byId.get(cur.parentId) : null
    }
    return parts.join("/")
  }

  // Rebuild the "working in" dropdown from the current tree (non-leaf scopes,
  // shown by their full path). Keeps the current selection if still present.
  function refreshScopeSelect() {
    const sel = $("scope-select")
    const cur = state.scope ? (state.scope.isLeaf ? state.scope.parentId : state.scope.id) : ""
    sel.innerHTML = '<option value="">— pick a scope —</option>'
    const rows = state.scopes
      .filter((s) => !s.isLeaf)
      .map((s) => ({ id: s.id, path: scopePath(s) }))
      .sort((a, b) => a.path.localeCompare(b.path))
    for (const r of rows) {
      const o = document.createElement("option")
      o.value = r.id
      o.textContent = r.path
      sel.appendChild(o)
    }
    if (cur) sel.value = cur
  }

  // The operating scope for doc actions: if a personal leaf is selected, use
  // its PARENT (you operate "in" the shared scope; the leaf is where your
  // overrides land automatically).
  function operatingScopeId() {
    if (!state.scope) return null
    if (state.scope.isLeaf) return state.scope.parentId
    return state.scope.id
  }

  // ---- tree --------------------------------------------------------------
  async function reloadTree() {
    const sel = state.scope ? state.scope.id : null
    const { scopes } = await Tree.render($("tree"), sel)
    state.scopes = scopes
    // Seed persona list from every membership we can see (god-view).
    const refs = new Set(state.personas)
    for (const s of scopes) for (const m of s.members) refs.add(m.personRef)
    state.personas = [...refs]
    refreshPersonaSelect()
    refreshScopeSelect()
  }

  Tree.onSelectDoc(async (scope, path) => {
    // Clicking a file in the tree just INSPECTS it (read-only, god-view) and
    // fills the path — it does not change who/where you act as. Set that in
    // card 1, then use Load/Save to act. Works even for foreign leaves.
    $("doc-path").value = path
    const r = await API.god(`doc?scope=${scope.id}&path=${encodeURIComponent(path)}`)
    if (!r.ok) { logResult("inspect", r); return }
    const doc = r.body
    Doc.clear()
    Doc.fill("doc-data", "doc-meta", doc)
    const ownerHint = scope.isLeaf
      ? ` — held by ${state.hashToHandle[scope.name] || scope.name}`
      : " — shared version"
    $("doc-origin").textContent =
      `inspecting v${doc.version} ${doc.status}${ownerHint}  (read-only god-view)`
    log(`inspect ${path} @ scope ${scope.id} v${doc.version}`, "ok")
  })

  // ---- document actions --------------------------------------------------
  function needScope() {
    const id = operatingScopeId()
    if (!id) { log("select an operating scope first", "err"); return null }
    return id
  }
  // Normalize a path the way the DB expects: no leading/trailing slashes, no
  // doubled slashes. The DB rejects malformed paths (integrity); we sanitize
  // here so the admin doesn't have to. "/mein//ordner/x " → "mein/ordner/x".
  function sanitizePath(p) {
    return String(p || "").trim().replace(/\/+/g, "/").replace(/^\/|\/$/g, "")
  }
  function docPath() {
    const raw = $("doc-path").value
    const p = sanitizePath(raw)
    if (p !== raw.trim()) $("doc-path").value = p // reflect the cleanup
    if (!p) { log("enter a document path", "err") }
    return p
  }

  async function loadDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const r = await API.call("GET", `scopes/${id}/docs?path=${encodeURIComponent(path)}`)
    logResult("load", r)
    if (r.ok) {
      Doc.setCurrent(r.body)
      Doc.fill("doc-data", "doc-meta", r.body)
      $("doc-origin").textContent =
        `origin: ${r.body.scope}  v${r.body.version}  ${r.body.status}`
    } else {
      Doc.clear()
      $("doc-origin").textContent = ""
    }
  }

  async function listDocs() {
    const id = needScope(); if (!id) return
    const r = await API.call("GET", `scopes/${id}/docs`)
    logResult("list", r)
    if (r.ok) for (const d of r.body.docs) log(`   • ${d.path}  ←  ${d.scope}`, "ok")
  }

  async function historyDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const r = await API.call("GET", `scopes/${id}/docs/history?path=${encodeURIComponent(path)}`)
    logResult("history", r)
    if (r.ok) for (const h of r.body.history) {
      const votes = (h.votes || []).map((v) => `${short(v.voter)}:${v.kind}`).join(",")
      log(`   • v${h.version} ${h.status} by ${short(h.author)} @ ${h.scope}${votes ? "  [" + votes + "]" : ""}`, "ok")
    }
  }
  function short(ref) { return ref && ref.length > 12 ? ref.slice(0, 8) + "…" : ref }

  async function saveDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    let data, meta
    try { data = Doc.parseEditor("doc-data"); meta = Doc.parseEditor("doc-meta") }
    catch (e) { log(e.message, "err"); return }
    const r = await API.call("PUT", `scopes/${id}/docs?path=${encodeURIComponent(path)}`,
      Doc.putBody(data, meta))
    logResult("save", r)
    if (r.ok) Doc.setCurrent(r.body)
    await afterMutation()
  }

  async function promoteDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const cur = Doc.getCurrent()
    const body = cur && cur.version != null ? { version: cur.version } : {}
    const r = await API.call("POST", `scopes/${id}/docs/promote?path=${encodeURIComponent(path)}`, body)
    logResult("promote", r)
    await afterMutation()
  }

  async function distributeDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const targets = prompt("Distribute to scope ids (comma-separated):", "")
    if (!targets) return
    const targetScopeRefs = targets.split(",").map((s) => s.trim()).filter(Boolean)
    const cur = Doc.getCurrent()
    const body = { path, targetScopeRefs }
    if (cur && cur.version != null) body.version = cur.version
    const r = await API.call("POST", `scopes/${id}/docs/distribute`, body)
    logResult("distribute", r)
    await afterMutation()
  }

  async function deleteDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const cur = Doc.getCurrent()
    const body = cur && cur.version != null ? { version: cur.version } : {}
    const r = await API.call("DELETE", `scopes/${id}/docs?path=${encodeURIComponent(path)}`, body)
    logResult("delete", r)
    await afterMutation()
  }

  async function revertDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const r = await API.call("POST", `scopes/${id}/docs/revert`, { path })
    logResult("revert", r)
    await afterMutation()
  }

  async function renameDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const newPath = sanitizePath(prompt("New path:", path))
    if (!newPath || newPath === path) return

    // 1. Try a normal leaf rename (moves all local versions, keeps publicId).
    const cur = Doc.getCurrent()
    const body = { path, newPath }
    if (cur && cur.version != null) body.version = cur.version
    const r = await API.call("POST", `scopes/${id}/docs/rename`, body)
    if (r.ok) { logResult("rename", r); await afterMutation(); return }
    if (r.status !== 404) { logResult("rename", r); return }

    // 2. 404 = nothing local at the old path → the doc is inherited/shared.
    //    A real rename = copy to the new path + tombstone the old one, both in
    //    the caller's leaf. (The DB rename stays leaf-only by design; this is a
    //    UI convenience.) Promote both afterwards to rename it for the group.
    log("inherited doc — renaming via copy + local tombstone", "ok")
    const read = await API.call("GET", `scopes/${id}/docs?path=${encodeURIComponent(path)}`)
    if (!read.ok) { logResult("rename/read", read); return }
    const putR = await API.call("PUT", `scopes/${id}/docs?path=${encodeURIComponent(newPath)}`,
      { data: read.body.data, meta: read.body.meta })
    if (!putR.ok) { logResult("rename/copy", putR); return }
    const delR = await API.call("DELETE", `scopes/${id}/docs?path=${encodeURIComponent(path)}`, {})
    logResult("rename (copy + tombstone)", delR)
    await afterMutation()
  }

  async function publishDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const r = await API.call("POST", `scopes/${id}/docs/publish`, { path })
    logResult("publish", r)
    if (r.ok && r.body.publicId) {
      log(`public URL: /database/public/${r.body.publicId}`, "ok")
    }
  }

  async function unpublishDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const r = await API.call("POST", `scopes/${id}/docs/unpublish`, { path })
    logResult("unpublish", r)
  }

  // ---- review panel ------------------------------------------------------
  async function currentPersonaIsReviewerHere() {
    const id = operatingScopeId()
    if (!id) return false
    const scope = state.scopes.find((s) => s.id === id)
    if (!scope || !API.persona.email) return false
    const myRef = await API.personRef(API.persona.email)
    return scope.members.some(
      (m) => m.personRef === myRef &&
             m.reviewerScore !== null && m.reviewerScore !== undefined
    )
  }

  async function updateReviewPanel() {
    const box = $("review")
    const id = operatingScopeId()
    if (!id || !(await currentPersonaIsReviewerHere())) { box.classList.add("hidden"); return }
    const r = await API.call("GET", `scopes/${id}/pending`)
    if (!r.ok) { box.classList.add("hidden"); return }
    box.classList.remove("hidden")
    const list = $("pending-list")
    list.innerHTML = ""
    for (const p of r.body.pending) {
      const row = document.createElement("div")
      row.className = "pending-item"
      const label = document.createElement("span")
      label.className = "grow"
      label.textContent = `${p.path} v${p.version} by ${p.author}` +
        (p.isDeletion ? " (delete)" : "")
      const ok = document.createElement("button")
      ok.textContent = "approve"
      ok.onclick = async () => {
        logResult("approve", await API.call("POST", `scopes/${id}/pending/approve`,
          { path: p.path, version: p.version }))
        await afterMutation()
      }
      const no = document.createElement("button")
      no.className = "danger"
      no.textContent = "reject"
      no.onclick = async () => {
        const reason = prompt("Reject reason:", "") || undefined
        logResult("reject", await API.call("POST", `scopes/${id}/pending/reject`,
          { path: p.path, version: p.version, reason }))
        await afterMutation()
      }
      row.append(label, ok, no)
      list.appendChild(row)
    }
    if (!r.body.pending.length) list.innerHTML = '<div class="empty">nothing pending</div>'
  }

  // ---- scope admin forms -------------------------------------------------
  function adminScopeId() {
    // Admin actions target the literally selected scope (not the leaf-parent).
    if (!state.scope) { log("select a scope first", "err"); return null }
    return state.scope.id
  }

  async function addSubScope() {
    const id = adminScopeId(); if (!id) return
    const name = $("f-subscope").value.trim(); if (!name) return
    const requiredApprovalScore = parseInt($("f-subscope-score").value || "0", 10)
    logResult("create sub-scope", await API.call("POST", `scopes/${id}/scopes`,
      { name, requiredApprovalScore }))
    $("f-subscope").value = ""
    await afterMutation()
  }
  async function addMember() {
    const id = adminScopeId(); if (!id) return
    const handle = $("f-member").value.trim(); if (!handle) return
    const personRef = await API.personRef(handle)
    rememberHandle(handle, personRef)
    logResult(`add member ${handle}`, await API.call("POST", `scopes/${id}/members`, { personRef }))
    $("f-member").value = ""
    if (!state.personas.includes(handle)) { state.personas.push(handle); refreshPersonaSelect() }
    await afterMutation()
  }
  async function addReviewer() {
    const id = adminScopeId(); if (!id) return
    const handle = $("f-reviewer").value.trim(); if (!handle) return
    const personRef = await API.personRef(handle)
    rememberHandle(handle, personRef)
    const score = parseInt($("f-reviewer-score").value || "0", 10)
    logResult(`add reviewer ${handle}`, await API.call("POST", `scopes/${id}/reviewers`, { personRef, score }))
    $("f-reviewer").value = ""
    if (!state.personas.includes(handle)) { state.personas.push(handle); refreshPersonaSelect() }
    await afterMutation()
  }
  async function setScore() {
    const id = adminScopeId(); if (!id) return
    const requiredApprovalScore = parseInt($("f-score").value || "0", 10)
    logResult("set score", await API.call("PATCH", `scopes/${id}`, { requiredApprovalScore }))
    await afterMutation()
  }
  async function setCeiling() {
    const id = adminScopeId(); if (!id) return
    const promoteCeiling = $("f-ceiling").checked
    logResult(`promote ceiling ${promoteCeiling ? "on" : "off"}`,
      await API.call("PATCH", `scopes/${id}`, { promoteCeiling }))
    await afterMutation()
  }

  // ---- after any mutation: refresh tree + review -------------------------
  async function afterMutation() {
    await reloadTree()
    await updateReviewPanel()
  }

  // ---- health ------------------------------------------------------------
  async function checkHealth() {
    const badge = $("db-status")
    try {
      const r = await fetch("api/health")
      const j = await r.json()
      badge.textContent = "DB: " + (j.status || "?")
      badge.className = "status " + (r.ok ? "ok" : "bad")
    } catch {
      badge.textContent = "DB: unreachable"
      badge.className = "status bad"
    }
  }

  // ---- wire up -----------------------------------------------------------
  function init() {
    // persona controls
    $("persona").addEventListener("change", (e) => { API.persona.email = e.target.value })
    $("role").addEventListener("change", (e) => { API.persona.role = e.target.value; updateReviewPanel() })
    $("scope-select").addEventListener("change", (e) => {
      const scope = state.scopes.find((s) => s.id === e.target.value)
      selectScope(scope || null)
    })
    $("persona-new").addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        const h = e.target.value.trim()
        e.target.value = ""
        if (!h) return
        await addPersona(h)
        // Re-render so a newly-named hash shows its real name in the tree.
        await reloadTree()
      }
    })

    // doc buttons
    $("btn-load").onclick = loadDoc
    $("btn-list").onclick = listDocs
    $("btn-history").onclick = historyDoc
    $("btn-save").onclick = saveDoc
    $("btn-promote").onclick = promoteDoc
    $("btn-distribute").onclick = distributeDoc
    $("btn-delete").onclick = deleteDoc
    $("btn-revert").onclick = revertDoc
    $("btn-rename").onclick = renameDoc
    $("btn-publish").onclick = publishDoc
    $("btn-unpublish").onclick = unpublishDoc

    // admin forms
    $("btn-subscope").onclick = addSubScope
    $("btn-member").onclick = addMember
    $("btn-reviewer").onclick = addReviewer
    $("btn-score").onclick = setScore
    $("f-ceiling").onchange = setCeiling

    $("reload-tree").onclick = reloadTree
    $("clear-log").onclick = () => { $("log").innerHTML = "" }

    // Let the tree show friendly handles instead of raw personRef hashes.
    Tree.setNameResolver((ref) => state.hashToHandle[ref] || ref)

    // seed a default persona so calls are authenticated out of the box
    addPersona("admin@electra.academy")

    checkHealth()
    // Resolve known handles → hashes first, then render so names show up.
    resolveKnownHandles().then(reloadTree)
  }

  document.addEventListener("DOMContentLoaded", init)
})()
