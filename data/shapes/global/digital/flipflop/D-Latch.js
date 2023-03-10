var digital_flipflop_D_Latch = CircuitFigure.extend({

   NAME: "digital_flipflop_D_Latch",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:40,height:53.052974999999606 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 20.526652840864077 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     this.read["output_q"] = port.getValue.bind(port)
     this.write["output_q"]= port.setValue.bind(port)

     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 79.98738525030996 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     this.read["output_q_not"] = port.getValue.bind(port)
     this.write["output_q_not"]= port.setValue.bind(port)

     // input_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.75, y: 20.526652840864077 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d");
     port.setMaxFanOut(20);
     this.read["input_d"] = port.getValue.bind(port)
     this.write["input_d"]= port.setValue.bind(port)

     // input_e
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.75, y: 79.98738525030996 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_e");
     port.setMaxFanOut(20);
     this.read["input_e"] = port.getValue.bind(port)
     this.write["input_e"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 53.052974999999606;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,53.052974999999606 L0,53.052974999999606");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,1 1, 1L39,1Q40,1 40, 2L40,50Q40,51 39, 51L1,51Q0,51 0, 50L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":4.5,"y":10.68,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.78125,"y":11.18,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":42.373599999999605,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M26.35 36.50L33.87,36.50');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'E');
       shape.attr({"x":5,"y":42.373599999999605,"text-anchor":"start","text":"E","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

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
digital_flipflop_D_Latch = digital_flipflop_D_Latch.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    calculate:function()
    {
        var d = this.getInputPort("input_d").getBooleanValue();
        var e = this.getInputPort("input_e").getBooleanValue();
        
        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        
      
        if(e===true){
            q.setValue(d);
            q_.setValue(!d)
        }
    }
});