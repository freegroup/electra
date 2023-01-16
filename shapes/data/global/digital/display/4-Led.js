// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_4_Led = CircuitFigure.extend({

   NAME: "digital_display_4_Led",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:20,height:159.90060000000085},attr), setter, getter);
     var port;
     // port0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -27.5, y: 6.253885226196742 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port0");
     port.setMaxFanOut(1);
     // port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 18.655777401710985 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port1");
     port.setMaxFanOut(1);
     // port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 31.273491156380995 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port2");
     port.setMaxFanOut(1);
     // port3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 43.77719658337719 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port3");
     port.setMaxFanOut(1);
     // port4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -27.5, y: 56.25388522619674 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port4");
     port.setMaxFanOut(1);
     // port5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 68.79273748816415 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port5");
     port.setMaxFanOut(1);
     // port6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 81.16805065146734 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port6");
     port.setMaxFanOut(1);
     // port7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -26.38850000000275, y: 93.74611477380326 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port7");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 20;
      this.originalHeight= 159.90060000000085;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L20,0 L20,159.90060000000085 L0,159.90060000000085");
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
       
       // led4
       shape = this.canvas.paper.path('M0 80L20 80L20 100L0 100Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led4");
       
       // led5
       shape = this.canvas.paper.path('M0 100L20 100L20 120L0 120Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led5");
       
       // led6
       shape = this.canvas.paper.path('M0 120L20 120L20 140L0 140Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led6");
       
       // led7
       shape = this.canvas.paper.path('M0 139.90060000000085L20 139.90060000000085L20 159.90060000000085L0 159.90060000000085Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led7");
       
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