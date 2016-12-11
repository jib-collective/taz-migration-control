import API from 'lib/api';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
  initialize(data, options) {
    this.options = options;
    return this;
  },
});
