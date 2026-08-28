import SelectionToolPolicy from "./SelectionToolPolicy"

export default draw2d.policy.canvas.SelectionPolicy.extend({

  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  executed: function(){
    let canvas = this.canvas
    let selection = canvas.getSelection().getAll()
    canvas.installEditPolicy(new SelectionToolPolicy())
    canvas.setCurrentSelection(selection)
  },

  /**
   * @inheritdoc
   */
  select: function (canvas, figure) {
    if (canvas.getSelection().contains(figure)) {
      return // nothing to to
    }

    let oldSelection = canvas.getSelection().getPrimary()

    if (figure !== null) {
      figure.select(true)
    }

    if (oldSelection !== figure) {
      canvas.getSelection().setPrimary(figure)

      // inform all selection listeners about the new selection.
      //
      canvas.fireEvent("select", {figure: figure, selection: canvas.getSelection()})
    }
  }

})




