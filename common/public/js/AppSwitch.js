import cookieBar from "./cookiebar"
import coffeeDialog from "./CoffeeDialog"


// Image paths are absolute (/common/...), not relative. Every app sits one
// level deep, where "../common" happened to resolve correctly - but the static
// content pages live at /home/de/… and /home/en/…, where the same relative path
// would point at /home/common and 404. Absolute works from any depth.
export default class AppSwitch {

  constructor(permissions){
    let appSwitchButtons = $(` 
            <label class="dropdown" >
                <span class="image-button application-waffel"  data-toggle="dropdown">
                  <img  src="/common/images/app_switch.svg" />
                </span>

                <div class="dropdown-menu" role="menu" >
                      <label class="applicationSwitchHome image-button">
                        <img src="/common/images/app_home.svg"/>
                        <div>Home<br>&nbsp;</div>
                      </label>

                      <label class="applicationSwitchSimulator image-button">
                        <img src="/common/images/app_simulator.svg"/>
                        <div>Circuit</div>
                        <div>Simulator</div>
                      </label>

                      <label class="applicationSwitchAuthor image-button" >
                        <img src="/common/images/app_author.svg"/>
                        <div>Lesson</div>
                        <div>Author</div>
                      </label>

                      <label class="applicationSwitchDesigner image-button" >
                        <img src="/common/images/app_designer.svg"/>
                        <div>Component</div>
                        <div>Designer</div>
                      </label>


                      <label class="applicationSwitchYoutube image-button" >
                        <img src="/common/images/app_youtube.svg"/>
                        <div>Youtube</div>
                        <div>Channel</div>
                      </label>

                      <label class="applicationSwitchCoffee image-button" >
                        <img src="/common/images/app_coffee.svg"/>
                        <div>Send me a</div>
                        <div>Coffee</div>
                      </label>

                </div>   
         </span>
    `)
    $(".applicationSwitch").prepend(appSwitchButtons)

    $(".applicationSwitchYoutube").off("click").on("click", () => {
      window.open("https://www.youtube.com/@electra.academy", "youtube")
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
    $(".applicationSwitchCoffee").off("click").on("click", () => {
      coffeeDialog.show()
    })

    new cookieBar()
  }

}
