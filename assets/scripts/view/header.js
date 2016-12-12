import _ from 'underscore';
import i18n from 'lib/i18n';
import LanguagesCollection from 'collection/language';
import LanguageView from 'view/language';

export default Backbone.View.extend({
  tagName: 'header',

  className: 'header',

  initialize(options) {
    this.options = options;
  },

  render() {
    this.$el.html(this.template({
      i18n
    }));

    /* create language switch */
    //const languageSwitch = new LanguageView(this.options);
    //languageSwitch.render().$el.appendTo(this.$el);

    return this;
  },

  template: _.template(`
    <strong class="header__title">
      <%= i18n('Migration Control') %>
    </strong>
  `),
});
