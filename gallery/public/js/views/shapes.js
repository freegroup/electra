import axios from "axios"
import mdFactory from "../../../common/js/markdown"
let md = mdFactory()

import conf from "../configuration"

class View {

  constructor(permissions) {
    this.permissions = permissions
  }

  render( shapes){
    let searchResult = $(".searchResult")
    searchResult.html("")
    let writePermission = this.permissions.shapes.global.update || this.permissions.shapes.update
    let writeIcon = writePermission?`<div class="editIcon">&#9998;</div>`:""
    shapes.forEach(shape => {
        let tags = shape.tags.map( tag => `<div class="tag">${tag}</div>`).join("")
        let mkFile = shape.shapePath.replace(".shape",".md")
        searchResult.append(`
        <div class="tile">
            <div class="image">
                <img loading="lazy" src="${conf.shapes[shape.scope].image(shape.imagePath)}"/>
            </div>

            <div class="details">
                <div class="headline"><div class="displayName">${shape.displayName}</div>${writeIcon}</div>
                <div class="tags">${tags}</div>
                <div class="description" data-markdown="${conf.shapes[shape.scope].image(mkFile)}"> </div>
            </div>
        </div>
        `)
    });

    $(".tile .editIcon").on("click", (event) => {
        let icon = $(event.currentTarget)
        let tile = icon.closest(".tile")
        let editor = tile.clone()
       
        editor.css("position","absolute")
        editor.addClass("editMode")
        $(".searchResult").append(editor)
        console.log(tile)
    })

    const descriptions = document.querySelectorAll(".tile .description");
    
    let observer = new IntersectionObserver(
        (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const desc = entry.target;
            const newURL = desc.getAttribute("data-markdown");
            //desc.src = newURL;
            axios.get(newURL)
            .then((response) => {
              let docu = response.data
              let html = md.render(docu)
              desc.innerHTML = html
            })
            .catch( exc => {
              console.log(exc)
            })
            observer.unobserve(desc);
        });
        }, {threshold: [0.1]}
    );
    
    descriptions.forEach((desc) => {
        observer.observe(desc);
    });
  }
}

export default View
