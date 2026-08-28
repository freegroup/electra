import axios from "axios"

// The public sign-in parameters of THIS deployment - the same for every visitor,
// logged in or not. Resolved once from GET /auth/configuration, which the
// ingress answers from its own configuration.
//
// This is a different question from the other two the frontend asks at boot:
//
//   session      "who am I?"                  -> depends on the session
//   permissions  "what may I do?"             -> depends on the role
//   this module  "how is this install set up?" -> depends on neither
//
// Keeping it separate is what lets the client id live in a single place
// server-side instead of being copied into the frontend bundle.
class AuthConfiguration {

  constructor() {
    this.googleClientId = null
  }

  // Fetch once and cache; repeated calls share the same promise. Never rejects:
  // a failure here must not take the whole boot chain down with it. The editor
  // works fine without an identity, so the app still comes up - only the
  // sign-in button stays away (see Userinfo), which is the honest outcome when
  // we cannot tell the browser which OAuth client to use.
  load() {
    if (!this._loading) {
      this._loading = axios.get("../auth/configuration")
        .then((res) => { this.googleClientId = res.data.googleClientId; return this })
        .catch((error) => {
          console.log("auth configuration unavailable - sign-in disabled", error)
          this.googleClientId = null
          return this
        })
    }
    return this._loading
  }

  getGoogleClientId() {
    return this.googleClientId
  }
}

export default new AuthConfiguration()
