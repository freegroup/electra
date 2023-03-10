import axios from "axios"
import ToastEditor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import party from "party-js"

import conf from "../Configuration"
let storage = require('../../../common/js/BackendStorage').default(conf.shapes)
import mdFactory from "../../../common/js/markdown"
let md = mdFactory()


class View {

  constructor(permissions) {
    this.permissions = permissions
  }

  init(){
    //load the worksheets first
    return axios.get(conf.shapes.jsonUrl)
    .then((response) => {
      this.render(response.data)
    })
    .catch( exc => {
      console.log(exc)
    })
  }

  render( shapes){
    let searchResult = $(".searchResult")
    searchResult.html("")
    let shapesContainer = $("<div class='shapes'></div>")
    searchResult.append(shapesContainer)
    let writePermission = this.permissions.shapes.global.update || this.permissions.shapes.update
    let writeIcon = writePermission?`<div class="editIcon">&#9998;</div>`:""
   
    shapes.forEach(shape => {
      let tags = shape.tags.map( tag => `<div class="tag">${tag}</div>`).join("")
      let mkFile = shape.fullName+".md"
      shapesContainer.append(`
    
      <div class="tile" data-type="${shape.type}" data-fullname="${shape.fullName}" data-scope="${shape.scope}" data-markdown="${conf.shapes.backend[shape.scope].file(mkFile)}">
        <div class="image">
          <img loading="lazy" src="${conf.shapes.backend[shape.scope].image(shape.imagePath)}"/>
          <div class="rating"><div class="star">&#9734;</div><div class="counter">####</div></div>
        </div>

        <div class="details">
          <div class="headline"><div class="displayName">${shape.displayName}</div>
            <div class="icons">
              <div class="expandIcon"><img src="../common/images/toolbar_fullscreen.svg"/></div>
              ${writeIcon}
            </div>
          </div>
          <div class="tags">${tags}</div>
          <div class="description tinyScrollbar"> </div>
        </div>
      </div>`)
    });

    $(".tile .editIcon").on("click", this.onEdit.bind(this))
    $(".tile .expandIcon").on("click", this.onExpand.bind(this))
    $(".tile .tag").on("click", event => { 
      $(".search-input").val(event.currentTarget.innerText)
      this.filter(event.currentTarget.innerText)
      $(".search-input").focus()
    })

    const descriptions = document.querySelectorAll(".tile .description");
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const desc = $(entry.target)
            const tile = desc.closest(".tile")
            this.loadTile(tile)
            observer.unobserve(entry.target)
        });
        }, {threshold: [0.1]}
    );
    
    descriptions.forEach((desc) => {observer.observe(desc)})
  }

  loadTile(tile){
    let desc = tile.find(".description")
    let rating = tile.find(".rating")    
    let star = tile.find(".star")
    let counter = tile.find(".counter")
    let newURL = tile.data("markdown")
    let fullName = tile.data("fullname")
    axios.get(newURL)
    .then((response) => {
      desc.html(md.render(response.data))
    })
    .then( ()=>{
      return axios.get("../gamification/like?objectId=shape:"+fullName)
    })
    .then( (res) =>{
      counter.html(res.data.count)
      if(res.data.canLike){
        rating.addClass("notRated")
        rating.one("click", ()=>{
          party.confetti(rating[0])
          axios({
            method: 'post',
            url: '../gamification/like',
            data: {objectId: "shape:"+fullName}
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
      if(e.data("fullname").trim().toLowerCase().includes(text)){
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
    let editor = tile.clone()
   
    editor.css("position","absolute")
    editor.addClass("displayMode")
    let saveButton = editor.find(".icons")
    saveButton.html('<button class="electra-button">Close</button>')
    saveButton.on("click", (event) =>{
      editor.remove()
    })
    editor.hide()
    $(".shapes").append(editor)
    editor.fadeIn(300)
  }

  onEdit(event){
    let icon = $(event.currentTarget)
    let tile = icon.closest(".tile")
    let mdUrl = tile.data("markdown")
    let editor = tile.clone()
   
    editor.css("position", "absolute")
    editor.addClass("editMode")
    editor.hide()
    editor.find(".description").html("")
    let saveButton = editor.find(".icons")
    saveButton.html('<button class="electra-button">Save</button>')
    saveButton.on("click", this.onSave.bind(this))

    // for some reasons the insert of the editor changes the scroll position of a DIV.
    // Read the position and restore them after the editor is inserted
    let scrollTop = $(".content").scrollTop()
    axios.get(mdUrl)
    .then( response =>{
      $(".shapes").append(editor)
      this.editor = new ToastEditor({
        el: document.querySelector(".tile.editMode .description"),
        usageStatistics: false,
        initialEditType: 'wysiwyg',
        initialValue: response.data,
        toolbarItems: [
          ['heading', 'bold', 'italic'],
          ['hr', 'quote'],
          ['ul', 'ol', 'indent', 'outdent'],
          ['table', 'link'],
          ['code', 'codeblock'],
        ]
      });
      $(".content").scrollTop(scrollTop)
      editor.fadeIn(300, ()=>{
        $(".content").scrollTop(scrollTop)
      })
    })
  }

  onSave(event){
    let icon = $(event.currentTarget)
    let tile = icon.closest(".tile")
    let scope = tile.data("scope")
    let fullName = tile.data("fullname")
    let type = tile.data("type")

    let shapeFile = fullName + ".shape"
    
    $(".tile.editMode").fadeOut(300, ()=>{
      $(".tile.editMode").remove()
    })

    if(type ==="shape") {
      storage.loadFile(shapeFile, scope)
      .then( response =>{
        let json = response.data
        let userData = json.draw2d[0].userData
        userData.markdown =  this.editor.getMarkdown().tuiMarkdownFix()
        storage.saveFile( json , shapeFile , scope)
        .then((response) => {
          let tile = $(`.tile[data-fullname="${fullName}"]`)
          let desc = tile.find(".description")
          desc.html(md.render(userData.markdown))
          // because the processing of the shape file is async on the backend
          // the "loadTile" do not work at this point
          //this.loadTile(tile)
        })
        .catch(exc => {
          console.log(exc)
        })
      })
    }
    else if(type === "code"){
      let markdown = this.editor.getMarkdown().tuiMarkdownFix()

      storage.saveFile( markdown , fullName+".md" , scope)
      .then((response) => {
        let tile = $(`.tile[data-fullname="${fullName}"]`)
        let desc = tile.find(".description")
        desc.html(md.render(markdown))
        // because the processing of the shape file is async on the backend
        // the "loadTile" do not work at this point
        //this.loadTile(tile)
      })
      .catch(exc => {
        console.log(exc)
      })
    }
    else{
      console.log("type not found...")
    }
  }
}

export default View
