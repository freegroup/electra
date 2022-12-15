

let Reader = draw2d.io.json.Reader.extend({

    init:function(){
        this._super()
    },

    unmarshal:function(view, fileData)
    {
        // new JSON format with draw2d&image content
        this._super(view, fileData.draw2d)

        // restore the UI state
        //
        if(fileData.view){
          let state = fileData.view
          if(state.timerBase){
            view.setTimerBase(state.timerBase)
          }
          if(state.probeWindow){
            view.probeWindow.show()
          }
        }
    },

    createFigureFromType:function(type)
    {
        // patch object types from older versions of JSON
        if(type === "draw2d.Connection"){
            type = "Connection"
        }

        return this._super(type)
    }
})

let reader = new Reader()
export default reader
