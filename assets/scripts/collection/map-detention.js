import Backbone from 'backbone';
import DetentionCenter from 'model/map-country-detention';

export default Backbone.Collection.extend({
  model: DetentionCenter,

  initialize(data, options) {
    this.options = options;
    this._cache = {};
    return this;
  },

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
