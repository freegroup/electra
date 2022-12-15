import conf from "../../configuration"
import Hogan from "hogan.js";
import TreeView from "js-treeview";

/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */

export default class Palette {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor(view, id, permissions) {
    // remove all classes from the other editors
    $("#paletteElementsScroll, #paletteFilter").removeClass("pages")

    this.view = view
    $.getJSON(conf.shapes.jsonUrl, (data) => {
      let tmpl = Hogan.compile($("#shapeTemplate").html());
      data = data.map( shape=> {
        shape.imageUrl = conf.shapes[shape.scope].image(shape.imagePath)
        return shape
      })
      let html = tmpl.render({ shapes: data })

      $(id).html(html)
      this.buildTree(data)


      // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
      //
      $(".draw2d_droppable").draggable({
        appendTo: "body",
        helper: "clone",
        drag: (event, ui) => {
          event = this.view._getEvent(event)
          let pos = this.view.fromDocumentToCanvasCoordinate(event.clientX, event.clientY)
          this.view.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey)
        },
        stop: (e, ui) => {
        },
        start: (e, ui) => {
          $(ui.helper).addClass("shadow")
        }
      })

      $('.draw2d_droppable')
        .on('mouseover', () => {
          $(this).parent().addClass('glowBorder')
        })
        .on('mouseout', () => {
          $(this).parent().removeClass('glowBorder')
        })
    })
  }

  buildTree(data) {
    let tree = []
    data.forEach(element => {
      tree.push(element.basedir.split("/"))
    })

    function arrangeIntoTree(paths) {
      let tree = []

      for (let i = 0; i < paths.length; i++) {
        let path = paths[i]
        let currentLevel = tree
        let rootPath = null
        for (let j = 0; j < path.length; j++) {
          let part = path[j]
          let existingPath = findWhere(currentLevel, 'name', part)
          rootPath = rootPath? rootPath+"/"+part:part
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

        if (t < array.length) {
          return array[t]
        } else {
          return false
        }
      }
    }

    tree = arrangeIntoTree(tree)
    //
    // Create tree
    //

    new TreeView(tree, 'paletteFilter');
    $("#paletteElements").shuffle()
    $(".tree-leaf-content").on("click", (event) => {
      try {
        $(".tree-leaf-content").removeClass("selected")
        let target = $(event.currentTarget)
        target.addClass("selected")
        let path = target.data("item").path.toLowerCase()
        let $grid = $("#paletteElements")

        $grid.shuffle('shuffle', function ($el, shuffle) {
          return $el.data("dir").trim().toLowerCase()===path
        })

        return false
      }
      catch(e){
        console.log(e)
      }
    })
  }
}
