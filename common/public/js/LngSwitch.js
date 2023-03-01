
const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };



export default class LngSwitch {

    constructor(permissions){

      $(".appbar").append(`
        <span class="group">
          <div class="dropdown" id="languageSwitcher" >
            <span class="image-button" data-toggle="dropdown">
              <img src="../common/images/toolbar_language.svg"/>
            </span>
            <ul class="dropdown-menu  dropdown-menu-right" role="menu" >
            </ul>
          </div>
        </span>
      `)
      
      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const name = lngs[lng].nativeName;
        $('#languageSwitcher .dropdown-menu').append(`<li data-name="${name}" data-lng="${lng}">${name}</li>`);
      });

      $('#languageSwitcher li').on("click", (event) => {
        const locale = $(event.currentTarget).data("lng")
        i18next.changeLanguage(locale, () => {
          this.rerender();
        });
        // we use socket to emit the language change. The backend can now update all open browser windows
        //
        socket.emit("i18n", locale)
      });

      // receive event from different browser to sync the langugage
      //
      socket.on("i18n", locale => {
        i18next.changeLanguage(locale, () => {
          this.rerender();
        });
      })
    }

    rerender(){
        $('body').localize()
    }

  }
  