import ApplicationView from 'view/application';

export default Backbone.Router.extend({
  initialize() {
    this.app = new ApplicationView({
      _router: this,
    });
    this.app.render().append();
  },

  routes: {
    '': 'redirectToLocale',
    ':language': 'renderIndex',
    ':language/:slug': 'renderView',
    ':language/:slug/:entry': 'renderView',
  },

  redirectToLocale() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const languagePart = userLanguage.split('-');
    this.navigate(languagePart[0], {trigger: true});
  },

  renderIndex(language) {
    this.app.model.set('language', language);
    this.app.model.set('slug', '');
    return this.app.view('');
  },

  renderView(language, slug, entry) {
    this.app.model.set({
      language,
      slug,
      entry,
    });
    return this.app.view(slug, entry);
  },
});
