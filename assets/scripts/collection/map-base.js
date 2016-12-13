import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
  initialize(data, options) {
    this.options = options;

    this.options.api.fetch('countriesoverview')
      .then(data => {
        _.forEach(data, item => {
          _.forEach(item.entries, overviewCountry => {
            this.options.api.fetch(`country/${overviewCountry.id}`)
              .then(country => {
                if (country.isDonorCountry === false) {
                  const attrs = country;
                  attrs.map = this.options.map;
                  this.add(attrs);
                }
              });
          });
        });
      });

    return this;
  },

  setYear(year) {
    this.models.forEach(model => {
      model.set({year});
    });
  },

  _getDataRange(type) {
    let max = 0;
    let min;

    this.models.forEach(country => {
      const data = country.get('data');
      const dataSet = data[type] || {};

      _.forEach(dataSet, item => {
        const value = _.values(item)[0];

        if (!min) {
          min = value
        } else if (value < min) {
          min = value;
        }

        if (value > max) {
          max = value;
        }
      });
    });

    return [
      min,
      max,
    ];
  },
});
