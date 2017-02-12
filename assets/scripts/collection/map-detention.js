import Backbone from 'backbone';
import BaseCollection from 'collection/map-base';
import DetentionCenter from 'model/map-country-detention';

export default BaseCollection.extend({
  model: DetentionCenter,

  load() {
    return this.options.api.fetch('detentioncenters')
      .then(data => {
        data.forEach(detentionCenter => {
          detentionCenter.map = this.options.map;
          this.add(detentionCenter);
        });

        this.trigger('sync');
      });
  },
});
