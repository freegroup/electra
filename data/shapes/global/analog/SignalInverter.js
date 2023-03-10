var analog_SignalInverter = CircuitFigure.extend({

   NAME: "analog_SignalInverter",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:40,height:40 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.75, y: 49.770490463256465 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     this.read["input_port1"] = port.getValue.bind(port)
     this.write["input_port1"]= port.setValue.bind(port)

     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.8051628723133, y: 49.770490463256465 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
     this.read["output_port1"] = port.getValue.bind(port)
     this.write["output_port1"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,38Q40,40 38, 40L2,40Q0,40 0, 38L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'5-X');
       shape.attr({"x":7.8828125,"y":20.00489618530264,"text-anchor":"start","text":"5-X","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
analog_SignalInverter = analog_SignalInverter.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let inValue = this.getInputPort("input_port1").getValue();
        this.getOutputPort("output_port1").setValue(5-inValue);
    }

});