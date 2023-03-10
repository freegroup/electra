var digital_decoder_BCDto7Seg = CircuitFigure.extend({

   NAME: "digital_decoder_BCDto7Seg",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:87,height:185 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 9.45945945945946 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     this.read["out_a"] = port.getValue.bind(port)
     this.write["out_a"]= port.setValue.bind(port)

     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 22.972972972972975 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     this.read["out_b"] = port.getValue.bind(port)
     this.write["out_b"]= port.setValue.bind(port)

     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 36.48648648648649 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     this.read["out_c"] = port.getValue.bind(port)
     this.write["out_c"]= port.setValue.bind(port)

     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(20);
     this.read["out_d"] = port.getValue.bind(port)
     this.write["out_d"]= port.setValue.bind(port)

     // out_e
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 63.513513513513516 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_e");
     port.setMaxFanOut(20);
     this.read["out_e"] = port.getValue.bind(port)
     this.write["out_e"]= port.setValue.bind(port)

     // out_f
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 77.02702702702703 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_f");
     port.setMaxFanOut(20);
     this.read["out_f"] = port.getValue.bind(port)
     this.write["out_f"]= port.setValue.bind(port)

     // in_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.7563218390786532, y: 9.45945945945946 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_a");
     port.setMaxFanOut(1);
     this.read["in_a"] = port.getValue.bind(port)
     this.write["in_a"]= port.setValue.bind(port)

     // in_b
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2988505747126435, y: 22.972972972972975 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_b");
     port.setMaxFanOut(1);
     this.read["in_b"] = port.getValue.bind(port)
     this.write["in_b"]= port.setValue.bind(port)

     // in_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.7563218390786532, y: 36.48648648648649 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_c");
     port.setMaxFanOut(1);
     this.read["in_c"] = port.getValue.bind(port)
     this.write["in_c"]= port.setValue.bind(port)

     // in_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2988505747126435, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_d");
     port.setMaxFanOut(1);
     this.read["in_d"] = port.getValue.bind(port)
     this.write["in_d"]= port.setValue.bind(port)

     // out_g
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 90.54054054054055 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_g");
     port.setMaxFanOut(20);
     this.read["out_g"] = port.getValue.bind(port)
     this.write["out_g"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 87;
      this.originalHeight= 185;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L87,0 L87,185 L0,185");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L84,0Q87,0 87, 3L87,182Q87,185 84, 185L3,185Q0,185 0, 182L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'BCD');
       shape.attr({"x":29.3359375,"y":13.5,"text-anchor":"start","text":"BCD","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'7-Seg');
       shape.attr({"x":29.3359375,"y":44.01,"text-anchor":"start","text":"7-Seg","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":72,"y":15.5,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":73,"y":40.5,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":73,"y":66,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":73,"y":90,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'E');
       shape.attr({"x":73,"y":115,"text-anchor":"start","text":"E","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'F');
       shape.attr({"x":73,"y":140,"text-anchor":"start","text":"F","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":7.472000000001572,"y":14.5,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label B
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":7.472000000001572,"y":39.5,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label B");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":7,"y":65,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":6.472000000001572,"y":90,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'to');
       shape.attr({"x":38.3359375,"y":28.4965625,"text-anchor":"start","text":"to","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'G');
       shape.attr({"x":72,"y":165.0703999999996,"text-anchor":"start","text":"G","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_decoder_BCDto7Seg = digital_decoder_BCDto7Seg.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var e = (this.getInputPort("in_a").getBooleanValue()?1:0) +
                (this.getInputPort("in_b").getBooleanValue()?2:0) +
                (this.getInputPort("in_c").getBooleanValue()?4:0) +
                (this.getInputPort("in_d").getBooleanValue()?8:0);

       this.getOutputPort("out_a").setValue( ((e!=1) &&(e!=4)&&(e!=6)&& (e<10)));
       this.getOutputPort("out_b").setValue( ((e!=5) &&(e!=6)&& (e<10)));
       this.getOutputPort("out_c").setValue( ((e!=2) &&(e<10)));
       this.getOutputPort("out_d").setValue( (((e!==1)&&(e!==4)&&(e!==7))||(e>10)));
       this.getOutputPort("out_e").setValue( (((e===0)||(e===2)||(e===6)||(e===8))||(e>9)));
       this.getOutputPort("out_f").setValue( ((e!=1) &&(e!=2)&&(e!=3)&&(e!=7)&&(e<10)));
       this.getOutputPort("out_g").setValue( (((e!==0)&&(e!==1)&&(e!==7))||(e>9)));
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function(context)
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function(context)
    {
    }
});