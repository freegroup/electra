import axios from "axios"
import party from "party-js"
import inlineSVG from "../../../common/js/inlineSVG"
import conf from "../configuration"

class View {

  constructor(permissions) {
    this.permissions = permissions
  }

  init(){
    //load the worksheets first
    axios.get(conf.sheets.jsonUrl)
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
          <div class="rating">
            <div class="star">&#9734;</div>
            <div class="counter">####</div>
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

    const tiles = document.querySelectorAll(".tile");
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const tile = $(entry.target)
            this.loadTile(tile)
            observer.unobserve(entry.target)
        });
        }, {threshold: [0.1]}
    );
    
    tiles.forEach((tile) => {observer.observe(tile)})
    inlineSVG.init()
  }

  loadTile(tile){
    let rating = tile.find(".rating")    
    let star = tile.find(".star")
    let counter = tile.find(".counter")
    let fullName = tile.data("fullname")
    axios.get("../gamification/like?objectId=sheets:"+fullName)
    .then( (res) =>{
      counter.html(res.data.count)
      if(res.data.canLike){
        rating.addClass("notRated")
        rating.one("click", ()=>{
          party.confetti(star[0])
          axios({
            method: 'post',
            url: '../gamification/like',
            data: {objectId: "sheets:"+fullName}
          })
          .then( (updatedRating)=>{
            let newRating = updatedRating.data
            star.html("&#9733;")
            counter.html(newRating.count.toString())
            rating.removeClass("notRated")
          })
        })
      }
      else{
        star.html("&#9733;")
      }
    })
    .catch( exc => {
      console.log(exc)
    })
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
