import _ from 'underscore';
import $ from 'jquery';
import LanguageEntry from 'view/languageEntry';
import LanguagesCollection from 'collection/language';
import LANGUAGES from 'fixtures/languages';

export default Backbone.View.extend({
  tagName: 'ul',

  className: 'header__languages',

  initialize() {
    this.collection = new LanguagesCollection(LANGUAGES);
  },

  render() {
    this.$el.html(this.template());

    this.collection.forEach(model => {
      const view = new LanguageEntry({
        attributes: this.attributes,
        model
      });

      view.render().$el.appendTo(this.$el);
    });

    return this;
  },

  template: _.template(``),
});
