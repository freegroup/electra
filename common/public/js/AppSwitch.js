export default class AppSwitch {

  constructor(permissions){
    let appSwitchButtons = $(` 
            <label class="dropdown" >

                <span class="image-button"  data-toggle="dropdown">
                  <img  src="../common/images/toolbar_app_switch.svg" class="svg"/>
                </span>

                <ul class="dropdown-menu" role="menu" >
                    <form class="form-horizontal" role="form">

                      <label class="applicationSwitchHome image-button">
                        <img src="../common/images/app_home.svg"/>
                        <div>Home<br>&nbsp;</div>
                      </label>

                      <label class="applicationSwitchSimulator image-button">
                        <img src="../common/images/app_simulator.svg"/>
                        <div>Circuit<br>Simulator</div>
                      </label>

                      <label class="applicationSwitchAuthor image-button" >
                        <img src="../common/images/app_lessons.svg"/>
                        <div>Lesson<br>Author</div>
                      </label>

                      <label class="applicationSwitchDesigner image-button" >
                        <img src="../common/images/app_designer.svg"/>
                        <div>Component<br>Designer</div>
                      </label>
                      
                      <label class="applicationSwitchUser image-button" >
                        <img src="../common/images/app_user.svg"/>
                        <div>User<br>Management</div>
                      </label>
                      
                      <label class="applicationSwitchGroups image-button" >
                        <img src="../common/images/app_groups.svg"/>
                        <div>My Groups<br>&nbsp;</div>
                      </label>
                      
                    </form>
                </ul>   
                         
         </span>
    `)
    $(".applicationSwitch").prepend(appSwitchButtons)

    $(".applicationSwitchDesigner").off("click").on("click", () => {
      window.open("../designer", "designer")
    })
    $(".applicationSwitchAuthor").off("click").on("click", () => {
      window.open("../author", "author")
    })
    $(".applicationSwitchSimulator").off("click").on("click", () => {
      window.open("../circuit", "circuit")
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
