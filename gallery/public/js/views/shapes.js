import axios from "axios"
let md = require('markdown-it')()
md.use(require("markdown-it-asciimath"))
md.use(require('markdown-it-container'), "info")
md.use(require('markdown-it-link-target'))

import conf from "../configuration"

class View {

  constructor(permissions) {
    this.permissions = permissions
  }

  render( shapes){
    let searchResult = $(".searchResult")
    searchResult.html("")

    shapes.forEach(shape => {
        let tags = shape.tags.map( tag => `<div class="tag">${tag}</div>`).join("")
        let mkFile = shape.shapePath.replace(".shape",".md")
        searchResult.append(`
        <div class="tile">
            <div class="image">
                <img loading="lazy" src="${conf.shapes[shape.scope].image(shape.imagePath)}"/>
            </div>

            <div class="details">
                <div class="displayName">${shape.displayName}</div>
                <div class="tags">${tags}</div>
                <div class="description" data-markdown="${conf.shapes[shape.scope].image(mkFile)}"> </div>
            </div>

        </div>
        
        `)
    });
    console.log(shapes)

    const descriptions = document.querySelectorAll(".tile .description");
    
    let observer = new IntersectionObserver(
        (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const desc = entry.target;
            const newURL = desc.getAttribute("data-markdown");
            console.log(newURL);
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
