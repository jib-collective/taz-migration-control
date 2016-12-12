import limax from 'limax';

export default Backbone.View.extend({
  subnav: false,

  initialize(options) {
    options.api.findPageByName('Impressum')
      .then(page => {
        const slug = limax(page.name);
        const lang = options.application.get('language');
        options._router.navigate(`${lang}/pages/${slug}`, {trigger: true});
      });
  },
});
