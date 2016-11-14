export default Backbone.Model.extend({
  defaults: {
    active: false,
  },

  getSlug() {
    const label = this.get('label').toLowerCase();

    if (label === 'thesis') {
      return '';
    }

    return label;
  },
});
