import i18n from 'lib/i18n';
import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    active: false,
  },

  getSlug() {
    let label = this.get('label').toLowerCase();

    if (i18n(label, 'en') === 'countries') {
      return '';
    }

    return limax(label);
  },
});
