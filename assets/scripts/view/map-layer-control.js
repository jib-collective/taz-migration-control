import _ from 'underscore';
import Backbone from 'backbone';
import DetentionCollection from 'collection/detention';
import LayerControlItem from 'view/map-layer-control-entry';

export default Backbone.View.extend({
  className: 'map__layer-control',

  initialize(options) {
    this.options = options;
    this.listenTo(this.collection, 'layers-painted', this.render);
    return this;
  },

  render() {
    this.$el.html(this.template(this));

    [
      'oda',
      'migrationIntensity',
    ].forEach(key => {
      const view = new LayerControlItem({
        collection: this.collection,
        key,
      });

      view.render().$el.appendTo(this.$el.children('.layer-control'));
    });

    const detentionCenterView = new LayerControlItem({
      map: this.options.map,
      collection: new DetentionCollection([]),
      key: 'detentionCenter',
    });

    detentionCenterView.render().$el.appendTo(this.$el.children('.layer-control'));

    return this;
  },

  template: _.template(`
    <ul class="layer-control"></ul>
  `)
});
