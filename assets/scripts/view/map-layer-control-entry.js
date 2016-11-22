import _ from 'underscore';
import Backbone from 'backbone';
import i18n from 'lib/i18n';
import MapControlItem from 'model/map-layer-control-entry';

export default Backbone.View.extend({
  className: 'layer-control__item',

  tagName: 'li',

  initialize(options) {
    this.model = new MapControlItem(options);
    return this;
  },

  enableLayer() {

  },

  disableLayer() {

  },

  render() {
    this.$el.html(this.template({
      i18n,
      key: this.key
    }));

    return this;
  },

  template: _.template(`
    <strong class="layer-control__item-title">
      <%= i18n(this.model.get('key')) %>
    </strong>
  `),
});
