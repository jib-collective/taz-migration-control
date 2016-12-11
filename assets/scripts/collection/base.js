import API from 'lib/api';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
  getAPIEndpointURL(endpoint) {
    return new API()._buildAPIUrl(endpoint);
  },
});
