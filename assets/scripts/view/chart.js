import $ from 'jquery';
import Backbone from 'backbone';
import c3 from 'c3';

export default Backbone.View.extend({
  fetchData() {
    const promises = [];
    const promiseData = [];

    this.options.countries.forEach(id => {
      const promise = this.options.api.findCountryById(id)
        .then(data => promiseData.push(data));

      promises.push(promise);
    });

    return $.when.apply($, promises).then(data => promiseData);
  },

  buildChart(options) {
    if (this.type === 'remittances') {
      this.$el.addClass('chart--remittances');
    }

    return c3.generate(options);
  },

  initialize(options) {
    this.options = options;
    this.fetchData().then(data => this.renderChart(data));
    return this;
  },
});
