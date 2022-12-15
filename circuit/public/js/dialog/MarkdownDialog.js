import {Remarkable, utils} from "remarkable"
import CircuitFigure from "../figures/CircuitFigure";

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

  show(conf, figure) {
    let scope = figure.attr("userData.scope")
    let shapeName = figure.attr("userData.file")
    let markdownName = shapeName.replace(/\.shape$/, ".md")
    let contentUrl = conf.shapes[scope].file(markdownName)
    $.get(contentUrl,  (content) => {
      let version = figure.VERSION
      let markdownParser = new Remarkable('full', this.defaults)
      markdownParser.inline.validateLink = (url)=> this.validateLink(url)
      $('#markdownDialog .markdownRendering').html(markdownParser.render(content))
      $('#markdownDialog .version').html(version)
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
