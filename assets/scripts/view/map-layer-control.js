import _ from 'underscore';
import Backbone from 'backbone';
import LayerControlItem from 'view/map-layer-control-entry';

export default Backbone.View.extend({
  className: 'map__layer-control',

  initialize() {
    this.listenTo(this.collection, 'layers-painted', this.render);

    return this;
  },

  render() {
    this.$el.html(this.template(this));

    this.collection.getDataKeys().forEach(key => {
      const view = new LayerControlItem({
        collection: this.collection,
        key,
      });

      view.render().$el.appendTo(this.$el.children('.layer-control'));
    });

    return this;
  },

  template: _.template(`
    <ul class="layer-control"></ul>
  `)
});
