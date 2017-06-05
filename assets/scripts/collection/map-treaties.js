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
});
