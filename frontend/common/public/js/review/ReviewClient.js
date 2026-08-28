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

  // The caller's own still-open promotions with score progress (author view).
  // -> [{ scopeRef, scopePath, scopeLabel, path, version, requiredScore,
  // approvedScore, description }]
  mine() {
    return axios.get(`${this.base}/mine`, { params: { _: Date.now() } })
      .then((r) => r.data.mine || [])
  }

  // Full content of one version by UUID — direct access, any status.
  doc(uuid) {
    return axios.get(`${this.base}/doc`, { params: { uuid, _: Date.now() } })
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

  // Admin force-commit: overrides the reviewer-point threshold (admin only).
  accept(scopeRef, path, version) {
    return axios.post(`${this.base}/${scopeRef}/accept`, { path, version })
      .then((r) => r.data)
  }

  // Withdraw: the author cancels their own pending request. -> { withdrawn }
  withdraw(scopeRef, path, version) {
    return axios.post(`${this.base}/${scopeRef}/withdraw`, { path, version })
      .then((r) => r.data)
  }
}

export default () => new ReviewClient()
