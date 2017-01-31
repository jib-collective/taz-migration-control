import _ from 'underscore';
import $ from 'jquery';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-payment';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.options = options;
    this._cache = {};

    this.on('sync', () => {
      this.models.forEach(model => {
        model.set({
          layerScale: this._getDataRange('singlePayments'),
          year: 2016,
        });
      });
    });

    return this;
  },

  load() {
    return this.options.api.fetch('countriesoverview')
      .then(data => {
        const promises = [];

        _.forEach(data, item => {
          _.forEach(item.entries, overviewCountry => {
            const promise = this.options.api.fetch(`country/${overviewCountry.id}`)
              .then(country => {
                if (country.data && country.data.singlePayments) {
                  const attrs = country;
                  attrs.map = this.options.map;
                  this.add(attrs);
                }
              });

            promises.push(promise);
          });
        });

        return $.when.apply($, promises)
          .then(data => {
            this.trigger('sync');
            return data;
          });
      });
  },
});
