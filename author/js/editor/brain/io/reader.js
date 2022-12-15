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

  createFigureFromType: function (type) {
    // patch object types from older versions of JSON
    if (type === "draw2d.Connection") {
      type = "Connection"
    }

    return this._super(type)
  }
})

let reader = new Reader()
export default reader
