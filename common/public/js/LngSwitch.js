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
        const chosenLng = $(event.currentTarget).val()
        i18next.changeLanguage(chosenLng, () => {
          this.rerender();
        });
      });
    }

    rerender(){
        $('body').localize()
    }

  }
  