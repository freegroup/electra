// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Luminance = CircuitFigure.extend({

   NAME: "video_color_Luminance",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:86.375,height:80.63839999999982},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 2.5984659913167754, y: 49.49205341375826 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 96.4117800289434, y: 49.49205341375826 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 86.375;
      this.originalHeight= 80.63839999999982;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L86.375,0 L86.375,80.63839999999982 L0,80.63839999999982");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M3.015625,3Q3.015625,0 6.015625, 0L80.015625,0Q83.015625,0 83.015625, 3L83.015625,77Q83.015625,80 80.015625, 80L6.015625,80Q3.015625,80 3.015625, 77L3.015625,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Luminance');
       shape.attr({"x":4,"y":68.13839999999982,"text-anchor":"start","text":"Luminance","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M8.244424999999865,10.63839999999982Q8.244424999999865,5.63839999999982 13.244424999999865, 5.63839999999982L72.24442499999986,5.63839999999982Q77.24442499999986,5.63839999999982 77.24442499999986, 10.63839999999982L77.24442499999986,51.63839999999982Q77.24442499999986,56.63839999999982 72.24442499999986, 56.63839999999982L13.244424999999865,56.63839999999982Q8.244424999999865,56.63839999999982 8.244424999999865, 51.63839999999982L8.244424999999865,10.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(214,247,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Body
       shape = this.canvas.paper.path('M31.889806062430115,49.23713714420617Q30.95386041812526,53.12609661312672 34.95386041812526, 53.12609661312672L52.95386041812526,53.12609661312672Q56.95386041812526,53.12609661312672 55.928477872059354, 49.25975588393285L53.91922757615705,41.68361146446987Q52.89384503009114,37.817270735276 52.684272505307035, 37.033719425669005L52.684272505307035,37.033719425669005Q52.47469998052293,36.250168116062014 52.1324949619634, 35.51497848336794L52.1324949619634,35.51497848336794Q51.79028994340388,34.77978885067387 51.32585015739369, 34.11529925985769L51.32585015739369,34.11529925985769Q50.8614103713835,33.45080966904152 50.288847585802614, 32.877210300071965L50.288847585802614,32.877210300071965Q49.71628480022173,32.30361093110241 49.052996045579675, 31.8383303105511L49.052996045579675,31.8383303105511Q48.38970729093762,31.37304968999979 47.65584626040345, 31.03022513407859L47.65584626040345,31.03022513407859Q46.92198522986928,30.687400578157394 46.139849919504286, 30.477448637519956L46.139849919504286,30.477448637519956Q45.35771460913929,30.267496696882517 44.55106980456958, 30.19679665500462L44.55106980456958,30.19679665500462Q43.744424999999865,30.12609661312672 42.93778019543015, 30.19679665500462L42.93778019543015,30.19679665500462Q42.131135390860436,30.267496696882517 41.34900008049544, 30.477448637519956L41.34900008049544,30.477448637519956Q40.56686477013045,30.687400578157394 39.83300373959628, 31.03022513407859L39.83300373959628,31.03022513407859Q39.09914270906211,31.37304968999979 38.435853954420054, 31.8383303105511L38.435853954420054,31.8383303105511Q37.772565199778,32.30361093110241 37.200002414197115, 32.877210300071965L37.200002414197115,32.877210300071965Q36.62743962861623,33.45080966904152 36.16299984260604, 34.11529925985769L36.16299984260604,34.11529925985769Q35.69856005659585,34.77978885067387 35.35635503803633, 35.51497848336794L35.35635503803633,35.51497848336794Q35.0141500194768,36.250168116062014 34.79227831889102, 37.17455415865879L34.79227831889102,37.17455415865879Q34.57040661830524,38.09894020125557 33.63446097400039, 41.98789967017612L31.889806062430115,49.23713714420617');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":9.290564581874843,"ry":9.290564581874843,"cx":42.744425000000106,"cy":19.835532031251443,"stroke":"none","stroke-width":0,"fill":"rgba(26,177,232,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M43.06486093750391,9.63839999999982Q43.06486093750391,5.63839999999982 47.06486093750391, 5.63839999999982L73.06486093750391,5.63839999999982Q77.06486093750391,5.63839999999982 77.06486093750391, 9.63839999999982L77.06486093750391,52.63839999999982Q77.06486093750391,56.63839999999982 73.06486093750391, 56.63839999999982L47.06486093750391,56.63839999999982Q43.06486093750391,56.63839999999982 43.06486093750391, 52.63839999999982L43.06486093750391,9.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M42.40606093750375,49.06802542650166Q42.40606093750375,53.06802542650166 46.40606093750375, 53.06802542650166L51.4268250000041,53.06802542650166Q55.4268250000041,53.06802542650166 54.39970837135936, 49.20214500528304L52.393926240614725,41.65274540233118Q51.366809611969984,37.78686498111256 51.15723708718588, 37.004729670747565L51.15723708718588,37.004729670747565Q50.94766456240177,36.22259436038257 50.605459543842244, 35.4887333298484L50.605459543842244,35.4887333298484Q50.26325452528272,34.75487229931423 49.79881473927253, 34.091583544672176L49.79881473927253,34.091583544672176Q49.33437495326234,33.42829479003012 48.761812167681455, 32.85573200444924L48.761812167681455,32.85573200444924Q48.18924938210057,32.28316921886835 47.52596062745852, 31.818729432858163L47.52596062745852,31.818729432858163Q46.86267187281646,31.354289646847974 46.12881084228229, 31.01208462828845L46.12881084228229,31.01208462828845Q45.39494981174812,30.669879609728923 44.61281450138313, 30.460307084944816L44.61281450138313,30.460307084944816Q43.830679191018135,30.25073456016071 43.118370064260944, 30.188415586643714L43.118370064260944,30.188415586643714Q42.40606093750375,30.12609661312672 42.40606093750375, 34.12609661312672L42.40606093750375,49.06802542650166');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(92,92,92,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M43.06486093750391 29.11315439741429L44.60418544539334 28.978480953486724L46.168456066123326 28.55933590391851L47.63617812719167 27.874925866799458L48.96275563647578 26.94604629477908L50.10788120763755 25.80092072361731L51.036760779657925 24.474343214333203L51.721170816776976 23.00662115326486L52.14031586634519 21.442350532534874L52.28146041812852 19.829060923395446L52.14031586634519 18.215771314256017L51.721170816776976 16.65150069352603L51.036760779657925 15.183778632457688L50.10788120763755 13.857201123173581L48.96275563647578 12.712075552011811L47.63617812719167 11.783195979991433L46.168456066123326 11.098785942872382L44.60418544539334 10.679640893304168L43.06486093750391 10.5449674493766L43.06486093750391 29.11315439741429Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(210,212,214,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // Line
       shape = this.canvas.paper.path('M42.72936093750377 7.1828968750005515L43.01586093750393,30.57539687499957L43.56486093750391,55.28039687499859L43.56486093750391,54.841196874998786');
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
video_color_Luminance = video_color_Luminance.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
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
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
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
                // CIE luminance for the RGB
                let average = 0.2126*pixels[x] + 0.7152*pixels[x+1] + 0.0722*pixels[x+2];
              
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
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
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
        this.processing = false;
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
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});