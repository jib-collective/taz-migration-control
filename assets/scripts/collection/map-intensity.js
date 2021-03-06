import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-intensity';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.dataType = 'asylumFigures';
    return BaseCollection.prototype.initialize.call(this, data, options);
  },

  shouldAddItem(country) {
    if (!country) {
      return false;
    }

    return !country.isDonorCountry;
  },
});
