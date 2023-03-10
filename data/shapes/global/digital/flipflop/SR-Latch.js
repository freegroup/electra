var digital_flipflop_SR_Latch = CircuitFigure.extend({

   NAME: "digital_flipflop_SR_Latch",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:40,height:63.065120000000206 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 16.843553932826566 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     this.read["output_q"] = port.getValue.bind(port)
     this.write["output_q"]= port.setValue.bind(port)

     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 81.55964422171755 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     this.read["output_q_not"] = port.getValue.bind(port)
     this.write["output_q_not"]= port.setValue.bind(port)

     // input_s
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 81.65908508538081 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_s");
     port.setMaxFanOut(1);
     this.read["input_s"] = port.getValue.bind(port)
     this.write["input_s"]= port.setValue.bind(port)

     // input_r
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 16.843553932826566 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_r");
     port.setMaxFanOut(1);
     this.read["input_r"] = port.getValue.bind(port)
     this.write["input_r"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 63.065120000000206;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,63.065120000000206 L0,63.065120000000206");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1.0651200000002063Q0,0.06512000000020635 1, 0.06512000000020635L39,0.06512000000020635Q40,0.06512000000020635 40, 1.0651200000002063L40,62.065120000000206Q40,63.065120000000206 39, 63.065120000000206L1,63.065120000000206Q0,63.065120000000206 0, 62.065120000000206L0,1.0651200000002063');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":51.373600000000515,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":10.68,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'S');
       shape.attr({"x":5.978880000001482,"y":50.373600000000515,"text-anchor":"start","text":"S","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'R');
       shape.attr({"x":5.701536250001482,"y":11.122720000001827,"text-anchor":"start","text":"R","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M26.35 45.50L33.87,45.50');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
digital_flipflop_SR_Latch = digital_flipflop_SR_Latch.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    calculate:function(context)
    {
        var s = this.getInputPort("input_s").getBooleanValue();
        var r = this.getInputPort("input_r").getBooleanValue();

        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        // do nothing
        if(s===false && r===false){
           
        }
        // reset
        else if(s===false && r===true){
            q.setValue(false);
            q_.setValue(true);
        }
        // set
        else if(s===true && r===false){
            q.setValue(true);
            q_.setValue(false);
        }
        // invalid
        else if(s===true && r===true){
            q.setValue( false);
            q_.setValue( false);
        }
    }
});