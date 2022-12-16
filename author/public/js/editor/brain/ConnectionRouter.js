import ConnectionSelectionFeedbackPolicy from "./ConnectionSelectionFeedbackPolicy"

export default draw2d.layout.connection.InteractiveManhattanConnectionRouter.extend({
    NAME: "ConnectionRouter",

    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function ()
    {
        this._super();

        this.setBridgeRadius(4);
        this.setVertexRadius(3);
    },

    onInstall: function(conn)
    {
        this._super.apply(this,arguments);
        conn.installEditPolicy(new ConnectionSelectionFeedbackPolicy());
    },

    /**
     * @method
     * Set the radius of the vertex circle.
     *
     * @param {Number} radius
     */
    setVertexRadius: function(radius)
    {
        this.vertexRadius=radius;

        return this;
    },

    /**
     * @method
     * Set the radius or span of the bridge. A bridge will be drawn if two connections are crossing and didn't have any
     * common port.
     *
     * @param {Number} radius
     */
    setBridgeRadius: function(radius)
    {
        this.bridgeRadius=radius;
        this.bridge_LR = [" r", 0.5, -0.5, radius-(radius/2), -(radius-radius/4), radius, -radius,radius+(radius/2), -(radius-radius/4), radius*2, "0 "].join(" ");
        this.bridge_RL = [" r", -0.5, -0.5, -(radius-(radius/2)), -(radius-radius/4), -radius, -radius,-(radius+(radius/2)), -(radius-radius/4), -radius*2, "0 "].join(" ");

        return this;
    },

    /**
     * @inheritdoc
     */
    x_paint: function(conn)
    {
        var _this = this;
        // get the intersections to the other connections
        //
        var intersectionsASC = conn.getCanvas().getIntersection(conn).sort("x");
        var intersectionsDESC= intersectionsASC.clone().reverse();

        var intersectionForCalc = intersectionsASC;

        // add a ArrayList of all added vertex nodes to the connection
        //
        if(typeof conn.vertexNodes!=="undefined" && conn.vertexNodes!==null){
            conn.vertexNodes.remove();
        }
        conn.vertexNodes = conn.canvas.paper.set();

        // ATTENTION: we cast all x/y coordinates to integer and add 0.5 to avoid subpixel rendering of
        //            the connection. The 1px or 2px lines look much clearer than before.
        //
        var ps = conn.getVertices();
        var p = ps.get(0);
        var path = [ "M", p.x, " ", p.y];

        var oldP = p;
        var bridgeWidth =  this.bridgeRadius;
        var bridgeCode  = null;

        var calc = function(ii, interP) {
            if (draw2d.shape.basic.Line.hit(5, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {
                // It is a vertex node..
                //
                if(conn.sharingPorts(interP.other)){
                    var other = interP.other;
                    var otherZ = other.getZOrder();
                    var connZ = conn.getZOrder();
                    if(connZ<otherZ){
                        var vertexNode=conn.canvas.paper.ellipse(interP.x,interP.y, _this.vertexRadius, _this.vertexRadius).attr({fill:conn.lineColor.hash()});
                        conn.vertexNodes.push(vertexNode);
                    }
                }
                // ..or a bridge. We draw only horizontal bridges. Just a design decision
                //
                else if ((p.y|0) === (interP.y|0)) {
                    path.push(" L", (interP.x - bridgeWidth), " ", interP.y);
                    path.push(bridgeCode);
                }
            }
        };

        for (var i = 1; i < ps.getSize(); i++) {
            p = ps.get(i);

            // line goes from right->left.
            if (oldP.x > p.x) {
                intersectionForCalc=intersectionsDESC;
                bridgeCode  = this.bridge_RL;
                bridgeWidth = -this.bridgeRadius;
            }
            // line goes from left->right
            else{
                intersectionForCalc=intersectionsASC;
                bridgeCode  = this.bridge_LR;
                bridgeWidth = this.bridgeRadius;
            }

            // bridge   => the connections didn't have a common port
            // vertex => the connections did have a common source or target port
            //
            intersectionForCalc.each(calc);

            path.push(" L", p.x, " ", p.y);
            oldP = p;
        }
        conn.svgPathString = path.join("");
    }
});
