export default class AppSwitch {

  constructor(permissions){
    let appSwitchButtons = $(` 
            <label class="dropdown" >
                <span class="image-button application-waffel"  data-toggle="dropdown">
                  <img  src="../common/images/toolbar_app_switch.svg" class="svg"/>
                </span>

                <div class="dropdown-menu" role="menu" >
                      <label class="applicationSwitchHome image-button">
                        <img src="../common/images/app_home.svg"/>
                        <div>Home<br>&nbsp;</div>
                      </label>

                      <label class="applicationSwitchSimulator image-button">
                        <img src="../common/images/app_simulator.svg"/>
                        <div>Circuit</div>
                        <div>Simulator</div>
                      </label>

                      <label class="applicationSwitchAuthor image-button" >
                        <img src="../common/images/app_lessons.svg"/>
                        <div>Lesson</div>
                        <div>Author</div>
                      </label>

                      <label class="applicationSwitchDesigner image-button" >
                        <img src="../common/images/app_designer.svg"/>
                        <div>Component</div>
                        <div>Designer</div>
                      </label>

                      <label class="applicationSwitchGallery image-button" >
                        <img src="../common/images/app_gallery.svg"/>
                        <div>Community</div>
                        <div>Gallery</div>
                      </label>

                      <label class="applicationSwitchYoutube image-button" >
                        <img src="../common/images/app_youtube.svg"/>
                        <div>Youtube</div>
                        <div>Channel</div>
                      </label>

                      <label class="applicationSwitchUser image-button" >
                        <img src="../common/images/app_user.svg"/>
                        <div>User</div>
                        <div>Management</div>
                      </label>
                      
                      <label class="applicationSwitchGroups image-button" >
                        <img src="../common/images/app_groups.svg"/>
                        <div>My Groups</div>
                        <div>&nbsp;</div>
                      </label>
                </div>   
         </span>
    `)
    $(".applicationSwitch").prepend(appSwitchButtons)

    $(".applicationSwitchYoutube").off("click").on("click", () => {
      window.open("https://www.youtube.com/@electra.academy", "youtube")
    })
    $(".applicationSwitchGallery").off("click").on("click", () => {
      window.open("../gallery", "gallery")
    })
    $(".applicationSwitchDesigner").off("click").on("click", () => {
      window.open("../designer", "designer")
    })
    $(".applicationSwitchAuthor").off("click").on("click", () => {
      window.open("../author", "author")
    })
    $(".applicationSwitchSimulator").off("click").on("click", () => {
      window.open("../simulator", "simulator")
    })
    $(".applicationSwitchHome").off("click").on("click", () => {
      window.open("../home", "home")
    })

    if (permissions.featureset.usermanagement === true) {
      $(document).on("click", ".applicationSwitchUser", () => {
        window.open("../user", "user")
      })
    } else {
      $(".applicationSwitchUser").remove()
    }

    if (permissions.featureset.records === true) {
      $(document).on("click", ".applicationSwitchGroups", () => {
        window.open("../groups", "groups")
      })
    } else {
      $(".applicationSwitchGroups").remove()
    }
  }

}
