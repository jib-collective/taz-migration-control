import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    active: false,
  },

  getSlug() {
    let label = this.get('label').toLowerCase();

    // index page
    if (label === 'theses') {
      return '';
    }

    return limax(label);
  },
});
