var digital_flipflop_JKR_FlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_JKR_FlipFlop",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:40,height:69.67057499999919 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 15.328835021097678 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     this.read["output_q"] = port.getValue.bind(port)
     this.write["output_q"]= port.setValue.bind(port)

     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 73.90920413675094 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     this.read["output_q_not"] = port.getValue.bind(port)
     this.write["output_q_not"]= port.setValue.bind(port)

     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 44.24027647252658 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     this.read["input_t"] = port.getValue.bind(port)
     this.write["input_t"]= port.setValue.bind(port)

     // input_j
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.717999999996664, y: 15.328835021097678 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_j");
     port.setMaxFanOut(1);
     this.read["input_j"] = port.getValue.bind(port)
     this.write["input_j"]= port.setValue.bind(port)

     // input_k
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 73.90920413675094 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_k");
     port.setMaxFanOut(1);
     this.read["input_k"] = port.getValue.bind(port)
     this.write["input_k"]= port.setValue.bind(port)

     // input_r
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 50, y: 97.69002193537226 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_r");
     port.setMaxFanOut(20);
     this.read["input_r"] = port.getValue.bind(port)
     this.write["input_r"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 69.67057499999919;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,69.67057499999919 L0,69.67057499999919");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1.122399999998379Q0,0.12239999999837892 1, 0.12239999999837892L39,0.12239999999837892Q40,0.12239999999837892 40, 1.122399999998379L40,62.12239999999838Q40,63.12239999999838 39, 63.12239999999838L1,63.12239999999838Q0,63.12239999999838 0, 62.12239999999838L0,1.122399999998379');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":27,"y":51.43087999999869,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 25.69345499999781L12.041999999999462 30.59945499999685L0 35.95145499999762Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":27,"y":10.737279999998172,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'J');
       shape.attr({"x":5,"y":10.68,"text-anchor":"start","text":"J","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'K');
       shape.attr({"x":5,"y":51.43087999999869,"text-anchor":"start","text":"K","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'CLR');
       shape.attr({"x":10,"y":59.11119999999919,"text-anchor":"start","text":"CLR","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M28.45 45.56L33.57,45.56');
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
digital_flipflop_JKR_FlipFlop = digital_flipflop_JKR_FlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t = false;
    },
    
    calculate:function(context)
    {
        var j = this.getInputPort("input_j").getBooleanValue();
        var k = this.getInputPort("input_k").getBooleanValue();
        var t = this.getInputPort("input_t").getBooleanValue();
        var r = this.getInputPort("input_r").getBooleanValue();
        
        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        
        var falling = this.last_t===true && t===false; 
        
        if(r === false){
            falling = true;
            j = false;
            k = true;
        }
        
        if(falling===true){
            // do nothing
            if(j===false && k ===false){
               
            }
            // reset
            else if(j===false && k===true){
                q.setValue(false);
                q_.setValue(true);
            }
            // set
            else if(j===true && k===false){
                q.setValue(true);
                q_.setValue(false);
            }
            // toggle
            else if(j===true && k===true){
                var v = q.getBooleanValue();
                q.setValue( !v);
                q_.setValue( v);
            }
        }
        this.last_t = t;
    }
});