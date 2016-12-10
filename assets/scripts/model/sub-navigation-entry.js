import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    active: false,
    name: '',
  },

  getTitle() {
    return this.get('name');
  },

  getSlug() {
    return limax(this.getTitle().toLowerCase());
  },
});
