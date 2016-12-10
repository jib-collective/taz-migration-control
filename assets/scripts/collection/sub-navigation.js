import BaseCollection from 'collection/base';
import SubNavigationColumn from 'model/sub-navigation-column';

export default BaseCollection.extend({
  model: SubNavigationColumn,

  initialize(data, options) {
    if (options.endpoint) {
      this.url = this.getAPIEndpointURL(options.endpoint);
      this.fetch();
    }
  },

  getActiveLabel() {
    return 'Something';
  },
});
