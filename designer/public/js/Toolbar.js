import RectangleToolPolicy from "./policy/RectangleToolPolicy"
import CircleToolPolicy from "./policy/CircleToolPolicy"
import LineToolPolicy from "./policy/LineToolPolicy"
import TextToolPolicy from "./policy/TextToolPolicy"
import PortToolPolicy from "./policy/PortToolPolicy"
import SelectionToolPolicy from "./policy/SelectionToolPolicy"
import GeoUnionToolPolicy from "./policy/GeoUnionToolPolicy"
import GeoIntersectionToolPolicy from "./policy/GeoIntersectionToolPolicy"
import GeoDifferenceToolPolicy from "./policy/GeoDifferenceToolPolicy"

import FigureCodeEdit from "./dialog/FigureCodeEdit"
import FigureMarkdownEdit from "./dialog/FigureMarkdownEdit"
import FigureTest from "./dialog/FigureTest"
import toast from "../../common/js/toast"

export default class Toolbar {

  constructor(app, elementId, view, permissions) {
    this.html = $(elementId)
    this.view = view
    this.app = app

    // register this class as event listener for the canvas
    // CommandStack. This is required to update the state of
    // the Undo/Redo Buttons.
    //
    view.getCommandStack().on("change", this)

    // Register a Selection listener for the state handling
    // of the Delete Button
    //
    view.on("select", this.onSelectionChanged.bind(this))
    view.on("unselect", this.onSelectionChanged.bind(this))

    this.fileName = null

    let buttonGroup = $("<div id='fileOperationGroup' class='group'></div>")
    this.html.append(buttonGroup)


    if(permissions.shapes.global.update || permissions.shapes.global.create ||
       permissions.shapes.update        || permissions.shapes.create) {
      this.saveButton = $(`<div class="image-button" id="editorFileSave" ><img class="svg" src="../common/images/toolbar_save.svg"/><div data-i18n="common:toolbar.save" >${t("common:toolbar.save")}</div></div>`)
      buttonGroup.append(this.saveButton)
      this.saveButton.on("click", () => {
        this.saveButton.tooltip("hide")
        app.fileSave()
      })
      Mousetrap.bindGlobal("ctrl+s", (event) => {
        this.saveButton.click()
        return false
      })
    }

    // Inject the UNDO Button and the callbacks
    //
    buttonGroup = $('<div class="group"></div>')
    this.html.append(buttonGroup)
    this.undoButton = $(`<div class="image-button" id="editUndo"><img class="icon disabled svg"  src="../common/images/toolbar_undo.svg"/><div data-i18n="common:toolbar.undo">${t("common:toolbar.undo")}</div></div>`)
    buttonGroup.append(this.undoButton)
    this.html .delegate("#editUndo:not(.disabled)", "click", () => {
      this.view.getCommandStack().undo()
    })
    Mousetrap.bindGlobal("ctrl+z", () => {
      this.undoButton.click()
      return false
    })


    // Inject the REDO Button and the callback
    //
    this.redoButton = $(`<div class="image-button" id="editRedo"><img  class="icon disabled svg" src="../common/images/toolbar_redo.svg"/><div data-i18n="common:toolbar.redo">${t("common:toolbar.redo")}</div></div>`)
    buttonGroup.append(this.redoButton)
    this.html .delegate("#editRedo:not(.disabled)", "click", () => {
      this.view.getCommandStack().redo()
    })
    Mousetrap.bindGlobal("ctrl+y", () => {
      this.redoButton.click()
      return false
    })

    // Inject the DELETE Button
    //
    this.deleteButton = $(`<div class="image-button" id="editDelete"><img class="icon disabled svg" src="../common/images/toolbar_delete.svg"/><div data-i18n="common:toolbar.delete">${t("common:toolbar.delete")}</div></div>`)
    buttonGroup.append(this.deleteButton)
    this.html.delegate("#editDelete:not(.disabled)", "click", function () {
      view.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape)
      view.getSelection().each(function (index, figure) {
        let cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE))
        if (cmd !== null) {
          view.getCommandStack().execute(cmd)
        }
      })
      // execute all single commands at once.
      view.getCommandStack().commitTransaction()
    })
    Mousetrap.bindGlobal(["del", "backspace"], () => {
      this.deleteButton.click()
      return false
    })


    buttonGroup = $('<div class="group"></div>')
    this.html.append(buttonGroup)

    this.selectButton = $(`<div class="image-button" id="editSelect"><img class="svg" src="./images/toolbar_select.svg"/><div data-i18n="common:toolbar.select">${t("common:toolbar.select")}</div></div>`)
    buttonGroup.append(this.selectButton)
    this.selectButton.on("click", () => {
      this.view.installEditPolicy(new SelectionToolPolicy())
    })
    Mousetrap.bindGlobal("space", () => {
      this.selectButton.click()
      return false
    })

    this.shapeButton = $(`
      <div id="tool_shape" class="dropdown" >
          <div class="image-button" data-toggle="dropdown"  id="tool_shape_image" >
            <img class="svg" src="./images/toolbar_insert.svg">
            <div data-i18n="common:toolbar.add" >${t("common:toolbar.add")}</div>
          </div>
          <ul class="dropdown-menu" role="menu" >
             <li class="tool_shape_entry policyRectangleToolPolicy" ><img src="./images/toolbar_rectangle.svg"><span data-i18n="common:toolbar.rectangle" class="tool_label">${t("common:toolbar.rectangle")}</span><span class="tool_shortcut">R</span></li>
             <li class="tool_shape_entry policyCircleToolPolicy"    ><img src="./images/toolbar_circle.svg">   <span data-i18n="common:toolbar.circle" class="tool_label">${t("common:toolbar.circle")}</span><span class="tool_shortcut">C</span></li>
             <li class="tool_shape_entry policyLineToolPolicy"      ><img src="./images/toolbar_line.svg">     <span data-i18n="common:toolbar.line" class="tool_label">${t("common:toolbar.line")}</span><span class="tool_shortcut">L</span></li>
             <li class="tool_shape_entry policyTextToolPolicy"      ><img src="./images/toolbar_text.svg">     <span data-i18n="common:toolbar.text" class="tool_label">${t("common:toolbar.text")}</span><span class="tool_shortcut">T</span></li>
             <li class="tool_shape_entry policyPortToolPolicy"      ><img src="./images/toolbar_port.svg">     <span data-i18n="common:toolbar.port" class="tool_label">${t("common:toolbar.port")}</span><span class="tool_shortcut">P</span></li>
          </ul>
      </div>`
    )
    buttonGroup.append(this.shapeButton)

    $(".policyRectangleToolPolicy").on("click", () => {
      let p = new RectangleToolPolicy()
       this.view.installEditPolicy(p)
    })
    $(".policyCircleToolPolicy").on("click", () => {
      let p = new CircleToolPolicy()
      this.view.installEditPolicy(p)
    })
    $(".policyLineToolPolicy").on("click", () => {
      let p = new LineToolPolicy()
      this.view.installEditPolicy(p)
    })
    $(".policyTextToolPolicy").on("click", () => {
      let p = new TextToolPolicy()
      this.view.installEditPolicy(p)
    })
    $(".policyPortToolPolicy").on("click", () => {
      let p = new PortToolPolicy()
      this.view.installEditPolicy(p)
    })

    Mousetrap.bindGlobal(["R", "r"], () => {
      $('.policyRectangleToolPolicy').click()
      return false
    })
    Mousetrap.bindGlobal(["C", "c"], () => {
      $('.policyCircleToolPolicy').click()
      return false
    })
    Mousetrap.bindGlobal(["T", "t"], () => {
      $('.policyTextToolPolicy').click()
      return false
    })
    Mousetrap.bindGlobal(["P", "p"], () => {
      $('.policyPortToolPolicy').click()
      return false
    })
    Mousetrap.bindGlobal(["L", "l"], () => {
      $('.policyLineToolPolicy').click()
      return false
    })

    this.unionButton = $('<div class="image-button disabled" id="toolUnion" data-toggle="tooltip" title="Polygon Union <span class=\'highlight\'> [ U ]</span>" ><img class="svg" src="./images/toolbar_geo_union.svg"/><div>Union</div></div>')
    buttonGroup.append(this.unionButton)
    this.html.delegate("#toolUnion:not(.disabled)", "click", () => {
      let selection = this.view.getSelection().getAll()
      let p = new GeoUnionToolPolicy()
      p.executed = () => {
        this.selectButton.click()
      }
      this.view.installEditPolicy(p)
      p.execute(this.view, selection)
    })
    Mousetrap.bindGlobal(["U", "u"], () => {
      this.unionButton.click()
      return false
    })

    this.differenceButton = $('<div class="image-button disabled" id="toolDifference" data-toggle="tooltip"  title="Polygon Difference <span class=\'highlight\'> [ D ]</span>" ><img class="svg" src="./images/toolbar_geo_subtract.svg"/><div>Subtract</div></div>')
    buttonGroup.append(this.differenceButton)
    this.html.delegate("#toolDifference:not(.disabled)", "click", () => {
      let selection = this.view.getSelection().getAll()
      let p = new GeoDifferenceToolPolicy()
      p.executed = () => {
        this.selectButton.click()
      }
      this.view.installEditPolicy(p)
      p.execute(this.view, selection)
    })
    Mousetrap.bindGlobal(["D", "d"], () => {
      this.differenceButton.click()
      return false
    })

    this.intersectionButton = $('<div class="image-button disabled" id="toolIntersection" data-toggle="tooltip" title="Polygon Intersection <span class=\'highlight\'> [ I ]</span>" ><img class="svg" src="./images/toolbar_geo_intersect.svg"/><div>Intersect</div></div>')
    buttonGroup.append(this.intersectionButton)
    this.html.delegate("#toolIntersection:not(.disabled)", "click", () => {
      let selection = this.view.getSelection().getAll()
      let p = new GeoIntersectionToolPolicy()
      p.executed = () => {
        this.selectButton.click()
      }
      this.view.installEditPolicy(p)
      p.execute(this.view, selection)
    })
    Mousetrap.bindGlobal(["I", "i"], () => {
      this.intersectionButton.click()
      return false
    })

    buttonGroup = $('<div class="spacer"></div>')
    this.html.append(buttonGroup)

    buttonGroup = $('<div class="group"></div>')
    this.html.append(buttonGroup)
    this.testButton = $('<div class="image-button" id="editTest" data-toggle="tooltip" title="Test your shape"><img class="svg" src="./images/toolbar_element_test.svg"/><div>Test</div></div>')
    buttonGroup.append(this.testButton)
    this.testButton.on("click", () => {
      // if any error happens during the shape code create/execute -> goto the the JS editor
      try {
        new FigureTest().show()
      }
      catch (exc) {
        console.log(exc)
        new FigureCodeEdit().show()
        toast("Your code contains errors. Unable to run test environment")
      }
    })

    this.codeButton = $('<div class="image-button" id="editCode" data-toggle="tooltip" title="Edit JavaScript code</span>"><img class="svg" src="./images/toolbar_element_js.svg"/><div>Code</div></div>')
    buttonGroup.append(this.codeButton)
    this.codeButton.on("click", () => {
      new FigureCodeEdit().show()
    })

    this.markdownButton = $('<div class="image-button" id="editDoc" data-toggle="tooltip" title="Write documentation for your shape</span>"><img class="svg" src="./images/toolbar_element_doc.svg"/><div>Doku</div></div>')
    buttonGroup.append(this.markdownButton)
    $(document).on("click", "#editDoc", () => {
      new FigureMarkdownEdit().show()
    })

    // enable the tooltip for all buttons
    //
    $('*[data-toggle="tooltip"]').tooltip({
      placement: "bottom",
      container: "body",
      delay: {show: 1000, hide: 10},
      html: true
    })
  }


  /**
   * @method
   * Called if the selection in the cnavas has been changed. You must register this
   * class on the canvas to receive this event.
   *
   * @param {draw2d.Figure} figure
   */
  onSelectionChanged(emitter,  event = {figure: null}) {
    if (event.figure === null) {
      $("#editDelete").addClass("disabled")
    }
    else {
      $("#editDelete").removeClass("disabled")
    }

    // available in BoundBox selection event
    if (event.selection) {
      if (event.selection.getSize() >= 2) {
        $("#toolUnion").removeClass("disabled")
        $("#toolDifference").removeClass("disabled")
        $("#toolIntersection").removeClass("disabled")
      }
      else {
        $("#toolUnion").addClass("disabled")
        $("#toolDifference").addClass("disabled")
        $("#toolIntersection").addClass("disabled")
      }
    }
  }

  /**
   * @method
   * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
   * can be used to identify the type of event which has occurred.
   *
   * @template
   *
   * @param {draw2d.command.CommandStackEvent} event
   **/
  stackChanged(event) {
    $("#editUndo").addClass("disabled")
    $("#editRedo").addClass("disabled")

    if (event.getStack().canUndo()) {
      $("#editUndo").removeClass("disabled")
    }

    if (event.getStack().canRedo()) {
      $("#editRedo").removeClass("disabled")
    }
  }
}
