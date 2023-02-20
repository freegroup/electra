import Hogan from "hogan.js"
import axios from "axios"
import "./PopConfirm"
import fs from "path-browserify"

import inputPrompt  from "./InputPrompt"

export default class Files {

  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor(app, conf, permissions) {
    $("#files_tab a").on("click", this.onShow.bind(this))

    $("body").append(` 
        <script id="filesTemplate" type="text/x-jsrender">
        <div class="fileOperations">
            <button data-folder="{{folder}}" class='fileOperationsFolderAdd electra-button' >&#43; ${conf.fileScreen.addFolderButton}</button>
            <button data-folder="{{folder}}" class='fileOperationsDocumentAdd electra-button' >&#43; ${conf.fileScreen.addFileButton}</button>
        </div>
        <div class="filePath">Folder: {{folder}}</div>
        <ul class="fileList">
        {{#files}}
          <li class="list-group-item"  
                  data-scope="{{scope}}"  
                  data-type="{{type}}"  
                  data-delete="{{delete}}" 
                  data-update="{{update}}" 
                  data-folder="{{folder}}" 
                  data-title="{{title}}" 
                  data-name="{{folder}}{{name}}"
                  >
            <div class="media thumb">
               {{#dir}}
                  <a class="media-left">
                  <div style="width: 48px; height: 48px">
                    <img style="width:100%; height:100%; object-fit: contain"  src="../common/images/files_folder{{back}}.svg">
                  </div>
                  </a>
               {{/dir}}
               {{^dir}}
                  <a class="thumbnail media-left">
                  <div style="width: 48px; height: 48px">
                    <img style="width:100%; height:100%; object-fit: contain" src="{{image}}">
                  </div>
                  </a>
               {{/dir}}
              <div class="media-body">
                <h4 class="media-heading">{{title}}</h4>
                {{#update}}
                <span class="editIcon">&#9998;</span>
                {{/update}}
              </div>
            </div>
            {{#delete}}
                <div class="deleteIcon" data-toggle="confirmation">&#x2296;</div>
            {{/delete}}   
          </li>
        {{/files}}
        </ul>
        </script>
    `)

    this.conf = conf
    this.app = app
    this.render(conf, permissions)
  }

  onShow() {
    this.onTabClick()
  }

  onTabClick() {
    setTimeout(()=>{
      let w1= $("#userFilesTab").outerWidth()
      let w2= $("#globalFilesTab").outerWidth()
      if($("#userFilesTab.active").length===1){
        $("span.sliding-bar").css({
          "left": `0`,
          "width": `${w1}px`
        })
      }
      else{
        $("span.sliding-bar").css({
          "left": `${w1}px`,
          "width": `${w2}px`
        })
      }
    },100)
  }

  refresh(conf, permissions, file){
    let directory = fs.dirname(file.name)
    if(file.scope==="user") {
      this.initPane("user", "#userFiles", conf.backend.user, permissions, directory)
    }
    else {
      this.initPane("global", "#globalFiles", conf.backend.global, permissions.global, directory)
    }
  }

  render(conf, permissions) {
    let storage = require("./BackendStorage").default(conf)

    this.initTabs(permissions)
    this.initPane("user",   "#userFiles",   conf.backend.user,   permissions       , "")
    this.initPane("global", "#globalFiles", conf.backend.global, permissions.global, "")

    socket.off("file:generated").on("file:generated", msg => {
      let preview = $(".list-group-item[data-name='" + msg.filePath + "'] img")
      if (preview.length === 0) {
        this.render(conf, permissions)
      } else {
        let scope =  $(".list-group-item[data-name='" + msg.filePath + "']").data("scope")
        $(".list-group-item[data-name='" + msg.filePath + "'] img").attr({src: conf.backend[scope].image(msg.filePath) + "&timestamp=" + new Date().getTime()})
      }
    })

    $(document)
      .on("click", "#userFiles .fileOperationsFolderAdd", (event) => {
        let folder = $(event.target).data("folder") || ""
        inputPrompt.show("Create Library", "Name")
        .then( value => {
          storage.createFolder(folder+value, "user")
          this.initPane("user", "#userFiles", conf.backend.user, permissions, folder)
        })
      })
      .on("click", "#globalFiles .fileOperationsFolderAdd", (event) => {
        let folder = $(event.target).data("folder") || ""
        inputPrompt.show("Create Library", "Name")
        .then( value => {
          storage.createFolder(folder+value, "global")
          this.initPane("global", "#globalFiles", conf.backend.global, permissions.global, folder)
        })
      })
      .on("click", "#userFiles .fileOperationsDocumentAdd", (event) => {
        let folder = $(event.target).data("folder") || ""
        this.app.fileNew(folder+conf.fileNew, "user")
        this.app.fileSave()
      })
      .on("click", "#globalFiles .fileOperationsDocumentAdd", (event) => {
        let folder = $(event.target).data("folder") || ""
        this.app.fileNew(folder+conf.fileNew, "global")
        this.app.fileSave()
      })
  }

  initTabs(permissions) {
    let fileScreen = this;
    // user can see private files and the demo files
    //
    if(permissions.list===true && permissions.global.list===true) {
      $('#material-tabs').each(function () {
        let $active, $content, $links = $(this).find('a');
        $active = $($links[0]);
        $active.addClass('active');
        $content = $($active[0].hash);
        $links.not($active).each(function () {
          $(this.hash).hide()
        })

        $(this).on('click', 'a', function (e) {
          $active.removeClass('active')
          $content.css('display', 'none')

          $active = $(this)
          $content = $(this.hash)

          $active.addClass('active')
          $content.css('display', 'inline-block') // jQuery show adds "display:block" which do not work for me

          e.preventDefault()
          fileScreen.onTabClick()
        })
      })
    }
    else if (permissions.list===false && permissions.global.list===true){
      $('#material-tabs').remove()
      $("#globalFiles").show()
      $("#userFiles").remove()
      $("#files .title span").html("Open a document")
    }
    else if (permissions.list===true && permissions.global.list===false){
      $('#material-tabs').remove()
      $("#globalFiles").remove()
      $("#userFiles").show()
      $("#files .title span").html("Open a document")
    }
    else if (permissions.list===true && permissions.global.list===false) {
    }
  }

  initPane(scope, paneSelector, backendConf, permissions, initialPath) {
    let storage = require("./BackendStorage").default(this.conf)
    if(permissions.list===false){
      return
    }

    let _this = this
    // load demo files
    //
    function loadPane(path) {
      if(path==="/") path = ""

      storage.getFiles( path, scope).then((files) => {
        files = files.filter(file => file.name.endsWith(_this.conf.fileSuffix) || file.type === "dir")
        files = files.map(file => {
          return {
            ...file,
            delete: permissions.delete,
            update: permissions.update,
            scope: scope,
            title: file.name.replace(_this.conf.fileSuffix,""),
            image: backendConf.image(file.filePath)
          }
        })

        if (path.length !== 0) {
          files.unshift({
            name: fs.dirname(path),
            folder: "", // important. Otherwise Hogan makes a lookup fallback to the root element
            type: "dir",
            dir: true,
            delete: false,
            update: false,
            scope: scope,
            back:"_back",
            title: ".."
          })
        }
        let compiled = Hogan.compile($("#filesTemplate").html())
        let output = compiled.render({folder: path, files: files})
        $(paneSelector).html($(output))
        if(permissions.create === false){
          $(paneSelector + " .fileOperations").remove()
        }

        if(permissions.delete === true) {

          $(paneSelector+ " .deleteIcon").on("click", (event) => {
            let $el = $(event.target).closest(".list-group-item")
            let name = $el.data("name")
            $el.addClass("spinner")
            $(event.target).remove()
            storage.deleteFile(name, scope).then(() => {
              let parent = $el.closest(".list-group-item")
              parent.hide('slow', () => parent.remove())
            })
          })
          $(paneSelector + " [data-toggle='confirmation']").popConfirm({
            title: "Delete File?",
            content: "",
            placement: "bottom" // (top, right, bottom, left)
          })
        }


        // Rename of a file or folder is the very same as delete -> create
        // I this case the user must have the two permissions to rename a folder or file
        if (permissions.delete === true && permissions.create === true) {
          $(paneSelector + " .list-group-item .editIcon").off("click").on("click", (event) => {
            // check if the editor is already visible. We can do on/off of events or do it this way....
            if($(".filenameInplaceEdit").length>0){
              $(".filenameInplaceEdit").focus()
              $("#filenameHelpBlock").html("press ESC if you want abort the rename operation")
              return
            }

            Mousetrap.pause()

            let parent = $(event.currentTarget).closest(".list-group-item")
            let $el = parent.find("h4")
            let name = parent.data("name")
            let folder = parent.data("folder")
            let title = parent.data("title")
            let type = parent.data("type")
            let $replaceWith = $(`
                   <input type="text" class="filenameInplaceEdit" value="${title}" />
                   <small id="filenameHelpBlock" class="form-text text-muted">
                   </small>`)
            $el.hide()
            $el.after($replaceWith)
            $replaceWith.focus()
            $replaceWith.on("click", () => false)

            // Rename the file on the Server
            //
            function fire(){
              Mousetrap.unpause()
              let newName = $replaceWith.val()
              if (newName !== "") {
                if (type !== "dir") {
                  newName = storage.sanitize(newName) + _this.conf.fileSuffix
                }
                // nothing to do
                if(newName === title){
                  $replaceWith.remove()
                  $el.show()
                  return
                }

                newName = folder + newName
                axios.post(_this.conf.backend[scope].rename, {from: name, to: newName})
                  .then((response) => {
                    let resTitle = response.data.name.replace(_this.conf.fileSuffix,"")
                    let resName = response.data.filePath
                    $replaceWith.remove()
                    $el.html(resTitle)
                    $el.show()
                    parent.data("title", resTitle)
                    parent.data("name", resName)
                  })
                  .catch((error)=>{
                    $("#filenameHelpBlock").html("invalid file name")
                  })
              } else {
                // get the value and post them here
                $replaceWith.remove()
                $el.show()
              }
            }

            // Cancel the rename operation
            //
            function cancel(){
              $replaceWith.remove()
              $el.show()
            }

            $replaceWith.on("keydown",(e) => {
              switch(e.which){
                case 13 : fire(); break;
                case 27 : cancel(); break;
              }
            })
            event.preventDefault()
            event.stopPropagation()
            return false
          })
        }


        $(paneSelector + " .list-group-item[data-type='dir'] .thumb").on("click", (event) => {
          // check if the editor is already visible. We can do on/off of events or do it this way....
          if($(".filenameInplaceEdit").length>0){
            $(".filenameInplaceEdit").focus()
            $("#filenameHelpBlock").html("press ESC if you want abort the rename operation")
            return
          }
          let $el = $(event.currentTarget).parent()
          let name = $el.data("name")
          if(name !=="" && !name.endsWith("/")){
            name = name +"/"
          }
          loadPane(name)
        })

        $(paneSelector + " .list-group-item[data-type='file']").on("click", (event) => {
          // check if the editor is already visible. We can do on/off of events or do it this way....
          if($(".filenameInplaceEdit").length>0){
            $(".filenameInplaceEdit").focus()
            $("#filenameHelpBlock").html("press ESC if you want abort the rename operation")
            return
          }
          let $el = $(event.currentTarget)
          let name = $el.data("name")
          $el.addClass("spinner")
          app.load(name, scope).then(() => {
            $el.removeClass("spinner")
            history.pushState({
              id: 'editor',
              scope: scope,
              file: name
            }, _this.conf.appName+' | ' + name, window.location.href.split('?')[0] + '?'+scope+'=' + name)
          })
        })
      })
    }
    loadPane(initialPath)
  }
}
