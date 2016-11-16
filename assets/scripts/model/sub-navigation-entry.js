import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    active: false,
    label: '',
  },

  getSlug() {
    const label = this.get('label').toLowerCase();

    return limax(label);
  },
});
