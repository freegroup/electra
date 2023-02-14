import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type = "image") {
    super(type)
  }

  inject(section) {
    super.inject(section)
    let _this = this

    this.content = this.convertToNewContentFormat(section.content)

    $(".sections .activeSection .sectionContent").html(`
              <input class="scaleSlider" type="range" min="10" max="90" value="${this.content.scale}" class="slider" id="imageScaleSlider">
              <div class="editorContainerSelector" id="editor-container">
                  <div id="image-preview">
                    <div class="image-view" data-id="${section.id}" >
                      <img src="${this.content.src}" width="${this.content.scale}%">
                      <div class="overlay"></div>
                    </div>
                  </div>
                  <div class="drop-message">
                    Drag & Drop images or click to upload
                  </div>
              </div>
                `)
                console.log("ddd")
    // do not use "data(..)" method. Do not have any affect to css styling. "data" do not modifies the DOM tree.
    // Jsut modifies the nodes.
    $(".sections .activeSection .sectionContent").attr("data-type", this.getType())

    let slider = $("#imageScaleSlider")
    let dropRegion = document.getElementById("editor-container")
    let imagePreviewRegion = document.getElementById("image-preview")
    let img = $(imagePreviewRegion).find(".image-view img")

    // open file selector when clicked on the drop region
    let fakeInput = document.createElement("input")
    fakeInput.type = "file"
    fakeInput.accept = "image/*"
    fakeInput.multiple = true
    dropRegion.addEventListener('click', () => { fakeInput.click()})
    fakeInput.addEventListener("change", () => { handleFiles(fakeInput.files)})
    slider.on('input', (event) => {
      img.attr("width", slider.val()+"%")
      this.content.scale = slider.val()
    })
    function preventDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    dropRegion.addEventListener('dragenter', preventDefault, false)
    dropRegion.addEventListener('dragleave', preventDefault, false)
    dropRegion.addEventListener('dragover', preventDefault, false)
    dropRegion.addEventListener('drop', preventDefault, false)

    function handleDrop(e) {
      let dt = e.dataTransfer
      let files = dt.files

      // local file
      if (files.length) {
        handleFiles(files);
      }
      // file from a browser (image drag&drop)
      else  {
        // check for img
        let html = dt.getData('text/html')
        let match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html)
        let url = match && match[1]
        if (url) {
          let image = new Image
          let c = document.createElement("canvas")
          let ctx = c.getContext("2d")

          image.onload = function () {
            c.width = this.naturalWidth    // update canvas size to match image
            c.height = this.naturalHeight
            ctx.drawImage(this, 0, 0)      // draw in image
            c.toBlob( (blob) => { handleFiles([blob]) }, "image/png")
          }
          image.onerror = function () {
            alert("Error in uploading")
          }
          image.crossOrigin = ""   // if from different origin
          image.src = url
          return
        }
      }
    }

    dropRegion.addEventListener('drop', handleDrop, false);

    function handleFiles(files) {
      for (let i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i])) {
          let image = files[i]
          // read the image...
          let reader = new FileReader()
          reader.onload =  (e) => {
            img.attr("src", e.target.result)
            _this.content.src = e.target.result
          }
          reader.readAsDataURL(image)
        }
      }
    }

    Mousetrap.bindGlobal(['ctrl+v', 'command+v'], () => {
      navigator.clipboard.read()
      .then(items => {
        for (let item of items) {
          for (let type of item.types) {
            if (type.startsWith("image/")) {
              item.getType(type)
              .then((imageBlob) => {
                let reader = new FileReader()
                reader.onload =  (e) => {
                  img.attr("src", e.target.result)
                  _this.content.src = e.target.result
                }
                reader.readAsDataURL(imageBlob)
              })
              return true
            }      
          }
        }
      })
      .catch((err) => {
        console.log(err)
      });
      return false
    })
   

    function validateImage(image) {
      // check the type
      let validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validTypes.indexOf(image.type) === -1) {
        console.log("Invalid File Type");
        return false;
      }

      // check the size
      let maxSizeInBytes = 10e6; // 10MB
      if (image.size > maxSizeInBytes) {
        alert("File too large");
        return false;
      }
      return true;
    }

    return this
  }

  commit() {
    return super.commit()
    .then(() => {
      Mousetrap.reset()
      this.section.content = this.content
      return this.section
    })
  }

  cancel() {
    return super.cancel()
    .then(() => {
      Mousetrap.reset()
    })
  }

   /**
   * 
   * @param {*} whereToAppend 
   * @param {*} section 
   * @param {String} mode Either "worksheet", "solution", "flashcard"
   */
   render(section, mode){
    section.content = this.convertToNewContentFormat(section.content)
 
    if (section.content) {
      return `<div class="sectionContent" data-type="${section.type}"><img src="${section.content.src}" width="${section.content.scale}%"></div>`
    } 
    return `<div class="sectionContent" data-type="${section.type}">-double click to edit image-</div>`
  }

  defaultContent(){
    return  { 
      // 1x1 pixel transparent
      src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8IWtrDAAELgFXGK9V0wAAAABJRU5ErkJggg==", 
      scale:50
    }
  }

  convertToNewContentFormat(content){
    // empty content. Return empty document
    if(!content){
      return this.defaultContent()
    }

    // convert old images format, return new format with scale attribute
    if (typeof content === 'string' || content instanceof String) {
      return {
        src: content,
        scale: 90
      }
    }
    // already converted. Return content as is
    return content
  }
}
