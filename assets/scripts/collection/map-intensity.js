import _ from 'underscore';
import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-intensity';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.on('add', (model) => {
      model.set({
        layerScale: this._getDataRange('migrationIntensity'),
      });
    });

    return BaseCollection.prototype.initialize.call(this, data, options);
  },
});
