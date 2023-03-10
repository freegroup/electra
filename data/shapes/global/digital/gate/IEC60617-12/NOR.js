var digital_gate_IEC60617_12_NOR = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_NOR",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:37,height:40 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3513513513513513, y: 18.75 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(1);
     this.read["input01"] = port.getValue.bind(port)
     this.write["input01"]= port.setValue.bind(port)

     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.7027027027027026, y: 81.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(1);
     this.read["input02"] = port.getValue.bind(port)
     this.write["input02"]= port.setValue.bind(port)

     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.64864864864865, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     this.read["output"] = port.getValue.bind(port)
     this.write["output"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 37;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L37,0 L37,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'>1');
       shape.attr({"x":4,"y":17.5,"text-anchor":"start","text":">1","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4,"ry":4,"cx":33,"cy":20,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M5.16 23.71L9.79,23.59L14.43,23.47');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
digital_gate_IEC60617_12_NOR = digital_gate_IEC60617_12_NOR.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        let i1 = this.getInputPort(0);
        let i2 = this.getInputPort(1);
        let o1 = this.getOutputPort(0);
        o1.setValue(!(i1.getBooleanValue() || i2.getBooleanValue()));
    }
});