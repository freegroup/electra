import axios from 'axios'

// Data layer for the review flow. Reviews are account-scoped and app-agnostic
// (any pending version in any scope the caller reviews), so they go through
// the userinfo account BFF — same pattern as WorkspaceClient.
class ReviewClient {

  constructor() {
    this.base = "../userinfo/review"
  }

  // The caller's aggregated review inbox. -> [{ scopeRef, scopePath,
  // scopeLabel, path, version, author, createdAt, requiredScore,
  // approvedScore, myScore, alreadyVoted, isDeletion }]
  queue() {
    return axios.get(`${this.base}/queue`, { params: { _: Date.now() } })
      .then((r) => r.data.queue || [])
  }

  // Full content of one pending version (version-pinned read) so an editor
  // can show what is up for review. -> { data, meta, path, version, ... }
  doc(scopeRef, path, version) {
    return axios.get(`${this.base}/${scopeRef}/doc`, { params: { path, version, _: Date.now() } })
      .then((r) => r.data)
  }

  // Approve: the backend resolves and snapshots the caller's reviewer score —
  // the client never sends points. -> { committed, status }
  approve(scopeRef, path, version) {
    return axios.post(`${this.base}/${scopeRef}/approve`, { path, version })
      .then((r) => r.data)
  }

  // Reject ends the review request (a single reject suffices).
  reject(scopeRef, path, version, reason) {
    return axios.post(`${this.base}/${scopeRef}/reject`, { path, version, reason })
      .then((r) => r.data)
  }
}

export default () => new ReviewClient()
