export default draw2d.ui.LabelInplaceEditor.extend({

    NAME : "LabelInplaceEditor",

    /**
     * @constructor
     *
     */
    init: function(attr, setter, getter)
    {
        this._super({
          onStart: () => Mousetrap.pause(),
          onCancel:() => Mousetrap.unpause(),
          onCommit:() => Mousetrap.unpause()
        }, setter, getter);
    }
});
