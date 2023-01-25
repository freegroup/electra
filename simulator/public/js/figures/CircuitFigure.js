import markdownDialog from '../dialog/MarkdownDialog'

export default draw2d.SetFigure.extend({

  NAME: "CircuitFigure",

  init: function (attr, setter, getter) {

    this._super(attr, setter, getter)

    this.persistPorts = false

    this.on("dblclick", () => markdownDialog.show(this) )
  },

  applyAlpha: function () {
  },

  layerGet: function (name) {
    return this.svgNodes?.items.find( shape => shape.data("name") === name) 
  },

  layerAttr: function (name, attributes) {
    this.layerGet(name)?.attr(attributes)
    // text layout do not work correct. getBBox returns old values
    /*
    let node = this.layerGet(name)?.node
    if(node) {
      for( let key in attributes){
        if(key === "text")
          node.children[0].innerHTML= attributes[key]
        else
          node.setAttribute(key, attributes[key])
      }
    }
    */
  },

  layerShow: function (name, flag, duration) {
    if (this.svgNodes === null) return

    if (duration) {
      this.svgNodes.forEach((node) => {
        if (node.data("name") === name) {
          if (flag) {
            node.attr({opacity: 0}).show().animate({opacity: 1}, duration)
          }
          else {
            node.animate({opacity: 0}, duration, () => this.hide())
          }
        }
      })
    }
    else {
      this.svgNodes.forEach( (node) => {
        if (node.data("name") === name) {
          flag?node.show():node.hide()
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
    return {
      ...this._super(), 
      value : this.value,
      labels: this.children.asArray().map( e => { return {
        ...e.figure.getPersistentAttributes(), 
        locator: e.locator.NAME, 
        locatorAttr:e.locator.attr() 
      }}),
      inputDefaults: this.inputPorts.asArray().map( p => {
        return {useDefaultValue: p.useDefaultValueProvider(), defaultValue: p.getDefaultValue() }
      })
    }
  },

  /**
   * @method
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    // ignore the width/height from the persistence. width/height is defined by the figure itself
    //
    if(this.isResizeable()===false){
      delete memento.width
      delete memento.height
    }

    this._super(memento)

    if(typeof memento.value !== "undefined"){
      this.value = memento.value
    }

    // remove all decorations created in the constructor of this element
    //
    this.resetChildren()

    // and add all children of the JSON document.
    //
    memento.labels?.forEach( json => {
      // create the figure stored in the JSON
      let figure = eval(`new ${json.type}()`)
      // apply all attributes
      figure.attr(json)

      // instantiate the locator
      let locator = eval(`new ${json.locator}()`)
      if(json.locatorAttr) {
        locator.attr(json.locatorAttr)
      }
      // add the new figure as child to this figure
      this.add(figure, locator)
    })

    memento.inputDefaults?.forEach ( (d,i) => {
      // create the figure stored in the JSON
      let p = this.getInputPort(i)
      if(d.useDefaultValue){
        p.useDefaultValue(true)
        p.setDefaultValue(d.defaultValue)
      }
    })
  }
})


