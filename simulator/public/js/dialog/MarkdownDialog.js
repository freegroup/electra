import fs from "path"

import mdFactory from "../../../common/js/markdown"
let md = mdFactory()

import CircuitFigure from "../figures/CircuitFigure"
import conf from "../Configuration"

class Dialog {

  constructor() {
    this.defaults = {
      html: true,             // Enable HTML tags in source
      xhtmlOut: false,        // Use '/' to close single tags (<br />)
      breaks: false,          // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',// CSS language prefix for fenced blocks
      linkTarget: '_blank',   // set target to open link in
      typographer: true       // Enable smartypants and other sweet transforms
    }
  }

  show(figure) {
    console.log(figure)
    let scope = figure.attr("userData.scope")
    let shapeName = figure.attr("userData.file")
    let displayName = figure.attr("userData.displayName") ?? fs.basename(shapeName,".shape")
    let markdownName = shapeName.replace(/\.shape$/, ".md")
    let contentUrl = conf.shapes[scope].file(markdownName)
    $.get(contentUrl,  (content) => {
      let version = figure.VERSION
      $('#markdownDialog .markdownRendering').html(md.render(content))
      $('#markdownDialog .media-heading').html(displayName)
      if(figure instanceof CircuitFigure){
        $('#markdownDialog .editButton').show()
      }
      else{
        $('#markdownDialog .editButton').hide()
      }

      $('#markdownDialog').modal('show')

      $("#markdownDialog .editButton").off("click").on("click", () => {
        let designerUrl = `../designer?${scope}=${shapeName}`
        window.open(designerUrl, "designer")
      })

      $("#markdownDialog .editButtonGuided").off("click").on("click", () => {
        let designerUrl = `../designer?${scope}=${shapeName}?tutorial=markdown`
        window.open(designerUrl, "designer")
      })
    })
  }

  validateLink(url) {
    let BAD_PROTOCOLS = [ 'vbscript', 'javascript', 'file'];
    let str = url.trim().toLowerCase();
    // Care about digital entities "javascript&#x3A;alert(1)"
    str = utils.replaceEntities(str);
    if (str.indexOf(':') !== -1 && BAD_PROTOCOLS.indexOf(str.split(':')[0]) !== -1) {
      return false;
    }
    return true;
  }
}

let dialog = new Dialog()
export default dialog
