import ApplicationView from 'view/application';

export default Backbone.Router.extend({
  initialize() {
    this.app = new ApplicationView({
      attributes: {
        _router: this,
      },
    });
    this.app.render().append();
  },

  routes: {
    '': 'redirectToLocale',
    ':language': 'renderIndex',
    ':language/:slug': 'renderView',
  },

  redirectToLocale() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const languagePart = userLanguage.split('-');
    this.app.model.set('language', languagePart[0]);
    this.navigate(languagePart[0], {trigger: true});
  },

  renderIndex() {
    return this.app.view('');
  },

  renderView(language, slug) {
    return this.app.view(slug);
  },
});
