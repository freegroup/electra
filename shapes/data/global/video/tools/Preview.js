// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_tools_Preview = CircuitFigure.extend({

   NAME: "video_tools_Preview",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M3.5,5.508584000000155Q3.5,3.5085840000001554 5.5, 3.5085840000001554L74.5,3.5085840000001554Q76.5,3.5085840000001554 76.5, 5.508584000000155L76.5,53.508584000000155Q76.5,55.508584000000155 74.5, 55.508584000000155L5.5,55.508584000000155Q3.5,55.508584000000155 3.5, 53.508584000000155L3.5,5.508584000000155');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(240,243,243,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M30.936231463021613,35.76911304131136Q30.872197764576413,36.19697836850173 30.786098882288115, 36.19697836850173L30.786098882288115,36.19697836850173Q30.699999999999818,36.19697836850173 30.02542399975173, 39.120152537087876L28.228848000250217,46.90534583141388Q27.55427200000213,49.828520000000026 30.55427200000213, 49.828520000000026L49.845727999999326,49.828520000000026Q52.845727999999326,49.828520000000026 52.17115199975087, 46.90534583141397L50.374576000248275,39.12015253708779Q49.69999999999982,36.19697836850173 49.61390111771152, 36.19697836850173L49.61390111771152,36.19697836850173Q49.52780223542322,36.19697836850173 49.46376853697802, 35.76911304131136L49.46376853697802,35.76911304131136Q49.39973483853282,35.34124771412098 49.189009825240646, 34.881505982345516L49.189009825240646,34.881505982345516Q48.97828481194847,34.42176425057005 48.63419792766399, 33.99039830073025L48.63419792766399,33.99039830073025Q48.29011104337951,33.55903235089045 47.82311719396512, 33.1691490190874L47.82311719396512,33.1691490190874Q47.356123344550724,32.77926568728435 46.780411901811476, 32.44271138126396L46.780411901811476,32.44271138126396Q46.20470045907223,32.10615707524357 45.5377641238706, 31.833157827294144L45.5377641238706,31.833157827294144Q44.870827788668976,31.560158579344716 44.132931084064694, 31.35900933346511L44.132931084064694,31.35900933346511Q43.39503437946041,31.157860087585505 42.60859792342853, 31.03467266183179L42.60859792342853,31.03467266183179Q41.822161467396654,30.91148523607808 41.011080733698236, 30.870002618039052L41.011080733698236,30.870002618039052Q40.19999999999982,30.828520000000026 39.3889192663014, 30.870002618039052L39.3889192663014,30.870002618039052Q38.57783853260298,30.91148523607808 37.7914020765711, 31.03467266183179L37.7914020765711,31.03467266183179Q37.004965620539224,31.157860087585505 36.26706891593494, 31.35900933346511L36.26706891593494,31.35900933346511Q35.52917221133066,31.560158579344716 34.862235876129034, 31.833157827294144L34.862235876129034,31.833157827294144Q34.19529954092741,32.10615707524357 33.61958809818816, 32.44271138126396L33.61958809818816,32.44271138126396Q33.04387665544891,32.77926568728435 32.57688280603452, 33.1691490190874L32.57688280603452,33.1691490190874Q32.109888956620125,33.55903235089045 31.765802072335646, 33.99039830073025L31.765802072335646,33.99039830073025Q31.421715188051166,34.42176425057005 31.21099017475899, 34.881505982345516L31.21099017475899,34.881505982345516Q31.000265161466814,35.34124771412098 30.936231463021613, 35.76911304131136L30.936231463021613,35.76911304131136');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Preview');
       shape.attr({"x":15.5,"y":67.50858400000016,"text-anchor":"start","text":"Preview","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8.5,"cx":39.69999999999982,"cy":19.328520000000026,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
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
video_tools_Preview = video_tools_Preview.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        
        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3-6,
            selectable: false,
            deleteable: false,
            resizeable:false,
            draggable: false,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));

        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        
        this.attr({
            resizeable:false
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
        var image = this.getInputPort("input_port1").getValue();
        if (image instanceof HTMLImageElement) {
            this.img.attr("path", image.src);
            this.getOutputPort("output_port1").setValue(image);
        }
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
    
  
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super();
    
       this.img.attr("path", currentImage);

       return memento;
    },

    setPersistentAttributes: function (memento) 
    {
        this._super(memento);

        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image);
        this.remove(this.img);
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));
        this.img.hitTest = ()=>false;
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
    },
    
    getContextMenuEntries: function(){
        return {
              "expand": {name: "Expand Image"}
        };
    },
    
    executeContextMenuEntry: function(key, x, y){
        var image = new Image();
        image.src = this.img.attr("path");
        var w = window.open("");
        w.document.write(image.outerHTML);
    },
  
});