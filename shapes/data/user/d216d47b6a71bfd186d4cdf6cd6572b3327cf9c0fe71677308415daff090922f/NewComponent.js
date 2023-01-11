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

     this._super( $.extend({stroke:0, bgColor:null, width:87,height:93},attr), setter, getter);
     var port;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 87;
      this.originalHeight= 93;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L87,0 L87,93 L0,93");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M45.139769925513065 66.08055347208665L45.628684873072416 65.94954910672095L51 63.4448637286705L55.85477872934189 60.04551106604504L60.04551106604504 55.85477872934189L60.981060283084844 54.51867597981709L62.91555655983029 54.000329264702486L67.5 53.59924243511159L72.0844434401688 54.000329264702486L76.52959088624903 55.19140293311648L80.7003787824442 57.13627326965252L84.47007984904849 59.775846373286186L87 62.3057665242377L87 26L66.92185228804829 26L65.94954910672095 22.371315126927584L63.4448637286705 17L60.04551106604504 12.145221270657203L55.85477872934189 7.954488933954963L51 4.555136271329502L45.628684873072416 2.0504508932790486L39.904038040675914 0.5165363975847868L34 0L28.095961959324086 0.5165363975847868L22.371315126927584 2.0504508932790486L17 4.555136271329502L12.145221270657203 7.954488933954963L7.954488933954963 12.145221270658112L4.555136271329502 17L2.0504508932790486 22.371315126927584L0.5165363975847868 28.095961959324086L0 34L0.5165363975847868 39.904038040675914L2.0504508932790486 45.628684873072416L4.555136271329502 51L7.954488933954963 55.8547787293428L12.145221270658112 60.04551106604504L17 63.4448637286705L22.371315126927584 65.94954910672095L26 66.92185228804829L26 93L44.54283510886671 93L42.69140293311648 89.02959088624903L41.500329264702486 84.58444344016971L41.09924243511159 80L41.500329264702486 75.4155565598312L42.69140293311648 70.97040911375097L44.63627326965252 66.7996212175558L45.139769925513065 66.08055347208665Z');
       shape.attr({});
       shape.data("name","Rectangle");
       

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