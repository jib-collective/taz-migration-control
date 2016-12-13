import _ from 'underscore';
import Backbone from 'backbone';
import DetentionCollection from 'collection/map-detention';
import MigrationIntensityCollection from 'collection/map-intensity';
import ODACollection from 'collection/map-oda';
import LayerControlItem from 'view/map-layer-control-entry';

export default Backbone.View.extend({
  className: 'map__layer-control',

  initialize(options) {
    this.options = options;
    return this.render();
  },

  render() {
    this.$el.html(this.template());

    [
      'oda',
      'migrationIntensity',
      'detentionCenter',
    ].forEach((key, index) => {
      let attrs;
      let collectionAttrs = _.pick(this.options, 'api', 'map');

      switch (key) {
        case 'oda':
          attrs = {
            collection: new ODACollection([], collectionAttrs),
          };
          break;

        case 'migrationIntensity':
          attrs = {
            collection: new MigrationIntensityCollection([], collectionAttrs),
          };
          break;

        case 'detentionCenter':
          attrs = {
            collection: new DetentionCollection([], collectionAttrs),
          };
          break;
      }

      const viewAttrs = Object.assign({
        map: this.options.map,
        key,
        active: index === 0,
      }, attrs);
      const view = new LayerControlItem(viewAttrs);

      view.$el.appendTo(this.$el.children('.layer-control'));
    });

    return this;
  },

  template: _.template(`
    <ul class="layer-control"></ul>
  `)
});
