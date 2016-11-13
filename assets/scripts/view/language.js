import _ from 'underscore';
import $ from 'jquery';
import LanguageEntry from 'view/languageEntry';
import LanguagesCollection from 'collection/language';

export default Backbone.View.extend({
  tagName: 'ul',

  className: 'header__languages',

  initialize() {
    this.listenTo(this.attributes.application, 'change:language', this.render);

    this.collection = new LanguagesCollection([
      {
        label: 'DE',
        endpoint: 'de',
      },

      {
        label: 'FR',
        endpoint: 'fr',
      },

      {
        label: 'EN',
        endpoint: 'en',
      },
    ]);
  },

  render() {
    this.$el.html(this.template());

    this.collection.forEach(model => {
      const active = this.attributes.application.get('language') === model.get('endpoint');
      model.set('active', active);

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
