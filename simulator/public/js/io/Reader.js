import typeMapping from "../../../common/js/TypeMapping"

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
      let skipped = []

      // Human-readable list of the ports a figure actually exposes — the key
      // info when a connection can't find the port it was serialized with.
      let portNames = (node) => {
        try { return node.getPorts().asArray().map((p) => `${p.getName()}(${p.NAME.split('.').pop()})`).join(", ") }
        catch (e) { return "?" }
      }

      // Resolve a serialized {node, port} endpoint to a live draw2d port, with
      // loud, specific diagnostics on failure (which is otherwise swallowed).
      let resolveEnd = (element, role, val) => {
        let node = canvas.getFigure(val.node)
        if (node === null) {
          // The referenced figure isn't on the canvas (yet). Because figures are
          // added in array order, this usually means the connection is listed
          // BEFORE one of its endpoint figures in the JSON.
          console.warn(`[load] connection ${element.id}: ${role} figure "${val.node}" not found `
            + `(not on canvas — likely listed after this connection in the file).`)
          throw `${role} figure '${val.node}' not found`
        }
        let port = node.getPort(val.port)
        if (port === null) {
          console.warn(`[load] connection ${element.id}: ${role} port "${val.port}" `
            + `does not exist on figure "${val.node}" (type ${node.NAME}). `
            + `Available ports: [${portNames(node)}]`)
          throw `${role} port '${val.port}' not found at figure '${val.node}'`
        }
        return port
      }

      let nextElement = (element) => {
        return new Promise( (resolve,reject) => {
            requestIdleCallback( ()=> {
              ++current
              try {
                let o = this.createFigureFromType(element.type)
                let source = null;
                let target = null;
                progressCallback(total, current, element.type)
                for (let key in element) {
                  let val = element[key]
                  if (key === "source") {
                    source = resolveEnd(element, "source", val)
                  } else if (key === "target") {
                    target = resolveEnd(element, "target", val)
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
                skipped.push({ type: element.type, id: element.id, reason: String(exc) })
                // Print the stack as TEXT (React DevTools swallows Error objects
                // into a collapsed "Object"). The repeating frames reveal which
                // function recurses over the feedback loop.
                console.error(`[load] SKIPPED ${element.type} "${element.id}":\n`
                  + (exc && exc.stack ? exc.stack : String(exc)));
                resolve()
              }
            })
        })
      }

      let promisses = json.map( element => nextElement(element));
      return Promise.all(promisses).then( ()=>{
        // Loud summary so a partially-loaded circuit (skipped connections =
        // "ports not connected") is never silent.
        if (skipped.length) {
          console.warn(`[load] ${skipped.length} of ${total} element(s) SKIPPED — the drawing is incomplete:`)
          console.table(skipped)
        }

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
      return this._super(typeMapping(type))
    }
})

let reader = new Reader()
export default reader
