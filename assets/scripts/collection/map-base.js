import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
  initialize(data, options) {
    this.options = options;
    this._cache = {};

    if (this.dataType) {
      this.on('sync', () => {
        this.models.forEach(model => {
          const type = this.dataType;
          const layerScale = this._getDataRange(type);
          const year = this.getEndYear(type);

          if (model.getData(type).length > 0) {
            model.set({layerScale, year});
          }

          if (!model.options) {
            model.options = {};
          }

          model.options.i18n = this.options.i18n;
        });
      });
    }

    return this;
  },

  load() {
    return this.options.api.fetch('countriesoverview')
      .then(res => {
        const promises = res.map(column => {
          return column.entries.map(country => {
            return this.options.api.findCountryById(country.id)
              .then(country => this.addItem(country));
          });
        });

        return $.when.apply($, _.flatten(promises))
          .then(data => {
            this.trigger('sync');
            return data;
          });
      });
  },

  shouldAddItem(item) {
    return true;
  },

  addItem(item) {
    if (!this.shouldAddItem(item)) {
      return this;
    }

    // save map reference to every one of those
    item.map = this.options.map;
    this.add(item);

    return this;
  },

  setYear(year) {
    this.models.forEach(model => model.set({year}));
  },

  _getDataRange(type) {
    // if data was cached, just return it
    if (this._cache[`data-${type}`]) {
      return this._cache[`data-${type}`];
    }

    let values = this.models.map(country => {
      return country.getData(type).map(item => _.values(item)[0].value);
    });

    values = _.flatten(values);

    const min = _.min(values);
    const max = _.max(values);

    // cache results
    return this._cache[`data-${type}`] = [min, max];
  },

  getStartYear(type) {
    return this._getYearByLimiter('min', type);
  },

  getEndYear(type) {
    return this._getYearByLimiter('max', type);
  },

  _getYearByLimiter(limiter, type) {
    const years = this.models.map(model => {
      const data = model.get('data');
      const dataSet = data[type] || [];
      return dataSet.map(item => parseInt(_.keys(item)[0], 10));
    });

    return _[limiter](_.flatten(years));
  }
});
