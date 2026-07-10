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

  // Record the handle↔hash mapping so the tree can show friendly names and the
  // reviewer check can match the current persona against god-view personRefs.
  function rememberHandle(handle, hash) {
    state.hashToHandle[hash] = handle
    if (!state.personas.includes(handle)) state.personas.push(handle)
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
    const body = typeof r.body === "string" ? r.body : JSON.stringify(r.body)
    log(`${label} → ${r.status} ${body}`, kind)
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
    $("op-scope").textContent = scope ? scope.name : "—"
    updateReviewPanel()
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
  }

  Tree.onSelectScope((scope) => selectScope(scope))
  Tree.onSelectDoc(async (scope, path) => {
    // Operate in the scope where the doc was found; load via walk-up from there.
    const opId = scope.isLeaf ? scope.parentId : scope.id
    const target = state.scopes.find((s) => s.id === opId)
    selectScope(target || scope)
    $("doc-path").value = path
    await loadDoc()
  })

  // ---- document actions --------------------------------------------------
  function needScope() {
    const id = operatingScopeId()
    if (!id) { log("select an operating scope first", "err"); return null }
    return id
  }
  function docPath() {
    const p = $("doc-path").value.trim()
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
  }

  async function historyDoc() {
    const id = needScope(); if (!id) return
    const path = docPath(); if (!path) return
    const r = await API.call("GET", `scopes/${id}/docs/history?path=${encodeURIComponent(path)}`)
    logResult("history", r)
  }

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
    const newPath = prompt("New path:", path)
    if (!newPath || newPath === path) return
    const cur = Doc.getCurrent()
    const body = { path, newPath }
    if (cur && cur.version != null) body.version = cur.version
    const r = await API.call("POST", `scopes/${id}/docs/rename`, body)
    logResult("rename", r)
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
    if (!r.body.pending.length) list.textContent = "  (nothing pending)"
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
    $("persona-new").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { addPersona(e.target.value.trim()); e.target.value = "" }
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

    $("reload-tree").onclick = reloadTree

    // Let the tree show friendly handles instead of raw personRef hashes.
    Tree.setNameResolver((ref) => state.hashToHandle[ref] || ref)

    // seed a default persona so calls are authenticated out of the box
    addPersona("admin@electra.academy")

    checkHealth()
    reloadTree()
  }

  document.addEventListener("DOMContentLoaded", init)
})()
