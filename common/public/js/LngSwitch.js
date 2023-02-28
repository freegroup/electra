
const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };



export default class LngSwitch {

    constructor(permissions){

      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const opt = new Option(lngs[lng].nativeName, lng);
        if (lng === i18next.resolvedLanguage) {
          opt.setAttribute("selected", "selected");
        }
        $('#languageSwitcher').append(opt);
      });

      $('#languageSwitcher').on("change", (event) => {
        const locale = $(event.currentTarget).val()
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
        $('#languageSwitcher').val(locale)
        i18next.changeLanguage(locale, () => {
          this.rerender();
        });
      })
    }

    rerender(){
        $('body').localize()
    }

  }
  