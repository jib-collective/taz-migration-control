import Backbone from 'backbone';

export default Backbone.Collection.extend({
  getLanguage() {
    return 'de';
  },

  getAPIVersion() {
    return 'v1';
  },

  getAPINamespace() {
    return 'migrationcontrol';
  },

  getAPIEndpointURL(endpoint) {
    const lang = this.getLanguage();
    const version = this.getAPIVersion();
    const ns = this.getAPINamespace();

    return `http://localhost:8080/${ns}/${version}/${lang}/${endpoint}`;
  },
});
