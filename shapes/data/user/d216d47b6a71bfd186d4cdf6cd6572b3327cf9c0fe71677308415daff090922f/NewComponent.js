// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var NewComponent = CircuitFigure.extend({

   NAME: "NewComponent",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:74,height:88},attr), setter, getter);
     var port;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 74;
      this.originalHeight= 88;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L74,0 L74,88 L0,88");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M13 21L13 88L31.54283510886671 88L29.69140293311648 84.02959088624903L28.500329264702486 79.58444344016971L28.09924243511159 75L28.500329264702486 70.4155565598312L29.69140293311648 65.97040911375097L31.63627326965252 61.799621217555796L34.275846373286186 58.02992015095151L37.52992015095151 54.775846373286186L41.299621217555796 52.13627326965252L45.470409113750975 50.19140293311648L49.91555655983029 49.000329264702486L54.5 48.59924243511159L59.0844434401688 49.000329264702486L63.529590886249025 50.19140293311648L67.7003787824442 52.13627326965252L71.47007984904849 54.775846373286186L74 57.3057665242377L74 21L13 21Z');
       shape.attr({});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":34,"ry":34,"cx":34,"cy":34,"stroke":"none","stroke-width":0,"fill":"rgba(149,192,106,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
NewComponent = NewComponent.extend({

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

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});