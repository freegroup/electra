import typeMapping from "../../../../../common/js/TypeMapping"

let Reader = draw2d.io.json.Reader.extend({

  init: function () {
    this._super()
  },

  unmarshal: function (view, fileData) {
    if (fileData === null) {
      return // silently
    }
    // new JSON format with draw2d&image content
    this._super(view, fileData.draw2d)
  },


  createFigureFromType:function(type){
    return this._super(typeMapping(type))
  }
})

let reader = new Reader()
export default reader
