import _ from 'underscore';
import BaseCollection from 'collection/base';
import SubNavigationColumn from 'model/sub-navigation-column';

export default BaseCollection.extend({
  model: SubNavigationColumn,

  initialize(data, options) {
    this.options = options;

    if (options.slug) {
      this.options.api.fetch(options.slug + 'overview')
        .then(data => {
          _.forEach(data, item => this.add(item));
          this.trigger('sync');
        });
    }
  },
});
