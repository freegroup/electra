import cookieBar from "./cookiebar"
import coffeeDialog from "./CoffeeDialog"


// Image paths are absolute (/common/...), not relative. Every app sits one
// level deep, where "../common" happened to resolve correctly - but the static
// content pages live at /home/de/… and /home/en/…, where the same relative path
// would point at /home/common and 404. Absolute works from any depth.
export default class AppSwitch {

  constructor(permissions){
    // <div>, nicht <label>: die drei Umschalter in der Leiste sollen dasselbe
    // Element sein. Ein <label> gehoert zu einem Formularfeld, hier gab es
    // keins - dafuer brachte es Regeln mit, die ein <div> nicht hat, und die
    // Reihe stand dadurch nicht auf einer Linie.
    let appSwitchButtons = $(`
            <div class="dropdown" >
                <span class="image-button application-waffel"  data-toggle="dropdown">
                  <img  src="/common/images/app_switch.svg" />
                  <div data-i18n="common:header.apps">Apps</div>
                </span>

                <div class="dropdown-menu" role="menu" >
                      <label class="applicationSwitchHome image-button">
                        <img src="/common/images/app_home.svg"/>
                        <div data-i18n="[html]common:apps.home">Home</div>
                      </label>

                      <label class="applicationSwitchSimulator image-button">
                        <img src="/common/images/app_simulator.svg"/>
                        <div data-i18n="[html]common:apps.simulator">Circuit<br>Simulator</div>
                      </label>

                      <label class="applicationSwitchAuthor image-button" >
                        <img src="/common/images/app_author.svg"/>
                        <div data-i18n="[html]common:apps.author">Worksheets</div>
                      </label>

                      <label class="applicationSwitchDesigner image-button" >
                        <img src="/common/images/app_designer.svg"/>
                        <div data-i18n="[html]common:apps.designer">Symbol<br>Editor</div>
                      </label>


                      <label class="applicationSwitchBook image-button" >
                        <img src="/common/images/app_book.svg"/>
                        <div data-i18n="[html]common:apps.book">Grundlagen</div>
                      </label>

                      <label class="applicationSwitchYoutube image-button" >
                        <img src="/common/images/app_youtube.svg"/>
                        <div data-i18n="[html]common:apps.youtube">Youtube<br>Channel</div>
                      </label>

                      <label class="applicationSwitchCoffee image-button" >
                        <img src="/common/images/app_coffee.svg"/>
                        <div data-i18n="[html]common:apps.coffee">Send me a<br>Coffee</div>
                      </label>

                </div>
         </div>
    `)
    $(".applicationSwitch").prepend(appSwitchButtons)

    $(".applicationSwitchYoutube").off("click").on("click", () => {
      window.open("https://www.youtube.com/@electra.academy", "youtube")
    })
    $(".applicationSwitchBook").off("click").on("click", () => {
      window.open("../book", "book")
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
