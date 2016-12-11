import _ from 'underscore';
import BaseCollection from 'collection/base';
import SubNavigationColumn from 'model/sub-navigation-column';

export default BaseCollection.extend({
  model: SubNavigationColumn,

  initialize(data, options) {
    this.options = options;

    if (options.endpoint) {
      this.options.api.fetch(options.endpoint)
        .then(data => {
          _.forEach(data, item => this.add(item));
          this.trigger('sync');
        });
    }
  },

  getActiveLabel() {
    return 'Something';
  },
});
