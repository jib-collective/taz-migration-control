import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import i18n from 'lib/i18n';
import MapControlItem from 'model/map-layer-control-entry';

export default Backbone.View.extend({
  className: 'layer-control__item',

  tagName: 'li',

  initialize(options) {
    this.model = new MapControlItem(options);
    this.listenTo(this.model, 'change:active', () => this.toggleLayer());
    return this.render();
  },

  events: {
    'change input[type="radio"]': 'toggleLayer',
  },

  toggleLayer(event) {
    if (event) {
      const $input = $(event.target);
      this.model.set('active', $input.prop('selected'));
    }

    const active = this.model.get('active');

    if (active === true) {
      this.enableLayer();
    } else {
      this.disableLayer();
    }

    return this;
  },

  enableLayer() {
    return this.collection.models.forEach(model => {
      model.drawLayer();
    });
  },

  disableLayer() {
    return this.collection.models.forEach(model => {
      model.removeLayer();
    });
  },

  render() {
    this.$el.html(this.template({
      i18n,
      key: this.key
    }));

    return this;
  },

  template: _.template(`
    <label class="layer-control__item-title">
      <input type="radio"
             name="layer-control" />

      <%= i18n(this.model.get('key')) %>
    </label>
  `),
});
