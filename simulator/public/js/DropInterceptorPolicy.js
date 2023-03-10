export default draw2d.policy.canvas.DropInterceptorPolicy.extend({

  NAME: "draw2d.policy.canvas.DropInterceptorPolicy",

  /**
   * @constructor
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * @method
   * Called if the user want connect a port with any kind draw2d.Figure.<br>
   * Return a non <b>null</b> value if the interceptor accept the connect event.<br>
   * <br>
   * It is possible to delegate the drop event to another figure if the policy
   * returns another figure. This is usefull if a figure want to accept a port
   * drop event and delegates this drop event to another port.<br>
   *
   *
   * @param {draw2d.Figure} connectInquirer the figure who wants connect (dragging port)
   * @param {draw2d.Figure} connectIntent the potential connect target (drop target port)
   *
   * @return {draw2d.Figure} the calculated connect intent or <b>null</b> if the interceptor uses the veto right
   */
  delegateTarget: function (connectInquirer, connectIntent) {

    // we allow that a figure with a special class is droppable to a connection
    //
    if (connectInquirer instanceof draw2d.shape.node.Node && connectIntent instanceof draw2d.Connection) {
      if (connectInquirer.getInputPorts().getSize() > 0 && connectInquirer.getOutputPorts().getSize() > 0) {
        return connectIntent
      }
    }

    // a composite accept any kind of figures exceptional ports
    //
    if (!(connectInquirer instanceof draw2d.Port) && connectIntent instanceof draw2d.shape.composite.StrongComposite) {
      return connectIntent
    }

    // Ports accepts only Ports from the same semanticGroup as DropTarget
    //
    if ((connectIntent instanceof draw2d.Port) && (connectInquirer instanceof draw2d.Port)) {
      if(connectIntent.getSemanticGroup() !== connectInquirer.getSemanticGroup()) {
        return null
      }
    }

    // Ports accepts only Ports as DropTarget
    //
    if (!(connectIntent instanceof draw2d.Port) || !(connectInquirer instanceof draw2d.Port)) {
      return null
    }

    // ////////////////////////////////////////////////////////////
    // at this stage we a sure, that we have two ports as argument
    // ////////////////////////////////////////////////////////////

    // It is not possible to create a loop back connection at the moment.
    // Reason: no connection router implemented for this case
    if (connectInquirer.getParent() === connectIntent.getParent()) {
      return null
    }
        
    // It is not allowed to connect two output ports
    if (connectInquirer instanceof draw2d.OutputPort && connectIntent instanceof draw2d.OutputPort) {
      return null
    }

    // It is not allowed to connect two input ports
    if (connectInquirer instanceof draw2d.InputPort && connectIntent instanceof draw2d.InputPort) {
      return null
    }


    // redirect the dragEnter handling to the hybrid port
    //
    if ((connectIntent.getParent() instanceof draw2d.shape.node.Hub)) {

      let inputConnections = connectIntent.getConnections().asArray().filter( con => (con.getPeerPort(connectIntent) instanceof draw2d.OutputPort))
      let outputConnections = connectIntent.getConnections().asArray().filter( con => (con.getPeerPort(connectIntent) instanceof draw2d.InputPort))

      if (connectInquirer instanceof draw2d.InputPort && outputConnections.length >= connectIntent.getMaxFanOut()) {
        return null
      }

      if (connectInquirer instanceof draw2d.OutputPort && inputConnections.length >= connectIntent.getMaxFanIn()) {
        return null
      }

      if (connectInquirer instanceof draw2d.HybridPort && inputConnections.length >= connectIntent.getMaxFanIn()) {
        return null
      }

      return connectIntent
    }


    // consider the max possible connections for this port
    //
    if (connectIntent.getConnections().getSize() >= connectIntent.getMaxFanOut()) {
      return null
    }


    // return the connectTarget determined by the framework or delegate it to another
    // figure.
    return connectIntent
  }

})
