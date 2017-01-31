import _ from 'underscore';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-intensity';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this._cache = {};

    const dataType = 'migrationIntensity';

    this.on('sync', () => {
      _.forEach(this.models, model => {
        const layerScale = this._getDataRange(dataType);
        const year = this.getEndYear(dataType);
        model.set({layerScale, year});
      });
    });

    return BaseCollection.prototype.initialize.call(this, data, options);
  },
});
