import MarkdownDialog from '../dialog/MarkdownDialog'
import conf from '../Configuration'

export default draw2d.SetFigure.extend({

  NAME: "CircuitFigure",

  init: function (attr, setter, getter) {

    this._super(attr, setter, getter)

    this.persistPorts = false

    this.on("dblclick", () => {
      let pathToMD = conf.shapes.url + this.NAME + ".md"
      $.get(pathToMD, function (content) {
        new MarkdownDialog().show(content)
      })
    })
  },


  applyAlpha: function () {
  },

  layerGet: function (name) {
    if (this.svgNodes === null) return null
    let found = null
    this.svgNodes.forEach(function (shape) {
      if (found ===null && shape.data("name") === name) {
        found = shape
      }
    })
    return found
  },

  layerAttr: function (name, attributes) {
    if (this.svgNodes === null) return

    // rewrite pure RED to the brainbox "HIGH" color
    // rewrite pure BLUE to the brainbox "LOW" color
    // without affecting the original JSON Object
    this.svgNodes.forEach(function (shape) {
      if (shape.data("name") === name) {
        shape.attr(attributes)
      }
    })
  },

  layerShow: function (name, flag, duration) {
    if (this.svgNodes === null) return

    if (duration) {
      this.svgNodes.forEach(function (node) {
        if (node.data("name") === name) {
          if (flag) {
            node.attr({opacity: 0}).show().animate({opacity: 1}, duration)
          }
          else {
            node.animate({opacity: 0}, duration, function () {
              this.hide()
            })
          }
        }
      })
    }
    else {
      this.svgNodes.forEach(function (node) {
        if (node.data("name") === name) {
          if (flag) {
            node.show()
          }
          else {
            node.hide()
          }
        }
      })
    }
  },

  calculate: function ( context ) {
  },

  onStart: function (context) {
  },

  onStop: function (context) {
  },

  getParameterSettings: function () {
    return []
  },

  getRequiredHardware: function () {
    return {
      arduino: false
    }
  },


  getContextMenuEntries: function(){
    return null
  },

  executeContextMenuEntry: function(key, x, y){

  },

  onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
    // Activate a "smart insert" If the user drop this figure on connection
    //
    /*
    if (dropTarget instanceof draw2d.Connection) {
      let additionalConnection = dropTarget.getCanvas().createConnection()
      let oldSource = dropTarget.getSource()
      let oldTarget = dropTarget.getTarget()
      if (oldSource instanceof draw2d.InputPort) {
        oldSource = dropTarget.getTarget()
        oldTarget = dropTarget.getSource()
      }

      let stack = this.getCanvas().getCommandStack()
      let cmd = new draw2d.command.CommandReconnect(dropTarget)
      cmd.setNewPorts(oldSource, this.getInputPort(0))
      stack.execute(cmd)

      cmd = new draw2d.command.CommandConnect(oldTarget, this.getOutputPort(0))
      cmd.setConnection(additionalConnection)
      stack.execute(cmd)
    }
    */
  },


  /**
   * @method
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes: function () {
    let memento = this._super()

    memento.value = this.value

    // add all decorations to the memento
    //
    memento.labels = []
    this.children.each(function (i, e) {
      let childJSON = e.figure.getPersistentAttributes()
      childJSON.locator = e.locator.NAME
      childJSON.locatorAttr= e.locator.attr()
      memento.labels.push(childJSON)
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
    this._super(memento)

    if(typeof memento.value !== "undefined"){
      this.value = memento.value
    }

    // remove all decorations created in the constructor of this element
    //
    this.resetChildren()

    // and add all children of the JSON document.
    //
    $.each(memento.labels, $.proxy(function (i, json) {
      // create the figure stored in the JSON
      let figure = eval("new " + json.type + "()")
      // apply all attributes
      figure.attr(json)

      // instantiate the locator
      let locator = eval("new " + json.locator + "()")
      if(json.locatorAttr) {
        locator.attr(json.locatorAttr)
      }
      // add the new figure as child to this figure
      this.add(figure, locator)
    }, this))
  }
})

