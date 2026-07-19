import loadScript from "./loadScript"
import session from "./session"

export default class Userinfo {

  constructor(permissions){

    if(permissions.featureset.authentication === false){
      $(".userinfo_toggler").remove()
    }
    else {
      // https://console.cloud.google.com/apis/credentials
      google.accounts.id.initialize({
        client_id: "941934804792-2cosu3n1jpm05jj5551i095hppugtuo2.apps.googleusercontent.com",
        login_uri: `${window.location.protocol}//${window.location.host}/oauth/callback${window.location.pathname}`,
        ux_mode:"redirect"
      });

      // The profile was resolved once at boot (see session). A signed-in user
      // gets their avatar; an anonymous visitor gets the Google sign-in button.
      this.user = session.getUser()
      if (this.user) {
        let icon = this.user.picture?this.user.picture:"../common/images/toolbar_user.svg"
        let role = this.user.role==="admin"?"(Administrator)":""
        $(".userinfo_toggler img").attr("src",icon)
        $(".userinfo_toggler .dropdown-menu").html(`
            <div class="userContainer">
              <img crossorigin="anonymous" src="${icon}"/>
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
