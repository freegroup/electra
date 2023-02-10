// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_geometry_Scale = CircuitFigure.extend({

   NAME: "video_geometry_Scale",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.59580028320488},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.4546330256835063, y: 47.74105968884587 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.4546330256835063, y: 78.37647333849256 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 104.19463302568374, y: 47.75576632810568 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.59580028320488;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.59580028320488 L0,81.59580028320488");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M6.363706420546805,6.846667716796219Q6.363706420546805,2.846667716796219 10.363706420546805, 2.846667716796219L47.363706420546805,2.846667716796219Q51.363706420546805,2.846667716796219 51.363706420546805, 6.846667716796219L51.363706420546805,46.84666771679622Q51.363706420546805,50.84666771679622 47.363706420546805, 50.84666771679622L10.363706420546805,50.84666771679622Q6.363706420546805,50.84666771679622 6.363706420546805, 46.84666771679622L6.363706420546805,6.846667716796219');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Scale');
       shape.attr({"x":25.27125842055102,"y":69.59580028320488,"text-anchor":"start","text":"Scale","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":40,"cy":15.966223296252792,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // factor_label
       shape = this.canvas.paper.text(0,0,'factor');
       shape.attr({"x":13.863706420546805,"y":56.06407471679631,"text-anchor":"start","text":"factor","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","factor_label");
       
       // Body
       shape = this.canvas.paper.path('M30 48.34666771679622L51 48.34666771679622L49.52848698112575 33.95670898588651L49.12852106341779 33.01739755791641L48.475428085539534 32.13606149829502L47.58905194714316 31.33947975722731L46.49632473866586 30.651856067819608L45.2304484233955 30.094083527919793L43.82988601259967 29.683109773912292L42.33719288641623 29.431422035348078L40.7977237701416 29.34666771679622L39.25825465386879 29.431422035348078L37.76556152768171 29.683109773912292L36.36499911688588 30.094083527919793L35.099122801611884 30.651856067819608L34.00639559314004 31.33947975722731L33.12001945474185 32.13606149829502L32.46692647686723 33.01739755791641L32.06696055915563 33.95670898588651Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.863706420546805 52L72.8637064205468 52L72.8637064205468 2L41.863706420546805 2L41.863706420546805 52Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.41650485804712,15.712932812500185Q41.41650485804712,12.712932812500185 44.41650485804712, 12.712932812500185L62.696904858046764,12.712932812500185Q65.69690485804676,12.712932812500185 65.69690485804676, 15.712932812500185L65.69690485804676,41.686132812499636Q65.69690485804676,44.686132812499636 62.696904858046764, 44.686132812499636L44.41650485804712,44.686132812499636Q41.41650485804712,44.686132812499636 41.41650485804712, 41.686132812499636L41.41650485804712,15.712932812500185');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M42.712378420546884 42.34666771679622L48.712378420546884 42.34666771679622L47.9004617202836 32.500906479855985L47.67977797235835 31.85821971335099L47.31942975337279 31.25520030413736L46.83036606161386 30.710170691827443L46.227446849882654 30.239691325390595L45.52899151332713 29.858057482302684L44.75622226392079 29.576864913768986L43.9326193042607 29.404657513698112L43.08320739351802 29.34666771679622L42.712378420546884 29.371984405384865L42.712378420546884 42.34666771679622Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M42.79289042054734 25.948109968187964L42.99169476503266 25.966223296252792L43.82541364123517 25.890262061314388L44.63380039126514 25.66468640018047L45.39229259279 25.296350315175005L46.077843844077506 24.796445511849015L46.66962401726596 24.180161344686894L47.149652171247 23.466223296252792L47.50334289346756 22.676324012882105L47.7199494703118 21.834464184587887L47.79289042054734 20.966223296252792L47.7199494703118 20.097982407917698L47.50334289346756 19.25612257962348L47.149652171247 18.466223296252792L46.66962401726596 17.75228524781869L46.077843844077506 17.13600108065657L45.39229259279 16.63609627733058L44.63380039126514 16.267760192325113L43.82541364123517 16.042184531191197L42.99169476503266 15.966223296252792L42.79289042054734 15.98433662431762L42.79289042054734 25.948109968187964Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // width_height
       shape = this.canvas.paper.text(0,0,'w x h');
       shape.attr({"x":44.5,"y":56.14219971679631,"text-anchor":"start","text":"w x h","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#EB213C","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","width_height");
       
       // Line
       shape = this.canvas.paper.path('M11.241196954950283 55.59580028320488L7.621512602952862,55.99719517600897L2.271258420551021,62.478233716803516');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M41.95023442055026 3.649865716797649L42.212378420546884,50.835785716797545');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_geometry_Scale = video_geometry_Scale.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        
        this.processing = false;
        
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
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.processing ===false){
            this.processing = true;
            var factor = this.getInputPort("input_port2").getValue();

            var w = img.naturalWidth;
            var h = img.naturalHeight;
            // map factor from 0-5 => 1-20
            factor = 19/5*factor+1;

            w = Math.max(10,parseInt(w/factor));
            h = Math.max(parseInt(h/factor));
            this.layerAttr("width_height", {"text": w+"x"+h});
            var scaleCanvas = document.createElement("canvas");
            scaleCanvas.height = h;
            scaleCanvas.width = w;
            var scaleCtx = scaleCanvas.getContext('2d');
            scaleCtx.drawImage(img, 0, 0, w, h);
            var scaledImage = document.createElement("img");
            scaledImage.onload = () => {
                this.getOutputPort("output_port1").setValue(scaledImage);
            }
            this.processing = false;
	   	    scaledImage.src = scaleCanvas.toDataURL();
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        this.processing = false;
    }
});