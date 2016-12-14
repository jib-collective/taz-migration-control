import i18n from 'lib/i18n';
import {renderCountryTreaties} from 'lib/render-treaties';
import {renderAuthors} from 'lib/render-authors';

export default Backbone.View.extend({
  className: 'countries',

  subnav: 'countries',

  render() {
    if (this.template) {
      this.$el.html(this.template({
        this,
        i18n,
        renderCountryTreaties,
        renderAuthors,
      }));
    }

    if (this.scrollIntoView) {
      this.scrollIntoView();
    }

    return this;
  },
});
