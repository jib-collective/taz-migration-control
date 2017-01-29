import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import DetentionCollection from 'collection/map-detention';
import MigrationIntensityCollection from 'collection/map-intensity';
import PaymentCollection from 'collection/map-payment';
import LayerControlItem from 'view/map-layer-control-entry';

export default Backbone.View.extend({
  className: 'map__layer-control',

  events: {
    'change input[type="radio"]': 'toggleLayer',
  },

  toggleLayer(event) {
    const $target = $(event.target);
    const active = $target.prop('selected');
    const name = $target.attr('value');

    return this._setActiveAllLayer(name);
  },

  _setActiveAllLayer(name) {
    return _.forEach(this.layer, (view, index) => {
      if (index === name) {
        return view.addLayer()
          .then(() => view.model.set('active', true));
      } else {
        view.removeLayer();
        view.model.set('active', false)
      }
    });
  },

  initialize(options) {
    this.options = options;
    this.layer = {};
    return this.render();
  },

  render() {
    this.$el.html(this.template());

    [
      'singlePayments',
      'migrationIntensity',
      'detentionCenter',
    ].forEach((key, index) => {
      let attrs;
      let collectionAttrs = _.pick(this.options, 'api', 'map');

      switch (key) {
        case 'singlePayments':
          attrs = {
            collection: new PaymentCollection([], collectionAttrs),
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
      this.layer[key] = view;
    });

    return this;
  },

  template: _.template(`
    <ul class="layer-control"></ul>
    <button type="button"
            class="layer-control-toggle">
      // Icon
      <span class="visually-hidden">Toggle map layer</span>
    </button>
  `)
});
