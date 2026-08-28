import axios from 'axios'

// Data layer for the account-scoped, cross-app Activity feed. Talks to the
// userinfo account BFF (same pattern as ReviewClient) — app-agnostic.
class ActivityClient {

  constructor() {
    this.base = "../userinfo/activity"
  }

  // The caller's feed + unread count. -> { items:[...], unread }
  // items: { id, actor, eventType, recipientRole, scopeRef, scopeLabel,
  //          subjectKind, subjectRef, subjectLabel, reason, meta, seen, createdAt }
  list(opts = {}) {
    let params = { _: Date.now() }
    if (opts.before) params.before = opts.before
    if (opts.limit) params.limit = opts.limit
    return axios.get(`${this.base}`, { params }).then((r) => r.data)
  }

  // Mark the given ids as read; empty marks all of the caller's unread. -> { ok }
  seen(ids) {
    return axios.post(`${this.base}/seen`, { ids: ids || [] }).then((r) => r.data)
  }
}

export default () => new ActivityClient()
