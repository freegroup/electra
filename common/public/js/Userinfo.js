import axios from "axios"


export default class Userinfo {


  constructor(permissions, conf){

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
          console.log({
            client_id: "1008700492445-0t7mlaamv1355pld1uh4gt9duqs7fg8l.apps.googleusercontent.com",
            //callback: onSignIn,
            //login_uri: "http://localhost:8080/oauth/callback",
            login_uri: "https://electra.academy/oauth/callback",
            ux_mode:"redirect"
          })
          google.accounts.id.initialize({
            client_id: "1008700492445-0t7mlaamv1355pld1uh4gt9duqs7fg8l.apps.googleusercontent.com",
            //callback: onSignIn,
            //login_uri: "http://localhost:8080/oauth/callback",
            login_uri: "https://electra.academy/oauth/callback",
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
