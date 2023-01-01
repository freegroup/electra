import "google-code-prettify/bin/prettify.min.css"

class Dialog {

  constructor() {
  }

  show(figure) {
    if(figure === undefined || figure === null){
      console.error("missing parameter 'figure'")
      return
    }

    let baseName = figure.attr("userData.file").replace(/\.shape$/, "")
    let pathToDesign = "../designer"
      + "?timestamp=" + new Date().getTime()
      + "&global=" + baseName + ".shape"
    window.open(pathToDesign, "designer")
  }
}

let dialog = new Dialog()
export default dialog
