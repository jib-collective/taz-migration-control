import Backbone from 'backbone';

export default Backbone.Model.extend({
  getFinding(attr) {
    return this.attributes.finding[attr];
  },

  getFeatures() {
    return this.attributes.features;
  },
});
