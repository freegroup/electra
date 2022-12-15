// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var widget_HighLow = CircuitFigure.extend({

   NAME: "widget_HighLow",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:42,height:43.5},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.80952380952381, y: 51.72413793103448 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 42;
      this.originalHeight= 43.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L42,0 L42,43.5 L0,43.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":4.5,"y":10.5,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'0');
       shape.attr({"x":4,"y":32.5,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":3,"ry":3.5,"cx":39,"cy":22.5,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // high
       shape = this.canvas.paper.path('M39.29830000000038 22.446912500003236L13.857399999998961,11.091512500001045');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // low
       shape = this.canvas.paper.path('M38.75319999999738 22.70831250000083L13.644500000000335,32.35131249999904');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       

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
widget_HighLow = widget_HighLow.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.value = false;
        this.on("click",()=>{            
            this.value = !this.value;
            this.layerShow("low" , !this.value, 100);
            this.layerShow("high",  this.value, 100);
            this.getOutputPort(0).setValue(this.value);
        });

        this.on("added",()=>{
            this.layerShow("low" , !this.value);
            this.layerShow("high",  this.value);
            this.getOutputPort(0).setValue(this.value);
        });
    },
    
    calculate: function()
    {
        // do nothing per default;
    }

});