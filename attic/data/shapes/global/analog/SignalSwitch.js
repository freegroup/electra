var analog_SignalSwitch = CircuitFigure.extend({

   NAME: "analog_SignalSwitch",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:40,height:84 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // input_port3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.4395000000004075, y: 81.34154761904765 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port3");
     port.setMaxFanOut(1);
     this.read["input_port3"] = port.getValue.bind(port)
     this.write["input_port3"]= port.setValue.bind(port)

     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.4395000000004075, y: 46.42857142857143 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(1);
     this.read["input_port2"] = port.getValue.bind(port)
     this.write["input_port2"]= port.setValue.bind(port)

     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.4395000000004075, y: 12.467376411074751 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     this.read["input_port1"] = port.getValue.bind(port)
     this.write["input_port1"]= port.setValue.bind(port)

     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.18416287231412, y: 30.457738095238017 }));
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
      this.originalHeight= 84;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,84 L0,84");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,78Q40,80 38, 80L2,80Q0,80 0, 78L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // high
       shape = this.canvas.paper.path('M35.00 23.94L5.03,12.31');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // low
       shape = this.canvas.paper.path('M34.92 26.97L5.28,38.44');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Selector');
       shape.attr({"x":5,"y":73.315,"text-anchor":"start","text":"Selector","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal');
       shape.attr({"x":6.5,"y":62.69,"text-anchor":"start","text":"Signal","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
analog_SignalSwitch = analog_SignalSwitch.extend({

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
        let inValue1 = this.getInputPort("input_port1").getValue();
        let inValue2 = this.getInputPort("input_port2").getValue();
        let inValue3 = this.getInputPort("input_port3").getBooleanValue();
        if(inValue3 === true){
            this.getOutputPort("output_port1").setValue(inValue1);
        }
        else{
            this.getOutputPort("output_port1").setValue(inValue2);
        }
        
        if(this.getInputPort("input_port3").hasChangedValue()){
            this.layerShow("low" , !inValue3, 100);
            this.layerShow("high",  inValue3, 100);
        }
    },
    
    onStart:function(context){
        let inValue3 = this.getInputPort("input_port3").getBooleanValue();
        this.layerShow("low" , !inValue3, 100);
        this.layerShow("high",  inValue3, 100);
    }

});