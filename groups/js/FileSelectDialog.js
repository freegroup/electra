import Hogan from "hogan.js"
let { dirname } = require("./path.js").default

import conf from "./Configuration"

class Dialog {

  /**
   * @constructor
   */
  constructor() {
    this.filesSelectTemplate= ` 
        <ul class="list-group">
        {{#files}}
          <li class="list-group-item"  
                  data-scope="{{scope}}"  
                  data-type="{{type}}"  
                  data-folder="{{folder}}" 
                  data-title="{{title}}" 
                  data-name="{{folder}}{{name}}"
                  >
            <div class="media thumb">
               {{#dir}}
                  <a class="media-left">
                  <div style="width:24px; height:24px">
                    <img style="width:100%; height:100%; object-fit:contain"  src="../common/images/files_folder{{back}}.svg">
                  </div>
                  </a>
               {{/dir}}
               {{^dir}}
                  <a class="media-left">
                  <div style="width:24px;height:24px">
                    <img style="width:100%;height:100%; object-fit:contain" src="{{image}}">
                  </div>
                  </a>
               {{/dir}}
              <div class="media-body">
                <h4 class="media-heading">{{title}}</h4>
              </div>
            </div>
          </li>
        {{/files}}
        </ul>
    `

    $("body").append(` 
      <div id="fileSelectDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
                  <h4 class="media-heading">Select Document</h4>
            </div>
            
            <div class="container">
              <header>
                <ul class="nav nav-tabs"></ul>
              </header>
    
              <div class="file-select-content"></div>
            </div>

            <div class="modal-footer">
              <button class="btn" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show(type, callback) {
    this.callback = callback
    $("#fileSelectDialog .nav-tabs").html("")
    $("#fileSelectDialog .file-select-content").html("")

    this.initPane(type, "user",   conf[type].user,   "")
    this.initPane(type, "global", conf[type].global, "")

    $("#fileSelectDialog").modal("show")
    $("#fileSelectDialog .nav-tabs li:first-child a").click()
  }

  initPane(type, scope, backendConf, initialPath) {
    let paneId = type+"_"+scope+"_files"
    let paneSelector = "#"+paneId
    $("#fileSelectDialog .nav-tabs").append(`<li><a data-toggle="tab" href="${paneSelector}">${paneId}</a></li>`)
    $("#fileSelectDialog .file-select-content").append(`<div id="${paneId}" class="tab-pane fade"></div>`)

    let storage = require("./BackendStorage").default

    let _this = this
    // load files
    //
    function loadPane(path) {
      storage.getFiles( path, type, scope).then((files) => {
        files = files.map(file => {
          return {
            ...file,
            scope: scope,
            title: file.name,
            image: backendConf.image(file.filePath)
          }
        })

        if (path.length !== 0) {
          files.unshift({
            name: dirname(path),
            folder: "", // important. Otherwise Hogan makes a lookup fallback to the root element
            type: "dir",
            dir: true,
            scope: scope,
            back:"_back",
            title: ".."
          })
        }
        if(files.length>0) {
          let compiled = Hogan.compile(_this.filesSelectTemplate)
          let output = compiled.render({folder: path, files: files})
          $(paneSelector).html($(output))
        }
        else{
          $(paneSelector).html('<ul class="list-group"><li class="list-group-item">No Files Found</li></ul>')
        }

        $(paneSelector + " .list-group-item[data-type='dir']").on("click", (event) => {
          let $el = $(event.currentTarget)
          let name = $el.data("name")
          if(name !=="" && !name.endsWith("/")){
            name = name +"/"
          }
          loadPane(name)
        })

        $(paneSelector + " .list-group-item[data-type='file']").on("click", (event) => {
          let $el = $(event.currentTarget)
          let scope = $el.data("scope")
          let name = $el.data("name")
          _this.callback(scope, name)
          $("#fileSelectDialog").modal("hide")
        })
      })
    }
    loadPane(initialPath)
  }
}

let dialog = new Dialog()
export default dialog
