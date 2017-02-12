import _ from 'underscore';
import $ from 'jquery';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-payment';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.options = options;
    this._cache = {};

    const dataType = 'singlePayments';

    this.on('sync', () => {
      this.models.forEach(model => {
        const layerScale = this._getDataRange(dataType);
        const year = this.getEndYear(dataType);

        if (model.getData(dataType).length > 0) {
          model.set({layerScale, year});
        }
      });
    });

    return this;
  },

  load() {
    return this.options.api.fetch('countriesoverview')
      .then(data => {
        const promises = data.map(item => {
          return item.entries.map(overview => {
            return this.options.api.findCountryById(overview.id)
              .then(country => {
                if (!country.data || !country.data.singlePayments) {
                  return undefined;
                }

                country.map = this.options.map;
                this.add(country);
              });
          });
        });

        return $.when.apply($, _.flatten(promises))
          .then(data => {
            this.trigger('sync');
            return data;
          });
      });
  },
});
