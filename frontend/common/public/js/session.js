import axios from "axios"

// The signed-in user — the single source of truth for "who am I / am I logged
// in" across the frontend. Resolved once from GET /userinfo, which the ingress
// answers from the identity headers: 200 + profile when authenticated, 403 when
// anonymous. In the scope model this login bit is the only client-side auth
// distinction that remains; everything finer (write, promote, per-scope admin)
// is decided server-side by scope membership.
class Session {

  constructor() {
    this.user = null
  }

  // Fetch the profile once and cache it; repeated calls share the same promise.
  // Never rejects — an anonymous caller (403) resolves to a null user.
  load() {
    if (!this._loading) {
      this._loading = axios.get("../userinfo")
        .then((res) => { this.user = res.data; return this.user })
        .catch(() => { this.user = null; return null })
    }
    return this._loading
  }

  getUser() {
    return this.user
  }

  isLoggedIn() {
    return this.user !== null
  }
}

export default new Session()
