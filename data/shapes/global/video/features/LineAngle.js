// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_features_LineAngle = CircuitFigure.extend({

   NAME: "video_features_LineAngle",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.859428095247814 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.859428095247814 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
     // output_angle
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 81.20509416759656 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_angle");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.04423942400535 L0,80.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Line Angle');
       shape.attr({"x":4.3266039182290115,"y":68.04423942400535,"text-anchor":"start","text":"Line Angle","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#000000","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // PictureFrame
       shape = this.canvas.paper.path('M4.228799999999865,8.044239424005355Q4.228799999999865,4.0442394240053545 8.228799999999865, 4.0442394240053545L71.22879999999986,4.0442394240053545Q75.22879999999986,4.0442394240053545 75.22879999999986, 8.044239424005355L75.22879999999986,52.044239424005355Q75.22879999999986,56.044239424005355 71.22879999999986, 56.044239424005355L8.228799999999865,56.044239424005355Q4.228799999999865,56.044239424005355 4.228799999999865, 52.044239424005355L4.228799999999865,8.044239424005355');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","PictureFrame");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":54.29535391822901,"cy":39.909599999999955,"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M18.566656000002695 8.730641212006049L27.741696000002776 20.789265212005375L18.566656000002695 20.789265212005375Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":2,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M41.89747200000329 6.109201212002517L40.97996800000374,9.517073212003197Q40.062464000004184,12.924945212003877 37.30995200000325, 20.65819321200479L37.30995200000325,20.65819321200479Q34.557440000002316,28.391441212005702 33.20585518239518, 37.289374594584714L31.4117120000019,49.100817212005495');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M25.139520000010634 48.333649211997L26.84345600000779,42.43540921199883Q28.547392000004947,36.53716921200066 23.885079773487288, 28.8389327449607L21.937512226522248,25.62318167904202Q17.275200000004588,17.924945212002058 13.503676402846846, 26.09657967250519L13.182403597159013,26.79267075149505Q9.41088000000127,34.96430521199818 10.983744000002844, 41.386833212000056L12.556608000004417,47.80936121200193');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M59.947317759990256 26.990202171997225L42.03763967999657,21.684407612005998');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M43.619281919998684 28.46698681199905L39.8653798400037,21.032582972004093L46.513351680005144,16.785850172007486');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
video_features_LineAngle = video_features_LineAngle.extend({

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
            var pixels    = imageData.data;
            var width     = imageData.width;
            var height    = imageData.height;
            var angles    = 360;
            var rhoMax    = Math.sqrt(width*width + height*height);
            var accum     = Array(angles);
            var houghAccCalled=false;
            
            // Precalculate tables.
            if(self.cosTable===undefined){
                self.cosTable = new Float64Array(angles);
                self.sinTable = new Float64Array(angles);
                var theta = 0;
                var piSteps = Math.PI / angles;
                for (var i = 0; i < angles; i++) {
                    self.cosTable[i] = Math.cos(theta);
                    self.sinTable[i] = Math.sin(theta);
                    theta += piSteps;
                }
            }
           
            function getAngle(line) {
                if(!line) return null;
                return 180-(Math.atan2(line.y1 - line.y2, line.x1 - line.x2) * 180 / Math.PI)|0;
            }

            function getFont() {
                var ratio = 0.3;   // calc ratio
                var size = width * ratio;   // get font size based on current width
                return "normal 100 "+ (size|0) + "px Verdana"; // set font
            }
            
            // Clipping helper
            //
            // bit code reflects the point position relative to the bbox:
            //         left  mid  right
            //    top  1001  1000  1010
            //    mid  0001  0000  0010
            // bottom  0101  0100  0110
            function bitCode(p, bbox) {
                var code = 0;
            
                if (p[0] < bbox[0]) code |= 1; // left
                else if (p[0] > bbox[2]) code |= 2; // right
            
                if (p[1] < bbox[1]) code |= 4; // bottom
                else if (p[1] > bbox[3]) code |= 8; // top
            
                return code;
            }
            
            // intersect a segment against one of the 4 lines that make up the bbox
            function intersect(a, b, edge, bbox) {
                return edge & 8 ? [a[0] + (b[0] - a[0]) * (bbox[3] - a[1]) / (b[1] - a[1]), bbox[3]] : // top
                    edge & 4 ? [a[0] + (b[0] - a[0]) * (bbox[1] - a[1]) / (b[1] - a[1]), bbox[1]] : // bottom
                    edge & 2 ? [bbox[2], a[1] + (b[1] - a[1]) * (bbox[2] - a[0]) / (b[0] - a[0])] : // right
                    edge & 1 ? [bbox[0], a[1] + (b[1] - a[1]) * (bbox[0] - a[0]) / (b[0] - a[0])] : null; // left
            }
            
            // Sutherland-Hodgeman polygon clipping algorithm
            function clipLine(line, w, h) {
                if(!line) return null;
                var offset = 10;
                var points = [[line.x1, line.y1],[line.x2, line.y2]];
                var bbox = [offset,offset, w-offset, h-offset];
                var len = points.length,
                    codeA = bitCode(points[0], bbox),
                    part = [],
                    i, a, b, codeB, lastCode,
                    result = [];
            
                for (i = 1; i < len; i++) {
                    a = points[i - 1];
                    b = points[i];
                    codeB = lastCode = bitCode(b, bbox);
            
                    while (true) {
            
                        if (!(codeA | codeB)) { // accept
                            part.push(a);
                            if (codeB !== lastCode) { // segment went outside
                                part.push(b);
                                if (i < len - 1) { // start a new line
                                    result.push(part);
                                    part = [];
                                }
                            } else if (i === len - 1) {
                                part.push(b);
                            }
                            break;
                        } else if (codeA & codeB) { // trivial reject
                            break;
                        } else if (codeA) { // a outside, intersect with clip edge
                            a = intersect(a, b, codeA, bbox);
                            codeA = bitCode(a, bbox);
                        } else { // b outside
                            b = intersect(a, b, codeB, bbox);
                            codeB = bitCode(b, bbox);
                        }
                    }
                    codeA = lastCode;
                }
            
                if (part.length) result.push(part);
            
                if(result.length > 0){
                    result = result[0]
                    if(result.length === 2){
                        p1 = result[0];
                        p2 = result[1];
                        return {x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1]}
                    }
                }
                return null;
            }

            function findMaxInHough() {
                var max = 0;
                var bestRho = 0;
                var bestTheta = 0;
                for (var i = 0; i < angles; i++) {
                    for (var j = 0; j < accum[i].length; j++) {
                        if (accum[i][j] > max) {
                            max = accum[i][j];
                            bestRho = j;
                            bestTheta = i;
                        }
                    }
                }

                if (max > height) {
                    bestRho <<= 1; // accumulator is bitshifted
                    bestRho -= rhoMax; /// accumulator has rhoMax added
                    var a = self.cosTable[bestTheta];
                    var b = self.sinTable[bestTheta];

                    var x1 = (a * bestRho + 1000 * (-b))|0;
                    var y1 = (b * bestRho + 1000 * ( a))|0;
                    var x2 = (a * bestRho - 1000 * (-b))|0;
                    var y2 = (b * bestRho - 1000 * ( a))|0;
                    // return a line with P1(x1,y1) and P2(x2,y2)
                    // startpoint is ALWAYS on the downside
                    if(y1<y2){
                        return {x1:x2 + width / 2,  y1:y2 + height / 2, x2:x1 + width / 2,  y2:y1 + height / 2 };
                    }
                    else{
                        return {x1:x1 + width / 2,  y1:y1 + height / 2, x2:x2 + width / 2,  y2:y2 + height / 2 };
                    }
                }
                return null;
            }
            
            function houghAcc(x, y) {
                houghAccCalled= true;
                var rho;
                x -= width  / 2;
                y -= height / 2;
                for (var index = 0; index < angles; index++) {
                    rho = rhoMax + x * self.cosTable[index] + y * self.sinTable[index];
                    rho >>= 1;
                    if (accum[index] === undefined) accum[index] = [];
                    if (accum[index][rho] === undefined) {
                       accum[index][rho] = 1;
                    } else {
                       accum[index][rho]++;
                    }
                }
            }
            
            for (var index=0; index<pixels.length; index+=4) {
                // because we NEED a black/white image we can just use the RED part
                // if the RGBA color
                if(pixels[index]<80){
                    var x = (index/4) % width;
                    var y = (index/4) / width;
                    houghAcc(x,y);
                }
            }

            var line = houghAccCalled?findMaxInHough():null;
            
            var canvas = new OffscreenCanvas(width, height);
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.beginPath();
            ctx.fillRect(0,0, width, height);
            ctx.closePath();
            
            line = clipLine(line,width, height)
            angle = getAngle(line);
            if(line){
                var stroke = Math.max(2,(width/25)|0);
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255,0,0,1)';
                ctx.lineWidth = stroke;
                ctx.moveTo(line.x1, line.y1);
                ctx.lineTo(line.x2, line.y2);
                ctx.stroke();
                ctx.closePath();
                
                ctx.beginPath();
                ctx.arc(line.x1, line.y1, stroke/2+1, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#0000ff';
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(line.x2, line.y2, stroke/2+1, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#00FF00';
                ctx.fill();
                ctx.closePath();

                ctx.font = getFont();
                ctx.textBaseline = "top";
                ctx.fillStyle = "#d0d0d0";
                ctx.fillText(""+angle+"°" , 0, 0);
            }
            imageData = ctx.getImageData(0, 0, width, height);
            self.postMessage({imageData, angle}, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data.imageData;
            var angle = event.data.angle;
            // map the angle [0..180] to [0..5]
            angle = 5/180*angle;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                console.log(angle);
                this.getOutputPort("output_port1").setValue(image);
                this.getOutputPort("output_angle").setValue(angle);
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