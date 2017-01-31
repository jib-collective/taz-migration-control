import _ from 'underscore';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-intensity';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this._cache = {};

    this.on('sync', () => {
      _.forEach(this.models, model => {
        model.set({
          layerScale: this._getDataRange('migrationIntensity'),
          year: 2015,
        });
      });
    });

    return BaseCollection.prototype.initialize.call(this, data, options);
  },
});
