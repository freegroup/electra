var digital_display_4_Led = CircuitFigure.extend({

   NAME: "digital_display_4_Led",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:20,height:80 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // port0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -27.5, y: 12.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port0");
     port.setMaxFanOut(1);
     this.read["port0"] = port.getValue.bind(port)
     this.write["port0"]= port.setValue.bind(port)

     // port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 37.28837500000054 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port1");
     port.setMaxFanOut(1);
     this.read["port1"] = port.getValue.bind(port)
     this.write["port1"]= port.setValue.bind(port)

     // port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 62.50812500000052 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port2");
     port.setMaxFanOut(1);
     this.read["port2"] = port.getValue.bind(port)
     this.write["port2"]= port.setValue.bind(port)

     // port3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 87.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port3");
     port.setMaxFanOut(1);
     this.read["port3"] = port.getValue.bind(port)
     this.write["port3"]= port.setValue.bind(port)

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
       
       // led0
       shape = this.canvas.paper.path('M0 0L20 0L20 20L0 20Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led0");
       
       // led2
       shape = this.canvas.paper.path('M0 40L20 40L20 60L0 60Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led2");
       
       // led3
       shape = this.canvas.paper.path('M0 60L20 60L20 80L0 80Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led3");
       
       // led1
       shape = this.canvas.paper.path('M0 20L20 20L20 40L0 40Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led1");
       

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
digital_display_4_Led = digital_display_4_Led.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.on("added",(emitter, event)=>{
            this.updateLayer()
        });
    },

    updateLayer: function ()
    {
        this.layerAttr("led0",{fill: this.getInputPort("port0").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        this.layerAttr("led1",{fill: this.getInputPort("port1").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        this.layerAttr("led2",{fill: this.getInputPort("port2").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        this.layerAttr("led3",{fill: this.getInputPort("port3").getBooleanValue()?"#C21B7A":"#f0f0f0"});
    },
    
    onStart: function(context)
    {
        this.updateLayer();
    },
    
    calculate: function(context)
    {
        this.updateLayer()
    }
});