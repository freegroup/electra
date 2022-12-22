const axios = require("axios")
const md = require('markdown-it')()

md.use(require("markdown-it-asciimath"))

export default class AuthorPage {

  constructor(containerId, file, token) {
    this.file = file
    this.containerId = containerId
    this.token = token
  }

  render( ) {
    let additionalParam = ""
    if(this.token){
      additionalParam = "&token="+this.token
    }
    axios.get(`../sheets/global/get?filePath=${this.file}${additionalParam}`)
      .then((response => {
        $(this.containerId).html("")
        let pages = response.data.pages
        pages.forEach( (page, index) => {
          let container = $("<div class='authorPage'></div>")
          $(this.containerId).append(container)
          let sections = page.sections
          sections.forEach( (section) => {
            switch(section.type){
              case "brain":
                this.renderBrain(container, section)
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
  }


  renderMarkdown(container, section){
    let markdown = md.render(section.content)
    container.append(`<div class="markdownRendering">${markdown}</div>`)
  }

  renderBrain(container, section){
    container.append(`<div class="imageRendering"><img src="${section.content.image}"></div>` )
  }
}

