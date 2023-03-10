const axios = require("axios")

import mdFactory  from "./markdown"
let md = mdFactory()

export default class AuthorPage {

  constructor(containerId, file) {
    this.file = file
    this.containerId = containerId
  }

  render( ) {
    axios.get(`../sheets/global/get?filePath=${this.file}`)
      .then((response => {
        $(this.containerId).html("")
        let pages = response.data.pages
        pages.forEach( (page, index) => {
          let container = $("<div class='authorPage section'></div>")
          $(this.containerId).append(container)
          let sections = page.sections
          sections.forEach( (section) => {
            switch(section.type){
              case "brain":
                this.renderBrain(container, section)
                break
              case "wysiwyg":
                  this.renderMarkdown(container, section)
                  break
              case "markdown":
                this.renderMarkdown(container, section)
                break
              default:
                break
            }
          })
          if(index < (pages.length-1))
            container.append("<div style='page-break-before: always;'></div>")
        })
      }))
      .catch( err => {
        console.log(err)
      })
  }


  renderMarkdown(container, section){
    let markdown = md.render(section.content)
    container.append(`<div class="sectionContent" data-type="wysiwyg">${markdown}</div>`)
  }

  renderBrain(container, section){
    container.append(`<div class="imageRendering" data-type="image"><img src="${section.content.image}"></div>` )
  }
}

