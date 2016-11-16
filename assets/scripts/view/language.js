import _ from 'underscore';
import $ from 'jquery';
import LanguageEntry from 'view/languageEntry';
import LanguagesCollection from 'collection/language';
import LANGUAGES from 'fixtures/languages';

export default Backbone.View.extend({
  tagName: 'ul',

  className: 'header__languages',

  initialize(options) {
    this.options = options;
    this.collection = new LanguagesCollection(LANGUAGES);
  },

  render() {
    this.$el.html(this.template());

    this.collection.forEach(model => {
      const view = new LanguageEntry(Object.assign(this.options, {model}));
      view.render().$el.appendTo(this.$el);
    });

    return this;
  },

  template: _.template(``),
});
