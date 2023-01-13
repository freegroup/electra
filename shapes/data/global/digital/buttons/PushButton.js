// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_buttons_PushButton = CircuitFigure.extend({

   NAME: "digital_buttons_PushButton",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:35.04322500000035,height:28.93699999999899},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 131.7741517796944, y: 82.88350554653319 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 35.04322500000035;
      this.originalHeight= 28.93699999999899;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L35.04322500000035,0 L35.04322500000035,28.93699999999899 L0,28.93699999999899");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4,"cx":4.5,"cy":22.98399999999947,"stroke":"none","stroke-width":0,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4,"cx":27.5,"cy":23.48399999999947,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // low
       shape = this.canvas.paper.path('M26.125825000000987,8.735999999999876Q24.125825000000987,8.735999999999876 24.125825000000987, 6.735999999999876L24.125825000000987,2Q24.125825000000987,0 22.125825000000987, 0L11.125825000000987,0Q9.125825000000987,0 9.125825000000987, 2L9.125825000000987,6.735999999999876Q9.125825000000987,8.735999999999876 7.125825000000987, 8.735999999999876L2.299425000001065,8.735999999999876Q0.2994250000010652,8.735999999999876 0.2994250000010652, 10.735999999999876L0.2994250000010652,11.735999999999876Q0.2994250000010652,13.735999999999876 2.299425000001065, 13.735999999999876L30.299425000001065,13.735999999999876Q32.299425000001065,13.735999999999876 32.299425000001065, 11.735999999999876L32.299425000001065,10.735999999999876Q32.299425000001065,8.735999999999876 30.299425000001065, 8.735999999999876L26.125825000000987,8.735999999999876');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       
       // Line
       shape = this.canvas.paper.path('M30.043225000000348 23.93699999999899L37.699524999999994,23.93699999999899L45.35582500000055,23.93699999999899');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // high
       shape = this.canvas.paper.path('M26.125825000000987,14.983999999999469Q24.125825000000987,14.983999999999469 24.125825000000987, 12.983999999999469L24.125825000000987,8.247999999999593Q24.125825000000987,6.2479999999995925 22.125825000000987, 6.2479999999995925L11.125825000000987,6.2479999999995925Q9.125825000000987,6.2479999999995925 9.125825000000987, 8.247999999999593L9.125825000000987,12.983999999999469Q9.125825000000987,14.983999999999469 7.125825000000987, 14.983999999999469L2.299425000001065,14.983999999999469Q0.2994250000010652,14.983999999999469 0.2994250000010652, 16.98399999999947L0.2994250000010652,17.98399999999947Q0.2994250000010652,19.98399999999947 2.299425000001065, 19.98399999999947L30.299425000001065,19.98399999999947Q32.299425000001065,19.98399999999947 32.299425000001065, 17.98399999999947L32.299425000001065,16.98399999999947Q32.299425000001065,14.983999999999469 30.299425000001065, 14.983999999999469L26.125825000000987,14.983999999999469');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       

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
digital_buttons_PushButton = digital_buttons_PushButton.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.setResizeable(false);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.value = false;
        this.on("mousedown",()=>{            
            this.layerShow("low" , false);
            this.layerShow("high", true);
            this.getOutputPort(0).setValue(true);
        });
        this.on("mouseup",()=>{            
            this.value = !this.value;
            this.layerShow("low" , true);
            this.layerShow("high", false);
            this.getOutputPort(0).setValue(false);
        });

        this.on("added",()=>{
            this.layerShow("low" , true);
            this.layerShow("high", false);
            this.getOutputPort(0).setValue(false);
        });
    },
    
    calculate: function()
    {
        // do nothing per default;
    }

});