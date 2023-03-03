import axios from "axios"

export default class Userinfo {

  constructor(permissions){

    if(permissions.featureset.authentication === false){
      $(".userinfo_toggler").remove()
    }
    else {
      // inject google analytics
      //
      $("head").append(` 
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LNVJQE5N3Z"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-LNVJQE5N3Z');
        </script>
      `)
      // https://console.cloud.google.com/apis/credentials
      google.accounts.id.initialize({
        client_id: "941934804792-2cosu3n1jpm05jj5551i095hppugtuo2.apps.googleusercontent.com",
        login_uri: `${window.location.protocol}//${window.location.host}/oauth/callback${window.location.pathname}`,
        ux_mode:"redirect"
      });
      
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
          $(".userinfo_toggler").each(function( i, element ) {
            google.accounts.id.renderButton(
              element,
              // "size: medium" do not render user information into the button. But with "large", only one button is updated and not all of them
              // In this case I decide to use a consistend appearance
              { theme: "outline", size: "large", mode:"redirect", text:"signin" }  // customization attributes
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
