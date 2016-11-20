import _ from 'underscore';
import $ from 'jquery';
import Slider from 'model/slider';

export default Backbone.View.extend({
  className: 'map__slider slider',

  events: {
    'change [data-slider]': 'updateValue',
  },

  initialize() {
    this.model = new Slider();
    this.listenTo(this.model, 'change', this.render);
    this.start();
    return this;
  },

  start() {
    this.inverval = setInterval(() => {
      let value = this.model.get('value');

      if (value + 1 <= this.model.get('max')) {
        value += 1;
        this.model.set({value});
      } else {
        this.stop();
      }

    }, this.model.get('interval'));
  },

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    return this
  },

  updateValue(event) {
    const value = $(event.target).val();
    this.model.set({value});
  },

  render() {
    this.$el.html(this.template(this));
    this.delegateEvents();
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
