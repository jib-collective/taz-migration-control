import _ from 'underscore';
import $ from 'jquery';
import Slider from 'model/slider';
import Range from 'bootstrap-slider';

export default Backbone.View.extend({
  className: 'map__slider',

  events: {
    'change [data-slider]': 'updateValue',
  },

  initialize(options) {
    this.model = new Slider(options);
    this.listenTo(this.model, 'change', this.updateRangeSlider);
    return this;
  },

  updateValue(event) {
    const value = $(event.target).val();
    this.model.set({value});
  },

  render() {
    this.$el.html(this.template(this));

    const max = this.model.get('max');
    const min = this.model.get('min');
    const value = this.model.get('value');
    const ticks = _.range(min, max + 1, 1);
    const ticks_labels = ticks.map(tick => {
      if (tick === min || tick === max) {
        return tick;
      }

      return '';
    });

    this.range = new Range(this.$el.children('input').get(0), {
      min,
      max,
      ticks,
      ticks_labels,
      value,
    });

    setTimeout(() => {
      this.range.refresh();
    }, 50);

    return this;
  },

  updateRangeSlider() {
    if (!this.range) {
      return this;
    }

    const value = this.model.get('value');
    this.range.setValue(value);
    return this;
  },

  template: _.template(`
     <input type="range"
            min="<%= this.model.get('min') %>"
            max="<%= this.model.get('max') %>"
            step="1"
            value="<%= this.model.get('value') %>"
            data-slider />
  `)
});
