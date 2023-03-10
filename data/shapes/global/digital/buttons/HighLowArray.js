var digital_buttons_HighLowArray = CircuitFigure.extend({

   NAME: "digital_buttons_HighLowArray",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:20,height:160 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // port01
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 6.25 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port01");
     port.setMaxFanOut(20);
     this.read["port01"] = port.getValue.bind(port)
     this.write["port01"]= port.setValue.bind(port)

     // port02
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 18.75 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port02");
     port.setMaxFanOut(20);
     this.read["port02"] = port.getValue.bind(port)
     this.write["port02"]= port.setValue.bind(port)

     // port03
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 31.25 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port03");
     port.setMaxFanOut(20);
     this.read["port03"] = port.getValue.bind(port)
     this.write["port03"]= port.setValue.bind(port)

     // port04
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 43.75 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port04");
     port.setMaxFanOut(20);
     this.read["port04"] = port.getValue.bind(port)
     this.write["port04"]= port.setValue.bind(port)

     // port05
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 56.434937500000046 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port05");
     port.setMaxFanOut(20);
     this.read["port05"] = port.getValue.bind(port)
     this.write["port05"]= port.setValue.bind(port)

     // port06
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 68.72787499999959 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port06");
     port.setMaxFanOut(20);
     this.read["port06"] = port.getValue.bind(port)
     this.write["port06"]= port.setValue.bind(port)

     // port07
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 81.1621875000003 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port07");
     port.setMaxFanOut(20);
     this.read["port07"] = port.getValue.bind(port)
     this.write["port07"]= port.setValue.bind(port)

     // port08
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 93.93256250000036 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port08");
     port.setMaxFanOut(20);
     this.read["port08"] = port.getValue.bind(port)
     this.write["port08"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 20;
      this.originalHeight= 160;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L20,0 L20,160 L0,160");
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
       
       // rect05
       shape = this.canvas.paper.path('M20 100L0 100L0 80L20 80Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect05");
       
       // rect06
       shape = this.canvas.paper.path('M20 120L0 120L0 100L20 100Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect06");
       
       // rect07
       shape = this.canvas.paper.path('M20 140L0 140L0 120L20 120Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect07");
       
       // rect08
       shape = this.canvas.paper.path('M20 160L0 160L0 140L20 140Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect08");
       

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
digital_buttons_HighLowArray = digital_buttons_HighLowArray.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.bitCount = 8;
        
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