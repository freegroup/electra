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

     this._super( $.extend({stroke:0, bgColor:null, width:90,height:185},attr), setter, getter);
     var port;
     // port_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 7.837837837837839 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_a");
     port.setMaxFanOut(20);
     // port_b
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 21.891891891891895 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_b");
     port.setMaxFanOut(20);
     // port_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 34.86486486486487 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_c");
     port.setMaxFanOut(20);
     // port_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 48.37837837837838 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d");
     port.setMaxFanOut(20);
     // port_e
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 61.891891891891895 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_e");
     port.setMaxFanOut(20);
     // port_f
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 75.4054054054054 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_f");
     port.setMaxFanOut(20);
     // port_g
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 88.91891891891892 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_g");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 90;
      this.originalHeight= 185;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L90,0 L90,185 L0,185");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L88,0Q90,0 90, 2L90,183Q90,185 88, 185L2,185Q0,185 0, 183L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // seg_a
       shape = this.canvas.paper.path('M23.445800000000418,13.439400000000205Q23.445800000000418,10.439400000000205 26.445800000000418, 10.439400000000205L80.44580000000042,10.439400000000205Q83.44580000000042,10.439400000000205 83.44580000000042, 13.439400000000205L83.44580000000042,17.439400000000205Q83.44580000000042,20.439400000000205 80.44580000000042, 20.439400000000205L26.445800000000418,20.439400000000205Q23.445800000000418,20.439400000000205 23.445800000000418, 17.439400000000205L23.445800000000418,13.439400000000205');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_a");
       
       // seg_b
       shape = this.canvas.paper.path('M74.71072077107742,27.838439779342117Q74.93453192061952,24.846800000000258 77.93225340387478, 24.96370127813659L82.44807851674516,25.139803604681425Q85.44580000000042,25.256704882817758 85.22045796808241, 28.248229739584126L81.18241011129932,81.85527514323388Q80.95706807938132,84.84680000000026 77.95706807938132, 84.84680000000026L73.44580000000042,84.84680000000026Q70.44580000000042,84.84680000000026 70.66961114954252, 81.8551602206584L74.71072077107742,27.838439779342117');
       shape.attr({"stroke":"rgba(3,3,3,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_b");
       
       // seg_c
       shape = this.canvas.paper.path('M67.98722077107736,104.43103977934206Q68.21103192061946,101.4394000000002 71.2087534038747, 101.55630127813706L75.72457851674513,101.73240360468267Q78.72230000000036,101.84930488281952 78.49695796808236, 104.8408297395859L74.45891011129926,158.44787514323383Q74.23356807938126,161.4394000000002 71.23356807938126, 161.4394000000002L66.72230000000036,161.4394000000002Q63.72230000000036,161.4394000000002 63.94611114954245, 158.44776022065835L67.98722077107736,104.43103977934206');
       shape.attr({"stroke":"rgba(28,28,28,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_c");
       
       // seg_d
       shape = this.canvas.paper.path('M10.945800000000418,167.4394000000002Q10.945800000000418,164.4394000000002 13.945800000000418, 164.4394000000002L67.94580000000042,164.4394000000002Q70.94580000000042,164.4394000000002 70.94580000000042, 167.4394000000002L70.94580000000042,171.4394000000002Q70.94580000000042,174.4394000000002 67.94580000000042, 174.4394000000002L13.945800000000418,174.4394000000002Q10.945800000000418,174.4394000000002 10.945800000000418, 171.4394000000002L10.945800000000418,167.4394000000002');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_d");
       
       // seg_e
       shape = this.canvas.paper.path('M14.210720771077426,103.43103977934206Q14.43453192061952,100.4394000000002 17.432253403874775, 100.55630127813653L21.948078516745163,100.73240360468138Q24.945800000000418,100.8493048828177 24.72045796808242, 103.84082973958408L20.682410111299312,157.44787514323383Q20.457068079381315,160.4394000000002 17.457068079381315, 160.4394000000002L12.945800000000418,160.4394000000002Q9.945800000000418,160.4394000000002 10.169611149542511, 157.44776022065835L14.210720771077426,103.43103977934206');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_e");
       
       // seg_f
       shape = this.canvas.paper.path('M19.210720771077426,27.838439779342117Q19.43453192061952,24.846800000000258 22.432253403874817, 24.963701278135552L26.94807851674512,25.139803604678825Q29.945800000000418,25.25670488281412 29.720457968082435, 28.248229739580495L25.682410111299298,81.85527514323388Q25.457068079381315,84.84680000000026 22.457068079381315, 84.84680000000026L17.945800000000418,84.84680000000026Q14.945800000000418,84.84680000000026 15.169611149542511, 81.8551602206584L19.210720771077426,27.838439779342117');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_f");
       
       // seg_g
       shape = this.canvas.paper.path('M16.670600000000377,91.23220000000038Q16.670600000000377,88.23220000000038 19.670600000000377, 88.23220000000038L73.67060000000038,88.23220000000038Q76.67060000000038,88.23220000000038 76.67060000000038, 91.23220000000038L76.67060000000038,95.23220000000038Q76.67060000000038,98.23220000000038 73.67060000000038, 98.23220000000038L19.670600000000377,98.23220000000038Q16.670600000000377,98.23220000000038 16.670600000000377, 95.23220000000038L16.670600000000377,91.23220000000038');
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
                fill  : element.p.getBooleanValue()?"#C21B7A":null,
                stroke: element.p.getBooleanValue()?"#000000":"#f4f4f9"
            });
        });
    }

});