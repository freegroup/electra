export default draw2d.ui.LabelInplaceEditor.extend({

    NAME : "LabelInplaceEditor",

    /**
     * @constructor
     *
     */
    init: function(attr, setter, getter)
    {
        this._super({
          onStart: function(){
            Mousetrap.pause()
          },
          onCancel: function(){
            Mousetrap.unpause()
          },
          onCommit: function(){
            Mousetrap.unpause()
          }
        }, setter, getter);
    }
});
