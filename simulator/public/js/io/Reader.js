let Reader = draw2d.io.json.Reader.extend({

    init:function(){
        this._super()
    },

    // function signature "progressCallback(total, current, objecType)"
    //
    unmarshal: async function(canvas, json, progressCallback)
    {
      json = json.draw2d
      progressCallback ??= ()=>{}

      let total = json.length
      let current = 0
      let nextElement = (element) => {
        return new Promise( (resolve,reject) => {
            requestIdleCallback( ()=> {
              ++current
              try {
                let node = null
                let o = this.createFigureFromType(element.type)
                let source = null;
                let target = null;
                progressCallback(total, current, element.type)
                for (let key in element) {
                  let val = element[key]
                  if (key === "source") {
                    node = canvas.getFigure(val.node)
                    if (node === null) {
                      throw "Source figure with id '" + val.node + "' not found"
                    }
                    source = node.getPort(val.port)
                    if (source === null) {
                      throw "Unable to find source port '" + val.port + "' at figure '" + val.node + "' to unmarschal '" + element.type + "'"
                    }
                  } else if (key === "target") {
                    node = canvas.getFigure(val.node)
                    if (node === null) {
                      throw "Target figure with id '" + val.node + "' not found"
                    }
                    target = node.getPort(val.port)
                    if (target === null) {
                      throw "Unable to find target port '" + val.port + "' at figure '" + val.node + "' to unmarschal '" + element.type + "'"
                    }
                  }
                }
                if (source !== null && target !== null) {
                  // don't change the order or the source/target set.
                  // TARGET must always be the second one because some applications needs the "source"
                  // port in the "connect" event of the target.
                  o.setSource(source)
                  o.setTarget(target)
                }
                o.setPersistentAttributes(element)
                canvas.add(o)
                resolve()
              } catch (exc) {
                debug.error(element, "Unable to instantiate figure type '" + element.type + "' with id '" + element.id + "' during unmarshal. Skipping figure..");
                debug.error(exc)
                resolve()
              }
            })
        })
      }

      let promisses = json.map( element => nextElement(element));
      return Promise.all(promisses).then( ()=>{
        // restore group assignment
        //
        json.forEach(element => {
          if (typeof element.composite !== "undefined") {
            let figure = canvas.getFigure(element.id) || canvas.getLine(element.id);
            let group  = canvas.getFigure(element.composite);
            group.assignFigure(figure);
          }
        });
  
        canvas.showDecoration();

        // restore the UI state
        //
        if(json.view){
          let state = json.view
          if(state.timerBase){
            canvas.setTimerBase(state.timerBase)
          }
          if(state.probeWindow){
            canvas.probeWindow.show()
          }
        }
      })
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
