import Backbone from 'backbone';
import BaseCollection from 'collection/map-base';
import DetentionCenter from 'model/map-country-detention';

export default BaseCollection.extend({
  model: DetentionCenter,

  load() {
    return this.options.api.fetch('detentioncenters')
      .then(data => {
        data.forEach(detentionCenter => this.addItem(detentionCenter));
        this.trigger('sync');
      });
  },
});
