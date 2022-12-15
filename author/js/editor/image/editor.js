export default class Editor {

  constructor() {
  }

  inject(section) {
    this.section = section
    this.content = section.content || ""
    let _this = this

    $(".sections .activeSection .sectionContent").html(`
              <div class="editorContainerSelector" id="editor-container">
                  <div class="drop-message">
                        Drag & Drop images or click to upload
                  </div>
                  <div id="image-preview">
                    <div class="image-view">
                      <img src="${this.content}">
                      <div class="overlay"></div>
                    </div>
                  </div>
              </div>
                `)

    let dropRegion = document.getElementById("editor-container")
    let imagePreviewRegion = document.getElementById("image-preview")

    // open file selector when clicked on the drop region
    let fakeInput = document.createElement("input")
    fakeInput.type = "file"
    fakeInput.accept = "image/*"
    fakeInput.multiple = true
    dropRegion.addEventListener('click', () => {
      fakeInput.click()
    })

    fakeInput.addEventListener("change", () => {
      handleFiles(fakeInput.files)
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
          let img = new Image
          let c = document.createElement("canvas")
          let ctx = c.getContext("2d")

          img.onload = function () {
            c.width = this.naturalWidth    // update canvas size to match image
            c.height = this.naturalHeight
            ctx.drawImage(this, 0, 0)      // draw in image
            c.toBlob(function (blob) {        // get content as PNG blob
              // call our main function
              handleFiles([blob])
            }, "image/png")
          }
          img.onerror = function () {
            alert("Error in uploading")
          }
          img.crossOrigin = ""              // if from different origin
          img.src = url
          return
        }
      }
    }

    dropRegion.addEventListener('drop', handleDrop, false);

    function handleFiles(files) {
      for (let i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i])) {
          let image = files[i]
          // container
          let imgView = document.createElement("div")
          imgView.className = "image-view"
          imagePreviewRegion.appendChild(imgView)

          // previewing image
          let img = document.createElement("img")
          imgView.appendChild(img)

          // progress overlay
          let overlay = document.createElement("div")
          overlay.className = "overlay"
          imgView.appendChild(overlay)

          // read the image...
          let reader = new FileReader()
          reader.onload = function (e) {
            img.src = e.target.result
            _this.content = img.src
          }
          reader.readAsDataURL(image)
        }
      }
    }

    function validateImage(image) {
      // check the type
      let validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validTypes.indexOf(image.type) === -1) {
        alert("Invalid File Type");
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
    return new Promise((resolve, reject) => {
      this.section.content = this.getValue()

      resolve(this.section)
    })
  }

  cancel() {
    return new Promise((resolve, reject) => {
      resolve(this.section)
    })
  }

  getValue() {
    return this.content
  }
}
