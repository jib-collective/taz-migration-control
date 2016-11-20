import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    active: false,
  },

  getSlug() {
    const label = this.get('label').toLowerCase();

    if (label === 'countries') {
      return '';
    }

    return limax(label);
  },
});
