// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_7Segment = CircuitFigure.extend({

   NAME: "digital_display_7Segment",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:83,height:152},attr), setter, getter);
     var port;
     // port_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 11.513157894736842 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_a");
     port.setMaxFanOut(20);
     // port_b
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 24.67105263157895 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_b");
     port.setMaxFanOut(20);
     // port_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 37.828947368421055 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_c");
     port.setMaxFanOut(20);
     // port_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 50.986842105263165 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d");
     port.setMaxFanOut(20);
     // port_e
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 64.14473684210527 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_e");
     port.setMaxFanOut(20);
     // port_f
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 77.30263157894737 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_f");
     port.setMaxFanOut(20);
     // port_g
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 90.46052631578948 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_g");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 83;
      this.originalHeight= 152;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L83,0 L83,152 L0,152");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L81,0Q83,0 83, 2L83,150Q83,152 81, 152L2,152Q0,152 0, 150L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // seg_a
       shape = this.canvas.paper.path('M23.945800000000418,4.5Q23.945800000000418,3.5 24.945800000000418, 3.5L72.94580000000042,3.5Q73.94580000000042,3.5 73.94580000000042, 4.5L73.94580000000042,10.5Q73.94580000000042,11.5 72.94580000000042, 11.5L24.945800000000418,11.5Q23.945800000000418,11.5 23.945800000000418, 10.5L23.945800000000418,4.5');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_a");
       
       // seg_b
       shape = this.canvas.paper.path('M68.52583360974596,14.497875356164712Q68.59098553649528,13.5 69.58998871104984, 13.54463918939564L76.00099682544544,13.831106953187371Q77,13.875746142583012 76.93440183190458, 14.873592263155984L73.47461263160014,67.50215387942703Q73.40901446350472,68.5 72.40901446350472, 68.5L66,68.5Q65,68.5 65.06515192674932, 67.50212464383529L68.52583360974596,14.497875356164712');
       shape.attr({"stroke":"rgba(3,3,3,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_b");
       
       // seg_c
       shape = this.canvas.paper.path('M63.525833609746854,83.93727535616492Q63.59098553649619,82.9394000000002 64.58998871105075, 82.98403918939596L71.00099682544544,83.27050695318837Q72,83.31514614258413 71.93440183190457, 84.3129922631571L68.47461263159924,136.94155387942723Q68.40901446350381,137.9394000000002 67.40901446350381, 137.9394000000002L61,137.9394000000002Q60,137.9394000000002 60.06515192674934, 136.9415246438355L63.525833609746854,83.93727535616492');
       shape.attr({"stroke":"rgba(28,28,28,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_c");
       
       // seg_d
       shape = this.canvas.paper.path('M12.945800000000418,142.4394000000002Q12.945800000000418,141.4394000000002 13.945800000000418, 141.4394000000002L61.94580000000042,141.4394000000002Q62.94580000000042,141.4394000000002 62.94580000000042, 142.4394000000002L62.94580000000042,148.4394000000002Q62.94580000000042,149.4394000000002 61.94580000000042, 149.4394000000002L13.945800000000418,149.4394000000002Q12.945800000000418,149.4394000000002 12.945800000000418, 148.4394000000002L12.945800000000418,142.4394000000002');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_d");
       
       // seg_e
       shape = this.canvas.paper.path('M13.97163360974638,83.93727535616492Q14.0367855364957,82.9394000000002 15.035788711050266, 82.98403918939584L21.44679682544585,83.27050695318758Q22.445800000000418,83.31514614258322 22.380201831905, 84.31299226315619L18.920412631600552,136.94155387942723Q18.854814463505136,137.9394000000002 17.854814463505136, 137.9394000000002L11.445800000000418,137.9394000000002Q10.445800000000418,137.9394000000002 10.510951926749737, 136.9415246438355L13.97163360974638,83.93727535616492');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_e");
       
       // seg_f
       shape = this.canvas.paper.path('M18.47163360974638,14.497875356164712Q18.5367855364957,13.5 19.535788711050284, 13.544639189395209L25.946796825445833,13.831106953184165Q26.945800000000418,13.875746142579374 26.88020183190501, 14.873592263152347L23.420412631600545,67.50215387942703Q23.354814463505136,68.5 22.354814463505136, 68.5L15.945800000000418,68.5Q14.945800000000418,68.5 15.010951926749737, 67.50212464383529L18.47163360974638,14.497875356164712');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_f");
       
       // seg_g
       shape = this.canvas.paper.path('M16.945800000000418,72.84680000000026Q16.945800000000418,71.84680000000026 17.945800000000418, 71.84680000000026L65.94580000000042,71.84680000000026Q66.94580000000042,71.84680000000026 66.94580000000042, 72.84680000000026L66.94580000000042,78.84680000000026Q66.94580000000042,79.84680000000026 65.94580000000042, 79.84680000000026L17.945800000000418,79.84680000000026Q16.945800000000418,79.84680000000026 16.945800000000418, 78.84680000000026L16.945800000000418,72.84680000000026');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_g");
       

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
digital_display_7Segment = digital_display_7Segment.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        // ensure that the ports has the same order as the segments
        //
        this.portLockup = [];
        this.portLockup.push({ p:this.getPort("port_a"), s:"seg_a"});
        this.portLockup.push({ p:this.getPort("port_b"), s:"seg_b"});
        this.portLockup.push({ p:this.getPort("port_c"), s:"seg_c"});
        this.portLockup.push({ p:this.getPort("port_d"), s:"seg_d"});
        this.portLockup.push({ p:this.getPort("port_e"), s:"seg_e"});
        this.portLockup.push({ p:this.getPort("port_f"), s:"seg_f"});
        this.portLockup.push({ p:this.getPort("port_g"), s:"seg_g"});
    },
    
    calculate:function(context)
    {
        var _this = this;
        this.portLockup.forEach(function(element, index){
            _this.layerAttr(element.s, { 
                fill  : element.p.getBooleanValue()?"#C21B7A":"#FAFAFA",
                stroke: element.p.getBooleanValue()?"#000000":"#f4f4f9"
            });
        });
    }

});