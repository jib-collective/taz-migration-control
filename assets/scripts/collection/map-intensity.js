import _ from 'underscore';
import $ from 'jquery';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-intensity';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.dataType = 'migrationIntensity';
    return BaseCollection.prototype.initialize.call(this, data, options);
  },

  shouldAddItem(country) {
    return !country.isDonorCountry;
  },

  load() {
    return this.options.api.fetch('countriesoverview')
      .then(data => {
        const promises = data.map(item => {
          return item.entries.map(overview => {
            return this.options.api.findCountryById(overview.id)
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
});
