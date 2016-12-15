import _ from 'underscore';
import Backbone from 'backbone';
import DetentionCenter from 'model/map-country-detention';

export default Backbone.Collection.extend({
  model: DetentionCenter,

  initialize(data, options) {
    this.options = options;
    return this;
  },

  load() {
    return this.options.api.fetch('detentioncenters')
      .then(data => {
        _.forEach(data, center => {
          const attrs = center;
          attrs.map = this.options.map;
          this.add(attrs);
        });

        this.trigger('sync');
      });
  },
});
