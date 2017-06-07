import ApplicationView from 'view/application';
import LANGUAGES from 'fixtures/languages';

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
    const userLanguage = navigator.language || navigator.userLanguage;
    const languagePart = userLanguage.split('-');
    let lang = languagePart[0];

    // set fallback language to EN
    if (!LANGUAGES.filter(item => item.label === lang).length > 0) {
      lang = 'en';
    }

    this.navigate(lang, {trigger: true});
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
