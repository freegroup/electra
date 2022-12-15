
/**
 *
 */
class CommandStack {

    /**
     * Create a new CommandStack objects which can be execute via the CommandStack.
     *
     */
    constructor() {
      this.undostack = []
      this.redostack = []
      this.maxundo = 50
      this.eventListeners = []
    }

    /**
     *
     * Remove the undo / redo history. This is useful if the user has been save the
     * document.
     *
     * @returns {this}
     **/
    markSaveLocation () {
      this.undostack = []
      this.redostack = []

      // fire an empty state to inform all listener that the stack has been changed
      this.notifyListeners()

      return this
    }

    /**
     **/
    push(state) {

      if (typeof state === "undefined")
        throw "Missing parameter [state] for method call CommandStack.execute"

      // nothing to do
      if (state === null)
        return this//silently


      this.undostack.push(state)

      // cleanup the redo stack if the user execute a new state.
      // I think this will create a "clean" behaviour of the unde/redo mechanism.
      //
      this.redostack = []

      // monitor only the max. undo stack size
      //
      if (this.undostack.length > this.maxundo) {
        this.undostack = this.undostack.slice(this.undostack.length - this.maxundo)
      }
      this.notifyListeners(state)

      return this
    }


    /**
     *
     * Undo on state from the stack and store them on the redo state stack.
     * @returns {this}
     **/
    undo () {
      let state = this.undostack.pop()
      if (state) {
        this.redostack.push(state)
        state.undo()
        this.notifyListeners(state)
      }

      return this
    }

    /**
     *
     * Redo a state after the user has undo a state
     *
     * @returns {this}
     **/
    redo() {
      let state = this.redostack.pop()

      if (state) {
        this.undostack.push(state)
        state.redo()
        this.notifyListeners(state)
      }

      return this
    }

    /**
     *
     * Indicates whenever a REDO is possible.
     *
     * @returns {Boolean} <code>true</code> if it is appropriate to call {@link #redo()}.
     */
    canRedo () {
      return this.redostack.length > 0
    }

    /**
     *
     * indicator whenever a undo is possible.
     *
     * @returns {Boolean} <code>true</code> if {@link #undo()} can be called
     **/
    canUndo () {
      return this.undostack.length > 0
    }

    /**
     * Adds a listener to the state stack, which will be notified whenever a state has been processed on the stack.
     *
     * @param event
     * @param func
     * @returns {this}
     */
    on(event, listener) {
      if (event !== "change")
        throw "only event of kind 'change' is supported"

      if (typeof listener.stackChanged === "function") {
        this.eventListeners.push(listener)
      }
      else if (typeof listener === "function") {
        this.eventListeners.push({stackChanged: listener})
      }
      else {
        throw "Object doesn't implement required callback interface [draw2d.state.CommandStackListener]"
      }

      return this
    }

    /**
     *
     * @param listener
     * @returns {this}
     */
    off (listener) {
       this.eventListeners.filter(entry => (entry === listener || entry.stackChanged === listener))
      return this
    }

    /**
     *
     * Notifies state stack event listeners that the state stack has changed to the
     * specified state.
     *
     * @param {draw2d.state.Command} state the state
     * @param {Number} state the current stack state
     * @private
     **/
    notifyListeners(state) {
      this.eventListeners.forEach( (listener)=>{
        listener.stackChanged({
          state: state,
          getStack : () => this
        })
      })
    }
}

let stack = new CommandStack()
export default stack
