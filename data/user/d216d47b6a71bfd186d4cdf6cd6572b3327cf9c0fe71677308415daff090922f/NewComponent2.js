// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var NewComponent2 = CircuitFigure.extend({

   NAME: "NewComponent2",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:62.4819974072534,height:89},attr), setter, getter);
     var port;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 62.4819974072534;
      this.originalHeight= 89;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L62.4819974072534,0 L62.4819974072534,89 L0,89");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 45.02433450574972L0 89L51 89L51 0L42.46164007346033 0L42.85533905932698 5.201298701299493L42.31821201600087 12.297476982625994L40.72315121943393 19.178041477708575L38.118621784789866 25.63392971610756L34.58376102098555 31.4689828005221L30.22597388360191 36.50590559568445L25.177669529663945 40.591653751249396L19.59223813239896 43.602083877008226L13.639390198448382 45.44572557693209L7.5 46.06656073090562L1.3606098015516181 45.44572557693209L0 45.02433450574972Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":31.240998703626616,"ry":31.240998703626616,"cx":31.240998703626616,"cy":50.50000000000037,"stroke":"none","stroke-width":0,"fill":"rgba(149,192,106,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
NewComponent2 = NewComponent2.extend({

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