import _ from 'underscore';
import Backbone from 'backbone';
import DetentionCenter from 'model/detention-center';

export default Backbone.Collection.extend({
  model: DetentionCenter,

  initialize(data, options) {
    this.options = options;

    this.options.api.fetch('detentioncenters')
      .then(data => {
        _.forEach(data, item => {
          this.add(item);
        });
      });

    return this;
  },
});
