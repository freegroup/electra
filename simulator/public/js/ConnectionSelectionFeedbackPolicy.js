import inputPrompt from "../../common/js/InputPrompt"
import ProbeFigure from "./figures/ProbeFigure"

export default draw2d.policy.line.OrthogonalSelectionFeedbackPolicy.extend({

  NAME: "ConnectionSelectionFeedbackPolicy",

  /**
   * @constructor
   * Creates a new Router object.
   *
   */
  init: function () {
    this._super()
  },


  onRightMouseDown: function (conn, x, y, shiftKey, ctrlKey) {
    let segment = conn.hitSegment(x, y)

    if (segment === null) {
      return
    }

    // standard menu entry "split". It is always possible to split a connection
    //
    let items = {}

    // add/remove of connection segments is only possible in the edit mode
    //
    if (conn.getCanvas().isSimulationRunning() === false) {
      items.split = {name: t("contextmenu.add_segment")}

      // "remove" a segment isn't always possible. depends from the router algorithm
      //
      if (conn.getRouter().canRemoveSegmentAt(conn, segment.index)) {
        items.remove = {name:  t("contextmenu.deletesegment")}
      }
    }

    // add a probe label is always possible
    //
    let probeFigure = conn.getProbeFigure()
    if (probeFigure === null) {
      items.probe = {name: t("contextmenu.add_probe")}
    } else {
      items.unprobe = {name: t("contextmenu.remove_probe")}
    }

    items["delete"] = {name: t("contextmenu.delete")}

    $.contextMenu({
      selector: 'body',
      events:{
          hide: () => {$.contextMenu('destroy')}
        },
      callback: $.proxy(function (key, options) {
        let originalVertices, newVertices

        switch (key) {
          case "remove":
            // deep copy of the vertices of the connection for the command stack to avoid side effects
            originalVertices = conn.getVertices().clone(true)
            this.removeSegment(conn, segment.index)
            newVertices = conn.getVertices().clone(true)
            conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandReplaceVertices(conn, originalVertices, newVertices))
            break

          case "delete":
            conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandDelete(conn))
            break

          case "split":
            // deep copy of the vertices of the connection for the command stack to avoid side effects
            originalVertices = conn.getVertices().clone(true)
            this.splitSegment(conn, segment.index, x, y)
            newVertices = conn.getVertices().clone(true)
            conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandReplaceVertices(conn, originalVertices, newVertices))
            break

          case "probe":
            inputPrompt.show(t("dialog.add_probe"), t("label.name"))
            .then( value => {
              let label = new ProbeFigure({text: value, x: -20, y: -40})
              let locator = new draw2d.layout.locator.ManhattanMidpointLocator()
              label.installEditor(new draw2d.ui.LabelInplaceEditor())
              conn.add(label, locator)
            })
            break

          case "unprobe":
            conn.remove(conn.getProbeFigure())
            break

          default:
            break
        }
      }, this),
      x: x,
      y: y,
      items: items
    })
  }
})

