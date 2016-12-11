import i18n from 'lib/i18n';
import {renderCountryTreaties} from 'lib/render-treaties';

export default Backbone.View.extend({
  className: 'countries',

  subnav: 'countries',

  render() {
    if (this.template) {
      this.$el.html(this.template({
        this,
        i18n,
        renderCountryTreaties,
      }));
    }

    return this;
  },
});
