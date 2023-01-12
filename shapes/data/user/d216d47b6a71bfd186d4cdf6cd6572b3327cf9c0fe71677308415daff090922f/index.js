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
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(58,25,192,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
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

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:82},attr), setter, getter);
     var port;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 82;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,82 L0,82");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M19 15L19 82L37.54283510886671 82L35.69140293311648 78.02959088624903L34.500329264702486 73.58444344016971L34.09924243511159 69L34.500329264702486 64.4155565598312L35.69140293311648 59.970409113750975L37.63627326965252 55.799621217555796L40.275846373286186 52.02992015095151L43.52992015095151 48.775846373286186L47.299621217555796 46.13627326965252L51.470409113750975 44.19140293311648L55.91555655983029 43.000329264702486L60.5 42.59924243511159L65.0844434401688 43.000329264702486L69.52959088624903 44.19140293311648L73.7003787824442 46.13627326965252L77.47007984904849 48.775846373286186L80 51.3057665242377L80 15L19 15Z');
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


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var NewComponent3 = CircuitFigure.extend({

   NAME: "NewComponent3",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:94.8261567290374,height:136.9130783645187},attr), setter, getter);
     var port;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 94.8261567290374;
      this.originalHeight= 136.9130783645187;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L94.8261567290374,0 L94.8261567290374,136.9130783645187 L0,136.9130783645187");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M22.913078364518697 87.91842145395913L22.913078364518697 136.9130783645187L41.45591347338541 136.9130783645187L39.604481297635175 132.94266925076772L38.41340762922118 128.4975218046884L38.01232079963029 123.9130783645187L38.41340762922118 119.3286349243499L39.604481297635175 114.88348747826967L41.54935163417122 110.71269958207449L44.18892473780488 106.94299851547021L47.44299851547021 103.68892473780488L51.21269958207449 101.04935163417122L55.38348747826967 99.10448129763517L59.82863492434899 97.91340762922118L64.4130783645187 97.51232079963029L68.9975218046875 97.91340762922118L73.44266925076772 99.10448129763517L77.6134571469629 101.04935163417122L81.38315821356719 103.68892473780488L83.9130783645187 106.2188448887564L83.9130783645187 77.63330111402047L88.47400869981448 71.1196175467785L91.96679823240083 63.62930622226213L94.10584553207173 55.64627302009649L94.8261567290374 47.4130783645187L94.10584553207173 39.179883708940906L91.96679823240083 31.196850506775263L88.47400869981448 23.706539182258894L83.73360357682304 16.9365390547091L77.88961767432829 11.09255315221435L71.1196175467785 6.352148029222917L63.62930622226304 2.8593584966365597L55.64627302009649 0.720311196964758L47.4130783645187 0L39.179883708940906 0.7203111969656675L31.196850506775263 2.8593584966365597L23.706539182258894 6.352148029222917L16.9365390547091 11.09255315221435L11.09255315221435 16.9365390547091L6.352148029222917 23.706539182258894L2.8593584966365597 31.196850506775263L0.720311196964758 39.179883708940906L0 47.4130783645187L0.7203111969656675 55.64627302009649L2.8593584966365597 63.62930622226213L6.352148029222917 71.1196175467785L11.09255315221435 77.88961767432829L16.9365390547091 83.73360357682304L22.913078364518697 87.91842145395913Z');
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
NewComponent3 = NewComponent3.extend({

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


