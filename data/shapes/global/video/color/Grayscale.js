// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Grayscale = CircuitFigure.extend({

   NAME: "video_color_Grayscale",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.125,height:80.63839999999982},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9429953198129615, y: 49.49205341375826 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.18804992199671, y: 49.49205341375826 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.125;
      this.originalHeight= 80.63839999999982;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.125,0 L80.125,80.63839999999982 L0,80.63839999999982");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.015625,3Q0.015625,0 3.015625, 0L77.015625,0Q80.015625,0 80.015625, 3L80.015625,77Q80.015625,80 77.015625, 80L3.015625,80Q0.015625,80 0.015625, 77L0.015625,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Grayscale');
       shape.attr({"x":4,"y":68.13839999999982,"text-anchor":"start","text":"Grayscale","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.244424999999865,10.63839999999982Q5.244424999999865,5.63839999999982 10.244424999999865, 5.63839999999982L69.24442499999986,5.63839999999982Q74.24442499999986,5.63839999999982 74.24442499999986, 10.63839999999982L74.24442499999986,51.63839999999982Q74.24442499999986,56.63839999999982 69.24442499999986, 56.63839999999982L10.244424999999865,56.63839999999982Q5.244424999999865,56.63839999999982 5.244424999999865, 51.63839999999982L5.244424999999865,10.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(214,247,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Body
       shape = this.canvas.paper.path('M28.889806062430115,49.23713714420617Q27.95386041812526,53.12609661312672 31.95386041812526, 53.12609661312672L49.95386041812526,53.12609661312672Q53.95386041812526,53.12609661312672 52.928477872059354, 49.25975588393285L50.91922757615705,41.68361146446987Q49.89384503009114,37.817270735276 49.684272505307035, 37.033719425669005L49.684272505307035,37.033719425669005Q49.47469998052293,36.250168116062014 49.1324949619634, 35.51497848336794L49.1324949619634,35.51497848336794Q48.79028994340388,34.77978885067387 48.32585015739369, 34.11529925985769L48.32585015739369,34.11529925985769Q47.8614103713835,33.45080966904152 47.288847585802614, 32.877210300071965L47.288847585802614,32.877210300071965Q46.71628480022173,32.30361093110241 46.052996045579675, 31.8383303105511L46.052996045579675,31.8383303105511Q45.38970729093762,31.37304968999979 44.65584626040345, 31.03022513407859L44.65584626040345,31.03022513407859Q43.92198522986928,30.687400578157394 43.139849919504286, 30.477448637519956L43.139849919504286,30.477448637519956Q42.35771460913929,30.267496696882517 41.55106980456958, 30.19679665500462L41.55106980456958,30.19679665500462Q40.744424999999865,30.12609661312672 39.93778019543015, 30.19679665500462L39.93778019543015,30.19679665500462Q39.131135390860436,30.267496696882517 38.34900008049544, 30.477448637519956L38.34900008049544,30.477448637519956Q37.56686477013045,30.687400578157394 36.83300373959628, 31.03022513407859L36.83300373959628,31.03022513407859Q36.09914270906211,31.37304968999979 35.435853954420054, 31.8383303105511L35.435853954420054,31.8383303105511Q34.772565199778,32.30361093110241 34.200002414197115, 32.877210300071965L34.200002414197115,32.877210300071965Q33.62743962861623,33.45080966904152 33.16299984260604, 34.11529925985769L33.16299984260604,34.11529925985769Q32.69856005659585,34.77978885067387 32.35635503803633, 35.51497848336794L32.35635503803633,35.51497848336794Q32.0141500194768,36.250168116062014 31.79227831889102, 37.17455415865879L31.79227831889102,37.17455415865879Q31.570406618305242,38.09894020125557 30.634460974000387, 41.98789967017612L28.889806062430115,49.23713714420617');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":9.290564581874843,"ry":9.290564581874843,"cx":39.744425000000106,"cy":19.835532031251443,"stroke":"none","stroke-width":0,"fill":"rgba(26,177,232,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.06486093750391,9.63839999999982Q40.06486093750391,5.63839999999982 44.06486093750391, 5.63839999999982L70.06486093750391,5.63839999999982Q74.06486093750391,5.63839999999982 74.06486093750391, 9.63839999999982L74.06486093750391,52.63839999999982Q74.06486093750391,56.63839999999982 70.06486093750391, 56.63839999999982L44.06486093750391,56.63839999999982Q40.06486093750391,56.63839999999982 40.06486093750391, 52.63839999999982L40.06486093750391,9.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M39.40606093750375,49.06802542650166Q39.40606093750375,53.06802542650166 43.40606093750375, 53.06802542650166L48.4268250000041,53.06802542650166Q52.4268250000041,53.06802542650166 51.39970837135936, 49.20214500528304L49.393926240614725,41.65274540233118Q48.366809611969984,37.78686498111256 48.15723708718588, 37.004729670747565L48.15723708718588,37.004729670747565Q47.94766456240177,36.22259436038257 47.605459543842244, 35.4887333298484L47.605459543842244,35.4887333298484Q47.26325452528272,34.75487229931423 46.79881473927253, 34.091583544672176L46.79881473927253,34.091583544672176Q46.33437495326234,33.42829479003012 45.761812167681455, 32.85573200444924L45.761812167681455,32.85573200444924Q45.18924938210057,32.28316921886835 44.52596062745852, 31.818729432858163L44.52596062745852,31.818729432858163Q43.86267187281646,31.354289646847974 43.12881084228229, 31.01208462828845L43.12881084228229,31.01208462828845Q42.39494981174812,30.669879609728923 41.61281450138313, 30.460307084944816L41.61281450138313,30.460307084944816Q40.830679191018135,30.25073456016071 40.118370064260944, 30.188415586643714L40.118370064260944,30.188415586643714Q39.40606093750375,30.12609661312672 39.40606093750375, 34.12609661312672L39.40606093750375,49.06802542650166');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(179,179,179,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M40.06486093750391 29.11315439741429L41.60418544539334 28.978480953486724L43.168456066123326 28.55933590391851L44.63617812719167 27.874925866799458L45.96275563647578 26.94604629477908L47.10788120763755 25.80092072361731L48.036760779657925 24.474343214333203L48.721170816776976 23.00662115326486L49.14031586634519 21.442350532534874L49.28146041812852 19.829060923395446L49.14031586634519 18.215771314256017L48.721170816776976 16.65150069352603L48.036760779657925 15.183778632457688L47.10788120763755 13.857201123173581L45.96275563647578 12.712075552011811L44.63617812719167 11.783195979991433L43.168456066123326 11.098785942872382L41.60418544539334 10.679640893304168L40.06486093750391 10.5449674493766L40.06486093750391 29.11315439741429Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(105,106,107,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // Line
       shape = this.canvas.paper.path('M39.72936093750377 7.1828968750005515L40.01586093750393,30.57539687499957L40.56486093750391,55.28039687499859L40.56486093750391,54.841196874998786');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
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
video_color_Grayscale = video_color_Grayscale.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");

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
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                // normal grayscale conversion
                let average = 0.3*pixels[x] + 0.59*pixels[x+1] + 0.11*pixels[x+2];

                pixels[x]     = average;
                pixels[x + 1] = average;
                pixels[x + 2] = average;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;
        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }
        
        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});