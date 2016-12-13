import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  getFinding(attr) {
    return this.attributes.finding[attr];
  },

  getFeatures() {
    const features = _.compact(this.get('features'));
    return features.length > 0 ? features : false;
  },
});
