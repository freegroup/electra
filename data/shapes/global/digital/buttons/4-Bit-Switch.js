var digital_buttons_4_Bit_Switch = CircuitFigure.extend({

   NAME: "digital_buttons_4_Bit_Switch",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:20,height:80 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // port01
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 11.86262499999998 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port01");
     port.setMaxFanOut(20);
     this.read["port01"] = port.getValue.bind(port)
     this.write["port01"]= port.setValue.bind(port)

     // port02
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 38.125 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port02");
     port.setMaxFanOut(20);
     this.read["port02"] = port.getValue.bind(port)
     this.write["port02"]= port.setValue.bind(port)

     // port03
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 62.5 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port03");
     port.setMaxFanOut(20);
     this.read["port03"] = port.getValue.bind(port)
     this.write["port03"]= port.setValue.bind(port)

     // port04
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 87.5 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port04");
     port.setMaxFanOut(20);
     this.read["port04"] = port.getValue.bind(port)
     this.write["port04"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 20;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L20,0 L20,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // rect01
       shape = this.canvas.paper.path('M20 20L0 20L0 0L20 0Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect01");
       
       // rect02
       shape = this.canvas.paper.path('M20 40L0 40L0 20L20 20Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect02");
       
       // rect03
       shape = this.canvas.paper.path('M20 60L0 60L0 40L20 40Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect03");
       
       // rect04
       shape = this.canvas.paper.path('M20 80L0 80L0 60L20 60Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect04");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custome code and event handler here.
 *
 *
 */
digital_buttons_4_Bit_Switch = digital_buttons_4_Bit_Switch.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.bitCount = 4;
        
        this.setResizeable(false);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.on("click",(emitter, event) => {
            var h = emitter.getHeight();
            var modh = h/this.bitCount;
            var index = (event.relY/modh)|0;
            var port = emitter.getOutputPort(index);
            port.setValue(!port.getBooleanValue());
            emitter.layerAttr("rect0"+(index+1), {fill:port.getBooleanValue()?"#C21B7A":"#FFFFFF"});
        });
        this.on("added",(emitter, event)=>{
            this.getOutputPorts().each( (index, port) => {
                this.layerAttr("rect0"+(index+1), {fill:port.getBooleanValue()?"#C21B7A":"#FFFFFF"});
            })
        });
    },
    
    calculate: function()
    {
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
      state: this.getOutputPorts().asArray().map( p => p.getValue() )
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
    this._super(memento)

    // and add all children of the JSON document.
    //
    $.each(memento.state,  (i, value) => {
      this.getOutputPort(i)?.setValue(value)
    })
  }
});