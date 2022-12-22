import axios from "axios"

export default class Userinfo {

  constructor(permissions){

    if(permissions.featureset.authentication === false){
      $(".userinfo_toggler").remove()
    }
    else {
      axios.get("../userinfo")
        .then((response) => {
          this.user = response.data
          let icon = this.user.picture?this.user.picture:"../common/images/toolbar_user.svg"
          let role = this.user.role==="admin"?"(Administrator)":""
          $(".userinfo_toggler img").attr("src",icon)
          $(".userinfo_toggler .dropdown-menu").html(` 
              <div class="userContainer">
                <img src="${icon}"/>
                <div>${this.user.displayName}</div>
                <div>${role}</div>
              </div>
          `)
        })
        .catch( () => {
          // https://console.cloud.google.com/apis/credentials
          google.accounts.id.initialize({
            client_id: "1008700492445-0t7mlaamv1355pld1uh4gt9duqs7fg8l.apps.googleusercontent.com",
            login_uri: `${window.location.protocol}//${window.location.host}/oauth/callback${window.location.pathname}`,
            ux_mode:"redirect"
          });
          
          $(".userinfo_toggler").each(function( i, element ) {
            google.accounts.id.renderButton(
              element,
              { theme: "outline", size: "large", mode:"redirect" }  // customization attributes
            );
          });
          //google.accounts.id.prompt(); // also display the One Tap dialog
        })
    }
  }

  getUser(){
    return this.user
  }
}
