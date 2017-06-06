import _ from 'lodash';
import Backbone from 'backbone';
import BaseCollection from 'collection/map-base';
import Treaties from 'model/map-country-treaties';

export default BaseCollection.extend({
  model: Treaties,

  load() {
    return this.options.api.fetch('treatiesoverview')
      .then(data => {
        data.forEach(treaty => this.addItem(treaty));
        this.trigger('sync');
      });
  },

  _getYearByLimiter(limiter, type) {
    const years = this.models.map(model => {
      const date = model.get('date');
      return date.year;
    });

    return _[limiter](_.flatten(years));
  },
});
