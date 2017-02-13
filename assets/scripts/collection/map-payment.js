import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-payment';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.dataType = 'singlePayments';
    return BaseCollection.prototype.initialize.call(this, data, options);
  },

  shouldAddItem(country) {
    return country.data && country.data.singlePayments;
  },
});
