import loadScript from "./loadScript"
import session from "./session"
import authConfiguration from "./authConfiguration"
import inlineSVG from "./inlineSVG"

export default class Userinfo {

  constructor(permissions){

    // Without a client id there is no way to start a sign-in, so offering the
    // button would be a lie. Everything else on the page keeps working.
    const clientId = authConfiguration.getGoogleClientId()

    if(permissions.featureset.authentication === false || !clientId){
      $(".userinfo_toggler").remove()
    }
    else {
      // The client id comes from the server (GET /auth/configuration) rather
      // than being baked into this bundle - the ingress verifies tokens against
      // it, so it is configured there and nowhere else.
      google.accounts.id.initialize({
        client_id: clientId,
        login_uri: `${window.location.protocol}//${window.location.host}/oauth/callback${window.location.pathname}`,
        ux_mode:"redirect"
      });

      // The profile was resolved once at boot (see session). A signed-in user
      // gets their avatar; an anonymous visitor gets the Google sign-in button.
      this.user = session.getUser()
      if (this.user) {
        // Google's CDN sometimes refuses the avatar (429 rate limit, offline,
        // blocked). Fall back to the local default icon — but inline it as SVG
        // so the appbar's white tint applies (a plain <img> keeps the SVG's
        // baked-in dark #4A4A4A and looks black on the dark bar). onerror clears
        // itself so a broken fallback can't loop.
        let fallback = "../common/images/toolbar_user.svg"
        let icon = this.user.picture?this.user.picture:fallback
        let role = this.user.role==="admin"?"(Administrator)":""
        let toWhiteFallback = function() {
          $(this).off("error.avatar")
            .addClass("svg")            // inlineSVG only converts img.svg
            .attr("src", fallback)
          inlineSVG.init({})            // re-run: inlines the just-set img.svg
        }
        $(".userinfo_toggler img")
          .off("error.avatar")
          .on("error.avatar", toWhiteFallback)
          .attr("src",icon)
        $(".userinfo_toggler .dropdown-menu").html(`
            <div class="userContainer">
              <img crossorigin="anonymous" src="${icon}" onerror="this.onerror=null;this.src='${fallback}'"/>
              <div>${this.user.displayName}</div>
              <div>${role}</div>
            </div>
        `)
      }
      else {
        $(".userinfo_toggler").each(function( i, element ) {
          google.accounts.id.renderButton(element,{ theme: "outline", size: "large", mode:"redirect", text:"signin" })
        })
      }
    }
  }

  getUser(){
    return this.user
  }
}
