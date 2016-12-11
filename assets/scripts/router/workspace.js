import ApplicationView from 'view/application';

export default Backbone.Router.extend({
  initialize() {
    this.app = new ApplicationView({
      _router: this,
    });
  },

  routes: {
    '': 'redirectToLocale',
    ':language': 'renderIndex',
    ':language/imprint': 'renderImprint',
    ':language/:slug': 'renderView',
    ':language/:slug/:entry': 'renderView',
  },

  redirectToLocale() {
    //const userLanguage = navigator.language || navigator.userLanguage;
    //const languagePart = userLanguage.split('-');
    //this.navigate(languagePart[0], {trigger: true});
    this.navigate('de', {trigger: true});
  },

  renderIndex(language) {
    this.app.model.set({
      language,
      slug: 'index',
      entry: '',
    });

    return this;
  },

  renderView(language, slug, entry) {
    this.app.model.set({
      language,
      slug,
      entry,
    });

    return this;
  },
});
