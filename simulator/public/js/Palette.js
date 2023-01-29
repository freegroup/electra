import conf from "./Configuration"
import Hogan from "hogan.js"
import TreeView from "js-treeview"

/**
 * @author Andreas Herz
 */
export default class Palette {
  /**
   * @constructor
   *
   * @param {Object} permissions The permissions of the current loggedin user
   */
  constructor(permissions) {
    this.refreshUI();

    // Add an "loader" icon to a shape whenn the backend is calculating the thumbnail
    let startGenerateEventMethod = (msg) => {
      $("div[data-file='" + msg.filePath + "'] ").addClass("spinner")
    }
    socket.on("shape/generating", startGenerateEventMethod)
 
    // Update the shape thumbnail if the backend fineshed the calculation
    //
    let endGenerateEventMethod = (msg) => {
      $("div[data-file='" + msg.filePath + "'] ").removeClass("spinner")
      let img = $("div[data-file='" + msg.filePath + "'] img")
      if (img.length === 0) {
        // insert a new shape
        this.refreshUI()
      }
      else {
        // update existing shape
        $("div[data-file='" + msg.filePath + "'] img").attr({src: conf.shapes[msg.scope]?.image(msg.imagePath)})
      }
    }
   socket.on("shape/generated", endGenerateEventMethod)
  }

  refreshUI(){
    $.getJSON(conf.shapes.jsonUrl, (data) => {
      data.forEach( shape=> shape.imageUrl = conf.shapes[shape.scope].image(shape.imagePath))
      this.buildPalette(data)
      this.buildTree(data)
    })
  }

  buildPalette(data){
    let tmpl = Hogan.compile($("#shapeTemplate").html());
    let html = tmpl.render({ shapes: data })
    $("#paletteElements").html(html)

    // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
    //
    $(".draw2d_droppable").draggable({
      appendTo: "body",
      helper: "clone",
      drag: function (event, ui) {
        event = app.view._getEvent(event)
        let pos = app.view.fromDocumentToCanvasCoordinate(event.clientX, event.clientY)
        app.view.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey)
      },
      stop: function (e, ui) {
      },
      start: function (e, ui) {
        $(ui.helper).addClass("shadow")
      }
    })

    $('.draw2d_droppable')
      .on('mouseover',() => { $(this).parent().addClass('glowBorder') })
      .on('mouseout', () => { $(this).parent().removeClass('glowBorder') })
  }

  buildTree(data) {
    let tree = data.map(element => element.basedir.split("/"))

    function arrangeIntoTree(paths) {
      let tree = []

      for (let i = 0; i < paths.length; i++) {
        let path = paths[i]
        let currentLevel = tree
        let rootPath = null
        for (let j = 0; j < path.length; j++) {
          let part = path[j]
          let existingPath = findWhere(currentLevel, 'name', part)
          rootPath = rootPath ? rootPath + "/" + part : part
          if (existingPath) {
            currentLevel = existingPath.children
          } else {
            let newPart = {
              name: part,
              path: rootPath,
              children: []
            }

            currentLevel.push(newPart)
            currentLevel = newPart.children
          }
        }
      }
      return tree

      function findWhere(array, key, value) {
        let t = 0
        while (t < array.length && array[t][key] !== value) {
          t++
        }
        return (t < array.length) ? array[t]: false
      }
    }

    tree = arrangeIntoTree(tree)
    //
    // Create tree
    //
    new TreeView(tree, 'paletteFilter')

    $(".tree-leaf-content").on("click", (event) => {
      try {
        $(".tree-leaf-content").removeClass("selected")
        let target = $(event.currentTarget)
        target.addClass("selected")
        let path = target.data("item").path.toLowerCase()
        let items = $("#paletteElements .palette_item")

        items.each( (i, e) => {
          e = $(e)
          if(e.data("dir").trim().toLowerCase().startsWith(path)){
            e.removeClass("hidden-item")
          }
          else{
            e.addClass("hidden-item")
          }
        })
        return false
      } catch (e) {
        console.log(e)
      }
    })
  }
}
