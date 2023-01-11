/**
 * The Writer is responsible to convert the circuit into a self contained
 * JSON with a preview image and the state of the UI.
 *
 */
let Writer = draw2d.io.json.Writer.extend({

    init:function(){
        this._super()
    },

    marshal:function(canvas, callback)
    {
      new draw2d.io.png.Writer().marshal(canvas, imageDataUrl => {
        let writer = new draw2d.io.json.Writer()
        writer.marshal(canvas, json => {
          let data = {
            draw2d: json,
            image: imageDataUrl,
            view: {
              timerBase:canvas.timerBase,
              probeWindow: canvas.probeWindow.visible
            }
          }
          callback(data)
        })
      }, canvas.getBoundingBox().scale(10, 10))
    }
})

let writer = new Writer()
export default writer
