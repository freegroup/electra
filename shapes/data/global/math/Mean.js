// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var math_Mean = CircuitFigure.extend({

   NAME: "math_Mean",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:40.390625},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.5, y: 52.44197292069633 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 51.992263056092845 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 40.390625;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,40.390625 L0,40.390625");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,38Q40,40 38, 40L2,40Q0,40 0, 38L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'X');
       shape.attr({"x":12,"y":23.390625,"text-anchor":"start","text":"X","font-family":"\"Arial\"","font-size":23,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M28.405000000001564 9.709000000001652L20.725000000002183,9.709000000001652L13.045000000001892,9.709000000001652L12.02100000000155,9.709000000001652');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
math_Mean = math_Mean.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.total   = 0;    // the running total
        this.average = 0;    // the average
        this.readings = []; 
        this.readIndex = 0;
        this.numReadings =0;
        
        this.on("change:userData.numReadings",(emitter, event)=>{
            this.numReadings = parseInt(event.value);
            this.readings = []; 
            this.total =0;
            this.average = 0;
            this.readings.length = this.numReadings;
            this.pointer=0;
            this.readIndex = 0;
            this.readings.fill(0)
        });
        
        this.attr({
            resizeable:false,
            "userData.numReadings":10
        });

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        this.total = this.total - this.readings[this.readIndex];
        this.readings[this.readIndex] = this.getInputPort(0).getValue() || 0;
        this.total = this.total + this.readings[this.readIndex];
        this.readIndex = (this.readIndex+1)%this.readings.length;
        this.average = parseInt((this.total / this.readings.length)*1000)/1000;
        this.getOutputPort(0).setValue(this.average);
    },

    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },
    
    getParameterSettings:function()
    {
        return [
        {
            name:"numReadings",
            label:"Number of Readings for the average",
            property:{
                type: "integer",
                min: 10,
                max: 150,
                increment:1
        }
        }];
    }
});