import _ from 'underscore';
import Backbone from 'backbone';
import i18n from 'lib/i18n';
import MapControlItem from 'model/map-layer-control-entry';
import SliderView from 'view/slider';

export default Backbone.View.extend({
  className: 'layer-control__item',

  tagName: 'li',

  initialize(options) {
    this.options = options;
    this.model = new MapControlItem(options);
    this.listenTo(this.model, 'change:active', () => this.render());

    // initialize the slider
    this.listenTo(this.options.collection, 'sync', () => {
      if (this.model.get('key') === 'detentionCenter') {
        return;
      }

      const key = this.model.get('key');
      const min = this.collection.getStartYear(key);
      const max = this.collection.getEndYear(key);

      this.slider = new SliderView({
        min: min,
        max: max,
        value: max,
      });

      // set initial year
      this.collection.setYear(this.slider.model.get('value'));

      // listen for year changes
      this.listenTo(this.slider.model, 'change:value', (model, value) => {
        this.collection.setYear(value);
      });

      this.render();
    });

    if (this.model.get('active')) {
      this.addLayer();
    }

    return this.render();
  },

  render() {
    this.$el.html(this.template({
      i18n,
      key: this.model.get('key'),
      active: this.model.get('active'),
      index: this.model.get('index'),
    }));

    this.$el.toggleClass('layer-control__item--active', this.model.get('active'));

    if (this.model.get('active') && this.model.get('key') !== 'detentionCenter') {
      if (this.slider) {
        this.slider.render().$el.appendTo(this.options.map.getContainer());
      }
    } else if (this.slider) {
      this.slider.remove();
    }

    return this;
  },

  addLayer() {
    return this.collection.load()
      .then(() => this.collection.models.forEach(model => model.addLayer()));
  },

  removeLayer() {
    this.collection.models.forEach(model => model.removeLayer());
    return this;
  },

  template: _.template(`
    <label class="layer-control__item-title">
      <input type="radio"
             name="layer-control"
             value="<%= key %>"
             <% if (active) { %> selected <% }%> />

      <span class="layer-control__item-index">
        <%= index %>
      </span>

      <%= i18n(this.model.get('key')) %>
    </label>
  `),
});
