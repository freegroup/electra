var NewComponent = CircuitFigure.extend({

   NAME: "NewComponent",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:106,height:121 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 106;
      this.originalHeight= 121;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L106,0 L106,121 L0,121");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 0L106 0L106 121L0 121Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
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


