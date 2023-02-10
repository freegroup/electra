// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_GrayscaleAvg = CircuitFigure.extend({

   NAME: "video_color_GrayscaleAvg",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:82.484375,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.29632885016085125, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.53463155900722, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 82.484375;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L82.484375,0 L82.484375,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.015625,3Q1.015625,0 4.015625, 0L78.015625,0Q81.015625,0 81.015625, 3L81.015625,77Q81.015625,80 78.015625, 80L4.015625,80Q1.015625,80 1.015625, 77L1.015625,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'GrayscaleAvg');
       shape.attr({"x":4,"y":67.63839999999982,"text-anchor":"start","text":"GrayscaleAvg","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M6.244424999999865,10.63839999999982Q6.244424999999865,5.63839999999982 11.244424999999865, 5.63839999999982L70.24442499999986,5.63839999999982Q75.24442499999986,5.63839999999982 75.24442499999986, 10.63839999999982L75.24442499999986,51.63839999999982Q75.24442499999986,56.63839999999982 70.24442499999986, 56.63839999999982L11.244424999999865,56.63839999999982Q6.244424999999865,56.63839999999982 6.244424999999865, 51.63839999999982L6.244424999999865,10.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(214,247,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Body
       shape = this.canvas.paper.path('M29.889806062430115,49.23713714420617Q28.95386041812526,53.12609661312672 32.95386041812526, 53.12609661312672L50.95386041812526,53.12609661312672Q54.95386041812526,53.12609661312672 53.928477872059354, 49.25975588393285L51.91922757615705,41.68361146446987Q50.89384503009114,37.817270735276 50.684272505307035, 37.033719425669005L50.684272505307035,37.033719425669005Q50.47469998052293,36.250168116062014 50.1324949619634, 35.51497848336794L50.1324949619634,35.51497848336794Q49.79028994340388,34.77978885067387 49.32585015739369, 34.11529925985769L49.32585015739369,34.11529925985769Q48.8614103713835,33.45080966904152 48.288847585802614, 32.877210300071965L48.288847585802614,32.877210300071965Q47.71628480022173,32.30361093110241 47.052996045579675, 31.8383303105511L47.052996045579675,31.8383303105511Q46.38970729093762,31.37304968999979 45.65584626040345, 31.03022513407859L45.65584626040345,31.03022513407859Q44.92198522986928,30.687400578157394 44.139849919504286, 30.477448637519956L44.139849919504286,30.477448637519956Q43.35771460913929,30.267496696882517 42.55106980456958, 30.19679665500462L42.55106980456958,30.19679665500462Q41.744424999999865,30.12609661312672 40.93778019543015, 30.19679665500462L40.93778019543015,30.19679665500462Q40.131135390860436,30.267496696882517 39.34900008049544, 30.477448637519956L39.34900008049544,30.477448637519956Q38.56686477013045,30.687400578157394 37.83300373959628, 31.03022513407859L37.83300373959628,31.03022513407859Q37.09914270906211,31.37304968999979 36.435853954420054, 31.8383303105511L36.435853954420054,31.8383303105511Q35.772565199778,32.30361093110241 35.200002414197115, 32.877210300071965L35.200002414197115,32.877210300071965Q34.62743962861623,33.45080966904152 34.16299984260604, 34.11529925985769L34.16299984260604,34.11529925985769Q33.69856005659585,34.77978885067387 33.35635503803633, 35.51497848336794L33.35635503803633,35.51497848336794Q33.0141500194768,36.250168116062014 32.79227831889102, 37.17455415865879L32.79227831889102,37.17455415865879Q32.57040661830524,38.09894020125557 31.634460974000387, 41.98789967017612L29.889806062430115,49.23713714420617');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":9.290564581874843,"ry":9.290564581874843,"cx":40.744425000000106,"cy":19.835532031251443,"stroke":"none","stroke-width":0,"fill":"rgba(26,177,232,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.06486093750391,9.63839999999982Q41.06486093750391,5.63839999999982 45.06486093750391, 5.63839999999982L71.06486093750391,5.63839999999982Q75.06486093750391,5.63839999999982 75.06486093750391, 9.63839999999982L75.06486093750391,52.63839999999982Q75.06486093750391,56.63839999999982 71.06486093750391, 56.63839999999982L45.06486093750391,56.63839999999982Q41.06486093750391,56.63839999999982 41.06486093750391, 52.63839999999982L41.06486093750391,9.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M40.40606093750375,49.06802542650166Q40.40606093750375,53.06802542650166 44.40606093750375, 53.06802542650166L49.4268250000041,53.06802542650166Q53.4268250000041,53.06802542650166 52.39970837135936, 49.20214500528304L50.393926240614725,41.65274540233118Q49.366809611969984,37.78686498111256 49.15723708718588, 37.004729670747565L49.15723708718588,37.004729670747565Q48.94766456240177,36.22259436038257 48.605459543842244, 35.4887333298484L48.605459543842244,35.4887333298484Q48.26325452528272,34.75487229931423 47.79881473927253, 34.091583544672176L47.79881473927253,34.091583544672176Q47.33437495326234,33.42829479003012 46.761812167681455, 32.85573200444924L46.761812167681455,32.85573200444924Q46.18924938210057,32.28316921886835 45.52596062745852, 31.818729432858163L45.52596062745852,31.818729432858163Q44.86267187281646,31.354289646847974 44.12881084228229, 31.01208462828845L44.12881084228229,31.01208462828845Q43.39494981174812,30.669879609728923 42.61281450138313, 30.460307084944816L42.61281450138313,30.460307084944816Q41.830679191018135,30.25073456016071 41.118370064260944, 30.188415586643714L41.118370064260944,30.188415586643714Q40.40606093750375,30.12609661312672 40.40606093750375, 34.12609661312672L40.40606093750375,49.06802542650166');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(117,117,117,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M41.06486093750391 29.11315439741429L42.60418544539334 28.978480953486724L44.168456066123326 28.55933590391851L45.63617812719167 27.874925866799458L46.96275563647578 26.94604629477908L48.10788120763755 25.80092072361731L49.036760779657925 24.474343214333203L49.721170816776976 23.00662115326486L50.14031586634519 21.442350532534874L50.28146041812852 19.829060923395446L50.14031586634519 18.215771314256017L49.721170816776976 16.65150069352603L49.036760779657925 15.183778632457688L48.10788120763755 13.857201123173581L46.96275563647578 12.712075552011811L45.63617812719167 11.783195979991433L44.168456066123326 11.098785942872382L42.60418544539334 10.679640893304168L41.06486093750391 10.5449674493766L41.06486093750391 29.11315439741429Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(208,210,212,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // Line
       shape = this.canvas.paper.path('M40.72936093750377 7.1828968750005515L41.01586093750393,30.57539687499957L41.56486093750391,55.28039687499859L41.56486093750391,54.841196874998786');
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
video_color_GrayscaleAvg = video_color_GrayscaleAvg.extend({

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
                // average grayscale conversion
                let average = (pixels[x] + pixels[x+1] + pixels[x+2])/3;

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