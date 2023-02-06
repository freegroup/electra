/**
 * The Writer is responsible to convert the circuit into a self contained
 * JSON with a preview image and the state of the UI.
 *
 */
let Writer = draw2d.io.json.Writer.extend({

  init: function () {
    this._super()
  },

  marshal: function (canvas, callback) {
    let bb = canvas.getBoundingBox().scale(10, 10) // enlarge 10px in each direction to have a little border
    let scaleW = Math.max(bb.w, 110) - bb.w  
    let scaleH = Math.max(bb.h, 110) - bb.h
    bb = bb.scale(scaleW, scaleH)  
    
    new draw2d.io.png.Writer().marshal(canvas, imageDataUrl => {
      let writer = new draw2d.io.json.Writer()
      writer.marshal(canvas, json => {
        let data = {
          draw2d: json,
          image: imageDataUrl
        }
        callback(data)
      })
    }, bb)
  }
})

let writer = new Writer()
export default writer
