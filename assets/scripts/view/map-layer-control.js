import _ from 'underscore';
import $ from 'jquery';
import {icon, toggle} from 'lib/icon';
import Backbone from 'backbone';
import DetentionCollection from 'collection/map-detention';
import MigrationIntensityCollection from 'collection/map-intensity';
import PaymentCollection from 'collection/map-payment';
import TreatiesCollection from 'collection/map-treaties';
import LayerControlItem from 'view/map-layer-control-entry';

const ITEM_OPEN_CLASS = 'layer-control__item--open';

export default Backbone.View.extend({
  className: 'map__layer-control',

  events: {
    'change input[type="radio"]': 'toggleLayer',
    'click [data-toggle]': 'toggleLayerView',
  },

  toggleLayer(event) {
    const name = $(event.target).attr('value');
    return this._setActiveAllLayer(name);
  },

  toggleLayerView(event) {
    event.preventDefault();

    const $target = $(event.target);
    const $items = $target.prev().children();

    $items.toggleClass(ITEM_OPEN_CLASS);
  },

  _setActiveAllLayer(name) {
    // cleanup after a layer was added and make sure, only one is applied
    const cleanupLayer = (index) => {
      _.forEach(this.layer, (view, index) => {
        if (index !== name) {
          view.removeLayer();
        }
      });
    };

    return _.forEach(this.layer, (view, index) => {
      if (index === name) {
        view.addLayer().then(() => cleanupLayer(index));
      } else {
        view.removeLayer();
      }
    });
  },

  initialize(options) {
    this.options = options;
    this.layer = {};
    return this.render();
  },

  render() {
    this.$el.html(this.template({
      icon,
    }));

    [
      'singlePayments',
      'asylumFigures',
      'detentionCenter',
      'mapTreaties',
    ].forEach((key, index) => {
      let attrs;
      let collectionAttrs = _.pick(this.options, 'api', 'map', 'i18n');

      switch (key) {
        case 'singlePayments':
          attrs = {
            collection: new PaymentCollection([], collectionAttrs),
          };
          break;

        case 'asylumFigures':
          attrs = {
            collection: new MigrationIntensityCollection([], collectionAttrs),
          };
          break;

        case 'detentionCenter':
          attrs = {
            collection: new DetentionCollection([], collectionAttrs),
          };
          break;

        case 'mapTreaties':
          attrs = {
            collection: new TreatiesCollection([], collectionAttrs),
          }
          break;
      }

      attrs.index = index + 1;

      const viewAttrs = Object.assign({
        map: this.options.map,
        i18n: this.options.i18n,
        key,
        active: index === 0,
      }, attrs);

      const view = new LayerControlItem(viewAttrs);

      // reset open states, when selecting a layer
      view.listenTo(view.model, 'change:active', (model, value) => {
        if (value === true) {
          _.forEach(this.layer, layer => layer.$el.removeClass(ITEM_OPEN_CLASS));
        }
      });

      view.$el.appendTo(this.$el.children('.layer-control'));
      this.layer[key] = view;
    });

    return this;
  },

  template: _.template(`
    <ul class="layer-control"></ul>

    <button type="button"
            class="layer-control-toggle"
            data-toggle>
      <%= icon('chevron-down', 'layer-control-toggle__icon') %>
      <span class="visually-hidden">Toggle map layer</span>
    </button>
  `)
});
