import _ from 'underscore';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  className: 'countries',

  subnav: 'background',

  initialize() {
    return this;
  },

  render() {
    if (this.template) {
      this.$el.html(this.template({
        this,
        i18n,
      }));
    }

    return this;
  },
});
