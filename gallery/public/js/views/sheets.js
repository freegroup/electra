import axios from "axios"
import inlineSVG from "../../../common/js/inlineSVG"
import conf from "../Configuration"

class View {

  constructor(permissions) {
    this.permissions = permissions
  }

  init(){
    //load the worksheets first
    return axios.get(conf.sheets.jsonUrl)
    .then((response) => {
      this.render(response.data)
    })
    .catch( exc => {
      console.log(exc)
    })
  }

  render( sheets){
    let searchResult = $(".searchResult")
    searchResult.html("")
    let sheetsContainer = $("<div class='sheets'></div>")
    searchResult.append(sheetsContainer)

    sheets.forEach(sheet => {
      let tags = sheet.tags.map( tag => `<div class="tag">${tag}</div>`).join("")
      let exercise = sheet.exercise ? "<div>&#127891;</div>" : ""
      let downloadBar = exercise ?
                      `<div class="downloadBar">
                        <a href="../sheets/pdf?global=${sheet.fullName}.sheet&mode=worksheet" class="electra-button" target="_pdf"><img class="svg" src="../common/images/toolbar_pdf.svg"> Worksheet</a>
                        <a href="../sheets/pdf?global=${sheet.fullName}.sheet&mode=solution" class="electra-button" target="_pdf" ><img class="svg" src="../common/images/toolbar_pdf.svg"> Solution</a>
                      </div>`
                      :
                      `<div class="downloadBar">
                        <a href="../sheets/pdf?global=${sheet.fullName}.sheet" class="electra-button"  target="_pdf"><img class="svg" src="../common/images/toolbar_pdf.svg"> Document</a>
                      </div>`

      sheetsContainer.append(`
      <div class="tile" data-fullname="${sheet.fullName}" data-searchterm="${sheet.fullName}${exercise?' exercise':''}" data-scope="${sheet.scope}">
          <div class="headline"><div class="displayName">${sheet.displayName}</div>
            <div class="icons">
              ${exercise}<div class="editIcon">&#9998;</div><div class="expandIcon"><img src="../common/images/toolbar_fullscreen.svg"/></div>
            </div>
          </div>
          <div class="tags">${tags}</div>
          <div class="imgContainer">
            <img loading="lazy" src="${conf.sheets.backend[sheet.scope].image(sheet.imagePath)}"/>
            ${downloadBar}
          </div>
      </div>`)
    });

    $(".tile .expandIcon").on("click", this.onExpand.bind(this))
    $(".tile .editIcon").on("click", this.onEdit.bind(this))

    $(".tile .tag").on("click", event => { 
      $(".search-input").val(event.currentTarget.innerText)
      this.filter(event.currentTarget.innerText)
      $(".search-input").focus()
    })

    // NOTE: there used to be an IntersectionObserver here whose only job was
    // fetching the "likes" count per tile once it scrolled into view. That
    // service is gone, and the images lazy-load natively (loading="lazy"), so
    // the observer had nothing left to do.
    inlineSVG.init()
  }


  filter( text) {
    if(text.length===0){
      $(".tile.hidden").removeClass("hidden")
      return
    }
    text = text.toLowerCase()
    $(".tile").each( (i, e) => {
      e = $(e)

      if(e.data("searchterm").trim().toLowerCase().includes(text)){
        e.removeClass("hidden")
      }
      else{
        e.addClass("hidden")
      }
    })
  }


  onExpand(event){

    let icon = $(event.currentTarget)
    let tile = icon.closest(".tile")
    let fullName = tile.data("fullname")+".sheet"
    let scope = tile.data("scope")

    window.open("../author/page.html?"+scope+"="+fullName, "preview")
  }

  onEdit(event){
    let icon = $(event.currentTarget)
    let tile = icon.closest(".tile")
    let fullName = tile.data("fullname")+".sheet"
    let scope = tile.data("scope")

    window.open("../author/index.html?"+scope+"="+fullName, "author")
  }
}

export default View
