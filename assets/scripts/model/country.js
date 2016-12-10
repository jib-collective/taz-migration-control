import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    slug: '',
  },

  initialize() {
    if (this.get('slug')) {
      this.url = this.getURLBySlug(this.get('slug'));
      this.fetch();
    }
  },

  getFinding(attr) {
    return this.attributes.finding[attr];
  },

  getFeatures() {
    return this.attributes.features;
  },

  getURLBySlug(slug) {
    return 'http://localhost:8080/migrationcontrol/v1/de/country/5241/';
  },
});
