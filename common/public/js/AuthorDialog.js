const axios = require("axios")
const md = require('markdown-it')()

md.use(require("markdown-it-asciimath"))

let defaultRender = md.renderer.rules.link_open ?? function (tokens, idx, options, env, self){
  return self.renderToken(tokens, idx, options)
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }
  return defaultRender(tokens, idx, options, env, self);
};

class Dialog {

  constructor() {

  }

  show(file, token ) {

    this.containerId = '#markdownDialog .modal-body'
    let additionalParam = ""
    if(token){
      additionalParam = "&token="+token
    }
    axios.get(`../sheets/global/get?filePath=${file}${additionalParam}`)
      .then((response => {
        let container = $(this.containerId)
        container.html("")
        let pages = response.data.pages
        pages.forEach( (page, index) => {
          let sections = page.sections
          sections.forEach( (section) => {
            switch(section.type){
              case "brain":
                this.renderBrain(container, section)
                break
              case "markdown":
                this.renderMarkdown(container, section)
                break
                case "image":
                  this.renderImage(container, section)
                  break
              default:
                break
            }
          })
          if(index < (pages.length-1))
            container.append("<div style='page-break-before: always;'></div>")
        })
        $('#markdownDialog').modal('show')

      }))
  }

  renderMarkdown(container, section){
    let markdown = md.render(section.content)
    container.append(`<div class="section"> <div class="sectionContent" data-type="${section.type}" >${markdown}</div></div>`)
  }
  renderImage(container, section){
    container.append(`<div class="section"> <div class="sectionContent" data-type="${section.type}"><img src="${section.content}"></div></div>` )
  }
  renderBrain(container, section){
    container.append(`<div class="section"> <div class="sectionContent" data-type="${section.type}"><img src="${section.content.image}"></div></div>` )
  }
}

let dialog = new Dialog()
export default dialog
