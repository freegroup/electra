// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_GaussBlur = CircuitFigure.extend({

   NAME: "video_quality_GaussBlur",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:83.375,height:84.37877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.5997001499250375, y: 47.298149054958564 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.5997001499250375, y: 79.13214993055605 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(1);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 97.78860569715143, y: 47.298149054958564 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 83.375;
      this.originalHeight= 84.37877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L83.375,0 L83.375,84.37877759999992 L0,84.37877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.2712000000001353,3Q1.2712000000001353,0 4.271200000000135, 0L78.27120000000014,0Q81.27120000000014,0 81.27120000000014, 3L81.27120000000014,77Q81.27120000000014,80 78.27120000000014, 80L4.271200000000135,80Q1.2712000000001353,80 1.2712000000001353, 77L1.2712000000001353,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'GaussBlur');
       shape.attr({"x":4,"y":71.87877759999992,"text-anchor":"start","text":"GaussBlur","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.586624000003212,7.770740800002386Q5.586624000003212,3.770740800002386 9.586624000003212, 3.770740800002386L72.58662400000321,3.770740800002386Q76.58662400000321,3.770740800002386 76.58662400000321, 7.770740800002386L76.58662400000321,49.770740800002386Q76.58662400000321,53.770740800002386 72.58662400000321, 53.770740800002386L9.586624000003212,53.770740800002386Q5.586624000003212,53.770740800002386 5.586624000003212, 49.770740800002386L5.586624000003212,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M40.090189118232956,51.06235109342106Q40.090189118232956,53.06235109342106 42.0900547303779, 53.08553585911158L52.09032350608801,53.20147059342526Q54.090189118232956,53.224655359115786 53.72321753600035, 51.25861063484482L51.038122985231084,36.87325702356028Q50.671151402998476,34.90721229928931 50.61287307749126, 34.2401812930475L50.61287307749126,34.2401812930475Q50.55459475198404,33.573150286805685 50.38153053289079, 32.9263866801557L50.38153053289079,32.9263866801557Q50.208466313797544,32.27962307350572 49.92587466984196, 31.67277845135368L49.92587466984196,31.67277845135368Q49.643283025886376,31.06593382920164 49.25975036117052, 30.51744685832L49.25975036117052,30.51744685832Q48.87621769645466,29.96895988743836 48.403397456921084, 29.49549606688106L48.403397456921084,29.49549606688106Q47.93057721738751,29.02203224632376 47.38283580675443, 28.63797753470044L47.38283580675443,28.63797753470044Q46.83509439612135,28.25392282307712 46.22907465998014, 27.97094652845726L46.22907465998014,27.97094652845726Q45.623054923838936,27.687970233837405 44.97717046521211, 27.51467044774381L44.97717046521211,27.51467044774381Q44.33128600658529,27.341370661650217 43.665161697914755, 27.283013010383L43.665161697914755,27.283013010383Q42.99903738924422,27.224655359115786 42.332913080573235, 27.283013010383L42.332913080573235,27.283013010383Q41.66678877190225,27.341370661650217 41.02090431327542, 27.51467044774381L41.02090431327542,27.51467044774381Q40.3750198546486,27.687970233837405 40.23260448644078, 27.75447000404165L40.23260448644078,27.75447000404165Q40.090189118232956,27.820969774245896 40.090189118232956, 29.820969774245896L40.090189118232956,51.06235109342106');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.2});
       shape.data("name","Shadow_Body");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M40.090189118232956,52.04986614990685Q40.090189118232956,54.04986614990685 42.09008341288485, 54.07042849945177L55.09029482358106,54.20409300957086Q57.090189118232956,54.224655359115786 56.67828728064497, 52.26753071408378L53.350402301607836,36.45530286279578Q52.93850046401985,34.49817821776378 52.86773392590385, 33.77983713411868L52.86773392590385,33.77983713411868Q52.796967387787845,33.06149605047358 52.586817978889485, 32.36498139715877L52.586817978889485,32.36498139715877Q52.376668569991125,31.668466743843965 52.03352157375866, 31.014941766141874L52.03352157375866,31.014941766141874Q51.6903745775262,30.361416788439783 51.2246563417998, 29.77073851210571L51.2246563417998,29.77073851210571Q50.7589381060734,29.180060235771634 50.184799243782436, 28.670176121325312L50.184799243782436,28.670176121325312Q49.61066038149147,28.16029200687899 48.945545811437114, 27.746694625130658L48.945545811437114,27.746694625130658Q48.28043124138276,27.333097243382326 47.54455013321149, 27.028353541484194L47.54455013321149,27.028353541484194Q46.80866902504022,26.72360983958606 46.02438075385089, 26.536979300715757L46.02438075385089,26.536979300715757Q45.24009248266157,26.350348761845453 44.431227250703614, 26.28750206048062L44.431227250703614,26.28750206048062Q43.62236201874566,26.224655359115786 42.81349678678862, 26.28750206048062L42.81349678678862,26.28750206048062Q42.004631554831576,26.350348761845453 41.22034328364225, 26.536979300715757L41.22034328364225,26.536979300715757Q40.436055012452925,26.72360983958606 40.26312206534294, 26.795224976728605L40.26312206534294,26.795224976728605Q40.090189118232956,26.86684011387115 40.090189118232956, 28.86684011387115L40.090189118232956,52.04986614990685');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.15});
       shape.data("name","Shadow_Body");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M40.94482344960488 26.00720138039742L41.314147979302106 26.107061848355443L43.03497508821329 26.25898431823407L44.75580219712447 26.107061848355443L46.42434284511182 25.655910526093976L47.98989926890954 24.919238356078495L49.40490282878818 23.919428749423787L50.626359357608635 22.686860415098636L51.61715551683028 21.25898431823407L52.347186466520725 19.679185751490877L52.79427058568763 17.99546609490244L52.94482344960488 16.25898431823407L52.79427058568763 14.5225025415657L52.347186466520725 12.838782884977263L51.61715551683028 11.25898431823407L50.626359357608635 9.831108221369504L49.40490282878818 8.598539887044353L47.98989926890954 7.5987302803896455L46.42434284511182 6.862058110374164L44.75580219712447 6.4109067881126975L43.03497508821329 6.25898431823407L41.314147979302106 6.4109067881126975L40.94482344960488 6.5107672560707215L40.94482344960488 26.00720138039742Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.1});
       shape.data("name","Shadow_Circle");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M39.44482344960488 25.032379674180447L39.78023935568763 25.122254095344033L41.34307295468989 25.25898431823407L42.90590655369215 25.122254095344033L44.421254244621196 24.71621790530753L45.84307295468989 24.053212952294416L47.12816144186854 23.15338430630527L48.23747294276109 22.044072805412725L49.13730158875023 20.75898431823407L49.80030654176335 19.337165608165378L50.20634273179985 17.82181791723633L50.34307295468989 16.25898431823407L50.20634273179985 14.69615071923181L49.80030654176335 13.180803028302762L49.13730158875023 11.75898431823407L48.23747294276109 10.473895831055415L47.12816144186854 9.36458433016287L45.84307295468989 8.464755684173724L44.421254244621196 7.80175073116061L42.90590655369215 7.395714541124107L41.34307295468989 7.25898431823407L39.78023935568763 7.395714541124107L39.44482344960488 7.485588962287693L39.44482344960488 25.032379674180447Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.15});
       shape.data("name","Shadow_Circle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":40.771200000000384,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M30.733767472217583,46.776768974949896Q30.090189118232956,50.724655359115786 34.09000873597449, 50.762642534977275L48.172110300486224,50.89638338325396Q52.17192991822776,50.93437055911545 51.28331395841995, 47.03432419067637L49.49538747803855,39.18729409867167Q48.606771518230744,35.28724773023259 48.546002530279566, 34.71745662722515L48.546002530279566,34.71745662722515Q48.48523354232839,34.1476655242177 48.30477301342353, 33.5951872355472L48.30477301342353,33.5951872355472Q48.12431248451867,33.0427089468767 47.82964361651284, 32.52433024577522L47.82964361651284,32.52433024577522Q47.53497474850701,32.005951544673735 47.135050905844764, 31.537423105665766L47.135050905844764,31.537423105665766Q46.73512706318252,31.068894666657798 46.24209972945255, 30.66445248927039L46.24209972945255,30.66445248927039Q45.74907239572258,30.26001031188298 45.17792195697666, 29.931943167022382L45.17792195697666,29.931943167022382Q44.606771518230744,29.603876022161785 43.97485209153365, 29.36215206401357L43.97485209153365,29.36215206401357Q43.34293266483655,29.120428105865358 42.669444802201724, 28.972391994582267L42.669444802201724,28.972391994582267Q41.995956939566895,28.824355883299177 41.301364228899274, 28.77450562120748L41.301364228899274,28.77450562120748Q40.60677151823165,28.724655359115786 39.91217880756358, 28.77450562120748L39.91217880756358,28.77450562120748Q39.2175860968955,28.824355883299177 38.54409823426067, 28.972391994582267L38.54409823426067,28.972391994582267Q37.870610371625844,29.120428105865358 37.23869094492875, 29.36215206401357L37.23869094492875,29.36215206401357Q36.60677151823165,29.603876022161785 36.035621079485736, 29.931943167022382L36.035621079485736,29.931943167022382Q35.46447064073982,30.26001031188298 34.97144330700985, 30.66445248927039L34.97144330700985,30.66445248927039Q34.47841597327988,31.068894666657798 34.07849213061763, 31.537423105665766L34.07849213061763,31.537423105665766Q33.678568287955386,32.005951544673735 33.38389941994956, 32.52433024577522L33.38389941994956,32.52433024577522Q33.08923055194373,33.0427089468767 32.90877002303887, 33.5951872355472L32.90877002303887,33.5951872355472Q32.72830949413401,34.1476655242177 32.66754050618283, 34.71745662722515L32.66754050618283,34.71745662722515Q32.60677151823165,35.28724773023259 31.963193164247027, 39.235134114398484L30.733767472217583,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Label
       shape = this.canvas.paper.text(0,0,'radius');
       shape.attr({"x":12.9609375,"y":59.423763799999506,"text-anchor":"start","text":"radius","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M12.259241500002645 59.67813280000246L7.8027935000027355,60.464564800002336L0.9870495000031951,67.44414879999931');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.96760448001169 4.038881344014044L40.13537664001069,53.47137542400378');
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
video_quality_GaussBlur = video_quality_GaussBlur.extend({

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
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var radius = this.getInputPort("input_port2").getValue();
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData, radius}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var radius = event.data.radius;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;

            // map values from [0..5] => [0..30]
            radius = Math.max(3,parseInt(30/5 * radius));

            var BlurStack = function() {
              this.r = 0;
              this.g = 0;
              this.b = 0;
              this.a = 0;
              this.next = null;
            };

            var mulTable = [
              512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
              454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
              482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
              437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
              497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
              320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
              446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
              329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
              505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
              399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
              324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
              268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
              451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
              385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
              332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
              289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
            ];

            var shgTable = [
              9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
              17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
              19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
              20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
              21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
              21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
              22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
              22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
            ];

          let x, y, i, p, yp, yi, yw, rSum, gSum, bSum, aSum,
            rOutSum, gOutSum, bOutSum, aOutSum,
            rInSum, gInSum, bInSum, aInSum,
            pr, pg, pb, pa, rbs;

          const div = 2 * radius + 1;
          // const w4 = width << 2;
          const widthMinus1 = width - 1;
          const heightMinus1 = height - 1;
          const radiusPlus1 = radius + 1;
          const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

          const stackStart = new BlurStack();
          let stack = stackStart;
          let stackEnd;
          for (i = 1; i < div; i++) {
            stack = stack.next = new BlurStack();
            if (i === radiusPlus1) {
              stackEnd = stack;
            }
          }
          stack.next = stackStart;
          let stackIn = null;
          let stackOut = null;

          yw = yi = 0;

          const mulSum = mulTable[radius];
          const shgSum = shgTable[radius];

          for (y = 0; y < height; y++) {
            rInSum = gInSum = bInSum = aInSum = rSum = gSum = bSum = aSum = 0;

            rOutSum = radiusPlus1 * (pr = pixels[yi]);
            gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
            bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
            aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);

            rSum += sumFactor * pr;
            gSum += sumFactor * pg;
            bSum += sumFactor * pb;
            aSum += sumFactor * pa;

            stack = stackStart;

            for (i = 0; i < radiusPlus1; i++) {
              stack.r = pr;
              stack.g = pg;
              stack.b = pb;
              stack.a = pa;
              stack = stack.next;
            }

            for (i = 1; i < radiusPlus1; i++) {
              p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
              rSum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
              gSum += (stack.g = (pg = pixels[p + 1])) * rbs;
              bSum += (stack.b = (pb = pixels[p + 2])) * rbs;
              aSum += (stack.a = (pa = pixels[p + 3])) * rbs;

              rInSum += pr;
              gInSum += pg;
              bInSum += pb;
              aInSum += pa;

              stack = stack.next;
            }

            stackIn = stackStart;
            stackOut = stackEnd;
            for (x = 0; x < width; x++) {
              pixels[yi + 3] = pa = (aSum * mulSum) >> shgSum;
              if (pa !== 0) {
                pa = 255 / pa;
                pixels[yi] = ((rSum * mulSum) >> shgSum) * pa;
                pixels[yi + 1] = ((gSum * mulSum) >> shgSum) * pa;
                pixels[yi + 2] = ((bSum * mulSum) >> shgSum) * pa;
              } else {
                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
              }

              rSum -= rOutSum;
              gSum -= gOutSum;
              bSum -= bOutSum;
              aSum -= aOutSum;

              rOutSum -= stackIn.r;
              gOutSum -= stackIn.g;
              bOutSum -= stackIn.b;
              aOutSum -= stackIn.a;

              p = (yw + ((p = x + radius + 1) < widthMinus1
                ? p
                : widthMinus1)) << 2;

              rInSum += (stackIn.r = pixels[p]);
              gInSum += (stackIn.g = pixels[p + 1]);
              bInSum += (stackIn.b = pixels[p + 2]);
              aInSum += (stackIn.a = pixels[p + 3]);

              rSum += rInSum;
              gSum += gInSum;
              bSum += bInSum;
              aSum += aInSum;

              stackIn = stackIn.next;

              rOutSum += (pr = stackOut.r);
              gOutSum += (pg = stackOut.g);
              bOutSum += (pb = stackOut.b);
              aOutSum += (pa = stackOut.a);

              rInSum -= pr;
              gInSum -= pg;
              bInSum -= pb;
              aInSum -= pa;

              stackOut = stackOut.next;

              yi += 4;
            }
            yw += width;
          }

          for (x = 0; x < width; x++) {
            gInSum = bInSum = aInSum = rInSum = gSum = bSum = aSum = rSum = 0;

            yi = x << 2;
            rOutSum = radiusPlus1 * (pr = pixels[yi]);
            gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
            bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
            aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);

            rSum += sumFactor * pr;
            gSum += sumFactor * pg;
            bSum += sumFactor * pb;
            aSum += sumFactor * pa;

            stack = stackStart;

            for (i = 0; i < radiusPlus1; i++) {
              stack.r = pr;
              stack.g = pg;
              stack.b = pb;
              stack.a = pa;
              stack = stack.next;
            }

            yp = width;

            for (i = 1; i <= radius; i++) {
              yi = (yp + x) << 2;

              rSum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
              gSum += (stack.g = (pg = pixels[yi + 1])) * rbs;
              bSum += (stack.b = (pb = pixels[yi + 2])) * rbs;
              aSum += (stack.a = (pa = pixels[yi + 3])) * rbs;

              rInSum += pr;
              gInSum += pg;
              bInSum += pb;
              aInSum += pa;

              stack = stack.next;

              if (i < heightMinus1) {
                yp += width;
              }
            }

            yi = x;
            stackIn = stackStart;
            stackOut = stackEnd;
            for (y = 0; y < height; y++) {
              p = yi << 2;
              pixels[p + 3] = pa = (aSum * mulSum) >> shgSum;
              if (pa > 0) {
                pa = 255 / pa;
                pixels[p] = ((rSum * mulSum) >> shgSum) * pa;
                pixels[p + 1] = ((gSum * mulSum) >> shgSum) * pa;
                pixels[p + 2] = ((bSum * mulSum) >> shgSum) * pa;
              } else {
                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
              }

              rSum -= rOutSum;
              gSum -= gOutSum;
              bSum -= bOutSum;
              aSum -= aOutSum;

              rOutSum -= stackIn.r;
              gOutSum -= stackIn.g;
              bOutSum -= stackIn.b;
              aOutSum -= stackIn.a;

              p = (x + (
                ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) *
                width
              )) << 2;

              rSum += (rInSum += (stackIn.r = pixels[p]));
              gSum += (gInSum += (stackIn.g = pixels[p + 1]));
              bSum += (bInSum += (stackIn.b = pixels[p + 2]));
              aSum += (aInSum += (stackIn.a = pixels[p + 3]));

              stackIn = stackIn.next;

              rOutSum += (pr = stackOut.r);
              gOutSum += (pg = stackOut.g);
              bOutSum += (pb = stackOut.b);
              aOutSum += (pa = stackOut.a);

              rInSum -= pr;
              gInSum -= pg;
              bInSum -= pb;
              aInSum -= pa;

              stackOut = stackOut.next;

              yi += width;
            }
          }
            //imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
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
        this.progressing = false;
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