import _ from 'underscore';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  className: 'background',

  subnav: 'background',

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
