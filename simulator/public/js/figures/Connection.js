/*jshint evil:true */
import ProbeFigure from "./ProbeFigure"
import ConnectionRouter from "../ConnectionRouter"

let router = new ConnectionRouter();

export default draw2d.Connection.extend({

  NAME: "Connection",

  init: function (attr, setter, getter) {
    this._super($.extend({
        router: router,
        corona: 4,
      }, attr),
      setter,
      getter)

    // since version 3.5.6
    //
    this.on("dragEnter", (emitter, event) => {
      this.attr({
        outlineStroke: 2,
        outlineColor: "#30ff30"
      });
    });
    this.on("dragLeave", (emitter, event) => {
      this.attr({
        outlineStroke: 0,
        outlineColor: "#303030"
      });
    });
  },

  getValue: function() {
    return this.value
  },

  /**
   * Return the ProbeFigure if the connection has any or NULL
   *
   * @return {ProbeFigure}
   */
  getProbeFigure: function() {
    let entry = this.children.find( entry => entry.figure instanceof ProbeFigure)
    return entry?.figure ?? null
  },

  disconnect: function () {
    this._super()

    // remove some decorations of the router.
    // This is a design flaw. the router creates the decoration and the connection must remove them :-/
    // Unfortunately the Router didn't have a callback when a connection is removed from the canvas.
    //
    this.vertexNodes?.remove()
    delete this.vertexNodes
  },

  add: function (figure) {
    this._super.apply(this, arguments)

    if (figure instanceof ProbeFigure && this.canvas !== null) {
      this.canvas.fireEvent("probe:add", {figure: figure})
    }
  },


  remove: function (figure) {
    this._super.apply(this, arguments)

    if (figure instanceof ProbeFigure && this.canvas !== null) {
      this.canvas.fireEvent("probe:remove", {figure: figure})
    }
  },

  setColor: function(color) {
    try {
      this.color = color
      this.shape?.[1]?.node.setAttribute("stroke", this.color.hash())
    }
    catch(e){
      console.log(color, e)
    }
  },

  /**
   * @method
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes: function () {
    let memento = this._super()

    // add all decorations to the memento
    //
    memento.labels = []
    this.children.each( (i, e) => {
      let labelJSON = e.figure.getPersistentAttributes()
      labelJSON.locator = e.locator.NAME
      memento.labels.push(labelJSON)
    })

    return memento
  },

  /**
   * @method
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    // patch the router from some legacy data
    //
    memento.router = "ConnectionRouter"

    this._super(memento)

    // remove all decorations created in the constructor of this element
    //
    this.resetChildren()

    // and add all children of the JSON document.
    //
    if (memento.labels) {
      $.each(memento.labels, (i, json) => {
        // create the figure stored in the JSON
        let figure = eval(`new ${json.type}()`)

        // apply all attributes
        figure.setPersistentAttributes(json)

        // instantiate the locator
        let locator = eval(`new ${json.locator}()`)

        // add the new figure as child to this figure
        this.add(figure, locator)
      })
    }
  }

})
