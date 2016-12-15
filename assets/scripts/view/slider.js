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

    const max = this.model.get('max') + 1;
    const min = this.model.get('min');
    const value = this.model.get('value');
    const ticks = _.range(min, max, 1);
    this.range = new Range(this.$el.children('input').get(0), {
      min,
      max,
      ticks,
      ticks_labels: ticks,
      ticks_snap_bounds: 50,
      tooltip: 'hide',
      value,
    });

    setTimeout(() => {
      this.range.refresh();
    }, 50);

    this.delegateEvents();

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
