import _ from 'underscore';
import MapCountry from 'model/map-country';

export default Backbone.Collection.extend({
  model: MapCountry,

  initialize(data, options) {
    this.options = options;
    this.on('add', (model) => {
      model.set({
        intensityScale: this._getDataRange('migrationIntensity'),
        odaScale: this._getDataRange('oda'),
      });
    });

    return this;
  },

  build(map) {
    this.options.api.fetch('countriesoverview')
      .then(data => {
        _.forEach(data, item => {
          _.forEach(item.entries, overviewCountry => {
            this.options.api.fetch(`country/${overviewCountry.id}`)
              .then(country => {
                const attrs = country;
                attrs.map = map;
                this.add(attrs);
              });
          });
        });
      });

    return this;
  },

  parse(res) {
    return res.map(item => {
      return {
        name: item.label.toLowerCase(),
        map: this._map,
        data: item.data,
      };
    });
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
