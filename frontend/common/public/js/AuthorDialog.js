const axios = require("axios")
import mdFactory  from "./markdown"
import toast from "./toast"
let md = mdFactory()


class Dialog {

  constructor() {

  }

  // Resolve path to handle, then read - /sheets/global/get is gone.
  // `topic` names the missing page in the message.
  show(file, topic) {

    this.containerId = '#markdownDialog .modal-body'
    axios.get(`../sheets/file/global`, { params: { path: file } })
      .then((response) => {
        return axios.get(`../sheets/file`, { params: { id: response.data.id } })
      })
      .then((response => {
        let container = $(this.containerId)
        container.html("")
        let pages = response.data.content.pages
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
      .catch(() => {
        toast(t("common:dialog.help_missing", { topic: topic ?? file }))
      })
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
