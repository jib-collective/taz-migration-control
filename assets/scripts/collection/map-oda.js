import _ from 'underscore';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-oda';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.options = options;

    this.on('add', (model) => {
      model.set({
        layerScale: this._getDataRange('oda'),
      });
    });

    return this;
  },
});
