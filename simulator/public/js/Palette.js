import componentIndex from "../../common/js/ComponentIndex"
import Hogan from "hogan.js"
import TreeView from "js-treeview"
import jsonStorage from "../../common/js/JsonStorage"

/**
 * @author Andreas Herz
 */
export default class Palette {
  /**
   * @constructor
   */
  constructor() {
    this.CATEGORY_KEY = "simulator.palette.categories"

    this.refreshUI();
  }

  refreshUI(){
    let storedCategories = jsonStorage.getItem(this.CATEGORY_KEY)
    let defaultCategories = storedCategories ?? ["digital"]

    // The components resolved for the current context (preloaded at boot for the
    // apps scope, reloaded on every document open). Every entry names an exact
    // version by uuid, so its preview is addressed the same way.
    let data = componentIndex.catalog
    data.forEach((shape) => {
      shape.imageUrl = componentIndex.imageUrl(shape)
    })
    this.buildCategory(data, defaultCategories)
    this.buildPalette(data, defaultCategories)
    this.buildTree(data, defaultCategories)
  }

  // Components out of the caller's own workspace go into one bucket, everything
  // else is filed under its first tag. Same split as before, only the test
  // changed: `scope` used to be the storage tier ("global" / "user"), now it is
  // the scope a component comes from.
  isOwn(shape) {
    return shape.scope === "user" || String(shape.scope || "").startsWith("users/")
  }

  buildCategory(data, selectedCategories){
    // We build a category filter by using the first "tag" of the shape
    //
    let categories = new Set()
    data.forEach( shape => {
      if(this.isOwn(shape))
        categories.add("User Shapes")
      else
        categories.add(shape.tags[0])
    })

    categories = Array.from(categories).map( category => {return { name: category, selected: selectedCategories.includes(category)?"selected":""}})
    let tmpl = Hogan.compile($("#shapeCategory").html())
    let html = tmpl.render({ categories: categories})
    $(".paletteFilterTitle").html(html)
    $('#shape-category-select').multiselect({ 
      onChange: () => {
        var selectedOptions = $('#shape-category-select option:selected')
        var values = [];
        selectedOptions.each(( index, selectedOption) => {
          values.push($(selectedOption).val());
        });
        jsonStorage.setItem(this.CATEGORY_KEY, values)
        this.buildPalette(data, values)
        this.buildTree(data, values)
      }
    })
  }

  buildPalette(data, selectedCategories){
    data = data.filter( shape => selectedCategories.includes(shape.tags[0]))
    let tmpl = Hogan.compile($("#shapeTemplate").html())
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
      .on('mouseover', (e) => { $(e.currentTarget).parent().addClass('glowBorder') })
      .on('mouseout',  (e) => { $(e.currentTarget).parent().removeClass('glowBorder') })
  }

  buildTree(data, selectedCategories) {
    data = data.filter( shape => selectedCategories.includes(shape.tags[0]))

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
    let treeView = new TreeView(tree, 'paletteFilter')

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

    // check whenever only "one" root element exists. In this case we expand them by default
    if($("#paletteFilter > .tree-leaf").length === 1){
      $("#paletteFilter .tree-expando").first().click()
    }
  }
}
