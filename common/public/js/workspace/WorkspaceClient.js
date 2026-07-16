import axios from 'axios'

// Data layer for the Workspaces browser. Workspaces are account-scoped and
// app-agnostic, so they go through the userinfo account BFF (/userinfo/...),
// NOT an app backend and NOT /database (which the ingress no longer exposes).
// The ingress injects the caller's identity from the session.
class WorkspaceClient {

  constructor() {
    this.base = "../userinfo/workspaces"
  }

  // The drill-down roots: the fixed entry points (app root + personal
  // workspace), decided server-side. -> [{ scopeRef, name, kind, isMember,
  // isAdmin, ... }]
  roots() {
    return axios.get(`${this.base}/roots`, { params: { _: Date.now() } })
      .then((r) => r.data.roots || [])
  }

  // The scopes the caller is a member of (drill-down roots). -> [{ scopeRef,
  // name, roles, ... }]
  mine() {
    return axios.get(`${this.base}/mine`, { params: { _: Date.now() } })
      .then((r) => r.data.workspaces || [])
  }

  // Metadata of one workspace. -> { scopeRef, name, parent, ... }
  scope(ref) {
    return axios.get(`${this.base}/${ref}`, { params: { _: Date.now() } })
      .then((r) => r.data)
  }

  // Direct sub-workspaces (member view). -> [{ scopeRef, name, isMember,
  // isAdmin, ... }]
  children(ref) {
    return axios.get(`${this.base}/${ref}/children`, { params: { _: Date.now() } })
      .then((r) => r.data.children || [])
  }

  // Member roster of a workspace (admin only). -> [{ personRef, isAdmin, ... }]
  members(ref) {
    return axios.get(`${this.base}/${ref}/members`, { params: { _: Date.now() } })
      .then((r) => r.data.members || [])
  }

  // Create a sub-workspace under ref (any member may). `label` is the display
  // name; the server derives the identity name from it. -> { scopeRef, ... }
  createChild(ref, label) {
    return axios.post(`${this.base}/${ref}/children`, { label })
      .then((r) => r.data)
  }

  // Rename a workspace's display label (admin only). -> { label, ... }
  rename(ref, label) {
    return axios.patch(`${this.base}/${ref}`, { label })
      .then((r) => r.data)
  }

  // Add a member to a workspace (admin only). personRef is an email.
  addMember(ref, personRef) {
    return axios.post(`${this.base}/${ref}/members`, { personRef })
      .then((r) => r.data)
  }

  // Remove a member from a workspace (admin only).
  removeMember(ref, personRef) {
    return axios.delete(`${this.base}/${ref}/members/${encodeURIComponent(personRef)}`)
      .then((r) => r.data)
  }
}

export default () => new WorkspaceClient()
