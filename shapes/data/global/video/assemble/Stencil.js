// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_assemble_Stencil = CircuitFigure.extend({

   NAME: "video_assemble_Stencil",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.24028371822806},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.480719999996154, y: 12.652793160957096 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 50.65206795799892 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.480719999996154, y: 58.06805702570291 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.24028371822806;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.24028371822806 L0,81.24028371822806");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,4.240283718228056Q0,1.2402837182280564 3, 1.2402837182280564L77,1.2402837182280564Q80,1.2402837182280564 80, 4.240283718228056L80,78.24028371822806Q80,81.24028371822806 77, 81.24028371822806L3,81.24028371822806Q0,81.24028371822806 0, 78.24028371822806L0,4.240283718228056');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Stencil Apply');
       shape.attr({"x":4.5,"y":68.28452314223341,"text-anchor":"start","text":"Stencil Apply","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":49.50000000000025,"cy":17.663696518230857,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M38.46256747221745,48.01705269317795Q37.81898911823282,51.96493907734384 41.81880873597436, 52.00292625320533L55.90091030048609,52.13666710148202Q59.900729918227626,52.17465427734351 59.01211395841982, 48.27460790890443L57.22418747803842,40.42757781689973Q56.33557151823061,36.52753144846065 56.27480253027943, 35.9577403454532L56.27480253027943,35.9577403454532Q56.21403354232825,35.38794924244576 56.03357301342339, 34.83547095377526L56.03357301342339,34.83547095377526Q55.85311248451853,34.28299266510476 55.558443616512704, 33.764613964003274L55.558443616512704,33.764613964003274Q55.263774748506876,33.24623526290179 54.86385090584463, 32.77770682389382L54.86385090584463,32.77770682389382Q54.46392706318238,32.309178384885854 53.97089972945241, 31.904736207498445L53.97089972945241,31.904736207498445Q53.47787239572244,31.500294030111036 52.906721956976526, 31.17222688525044L52.906721956976526,31.17222688525044Q52.33557151823061,30.84415974038984 51.70365209153351, 30.602435782241628L51.70365209153351,30.602435782241628Q51.07173266483642,30.360711824093414 50.39824480220159, 30.212675712810324L50.39824480220159,30.212675712810324Q49.72475693956676,30.064639601527233 49.03016422889914, 30.014789339435538L49.03016422889914,30.014789339435538Q48.33557151823152,29.964939077343843 47.64097880756344, 30.014789339435538L47.64097880756344,30.014789339435538Q46.94638609689537,30.064639601527233 46.27289823426054, 30.212675712810324L46.27289823426054,30.212675712810324Q45.59941037162571,30.360711824093414 44.96749094492861, 30.602435782241628L44.96749094492861,30.602435782241628Q44.33557151823152,30.84415974038984 43.7644210794856, 31.17222688525044L43.7644210794856,31.17222688525044Q43.193270640739684,31.500294030111036 42.700243307009714, 31.904736207498445L42.700243307009714,31.904736207498445Q42.207215973279745,32.309178384885854 41.8072921306175, 32.77770682389382L41.8072921306175,32.77770682389382Q41.40736828795525,33.24623526290179 41.11269941994942, 33.764613964003274L41.11269941994942,33.764613964003274Q40.81803055194359,34.28299266510476 40.637570023038734, 34.83547095377526L40.637570023038734,34.83547095377526Q40.457109494133874,35.38794924244576 40.396340506182696, 35.9577403454532L40.396340506182696,35.9577403454532Q40.33557151823152,36.52753144846065 39.69199316424689, 40.47541783262654L38.46256747221745,48.01705269317795');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M19.45664121093796 3.3588137291653766L49.211041210937765 3.3588137291653766L49.211041210937765 58.003913729166015L19.45664121093796 58.003913729166015Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Image');
       shape.attr({"x":6,"y":10.6015625,"text-anchor":"start","text":"Image","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Stencil');
       shape.attr({"x":7,"y":47.25144621822801,"text-anchor":"start","text":"Stencil","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M48.69640448001155 5.2791650622421L48.864176640010555,56.28452314223341');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
video_assemble_Stencil = video_assemble_Stencil.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getInputPort("input_port2").setSemanticGroup("Image");
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
        var img     = this.getInputPort("input_port1").getValue();
        var stencil = this.getInputPort("input_port2").getValue();
        if((img instanceof HTMLImageElement) &&  (stencil instanceof HTMLImageElement) && this.worker!==null){
            var imageData   = this.imageToData(img);
            var stencilData = this.imageToData(stencil);
            
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage({imageData, stencilData}, [imageData.data.buffer, stencilData.data.buffer]);
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
            var imageData = event.data.imageData;
            var stencilData = event.data.stencilData;

            var pixels = imageData.data;
            var mask   = stencilData.data;
            for (index=0; index < pixels.length; index+=4) {
              
                if(mask[index]!==0){
                    pixels[index]   = 255;
                    pixels[index+1] = 255;
                    pixels[index+2] = 255;
                    pixels[index+3] = 255;
                }
            }

            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
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