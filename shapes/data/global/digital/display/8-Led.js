// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_8_Led = CircuitFigure.extend({

   NAME: "digital_display_8_Led",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:25,height:200},attr), setter, getter);
     var port;
     // port0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 6.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port0");
     port.setMaxFanOut(20);
     // port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 19.165350000000217 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port1");
     port.setMaxFanOut(20);
     // port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 31.503250000000207 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port2");
     port.setMaxFanOut(20);
     // port3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 43.496050000000196 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port3");
     port.setMaxFanOut(20);
     // port4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 56.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port4");
     port.setMaxFanOut(20);
     // port5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 69.16535000000022 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port5");
     port.setMaxFanOut(20);
     // port6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 81.64410000000044 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port6");
     port.setMaxFanOut(20);
     // port7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -19.1108000000022, y: 94.20030000000042 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port7");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 25;
      this.originalHeight= 200;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L25,0 L25,200 L0,200");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // led1
       shape = this.canvas.paper.path('M0 25L25 25L25 50L0 50Z');
       shape.attr({});
       shape.data("name","led1");
       
       // led0
       shape = this.canvas.paper.path('M0 0L25 0L25 25L0 25Z');
       shape.attr({});
       shape.data("name","led0");
       
       // led2
       shape = this.canvas.paper.path('M0 50L25 50L25 75L0 75Z');
       shape.attr({});
       shape.data("name","led2");
       
       // led3
       shape = this.canvas.paper.path('M0 75L25 75L25 100L0 100Z');
       shape.attr({});
       shape.data("name","led3");
       
       // led4
       shape = this.canvas.paper.path('M0 100L25 100L25 125L0 125Z');
       shape.attr({});
       shape.data("name","led4");
       
       // led5
       shape = this.canvas.paper.path('M0 125L25 125L25 150L0 150Z');
       shape.attr({});
       shape.data("name","led5");
       
       // led6
       shape = this.canvas.paper.path('M0 150L25 150L25 175L0 175Z');
       shape.attr({});
       shape.data("name","led6");
       
       // led7
       shape = this.canvas.paper.path('M0 175L25 175L25 200L0 200Z');
       shape.attr({});
       shape.data("name","led7");
       

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
digital_display_8_Led = digital_display_8_Led.extend({

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
        this.layerAttr("led4",{fill: this.getInputPort("port4").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        this.layerAttr("led5",{fill: this.getInputPort("port5").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        this.layerAttr("led6",{fill: this.getInputPort("port6").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        this.layerAttr("led7",{fill: this.getInputPort("port7").getBooleanValue()?"#C21B7A":"#f0f0f0"});
        
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