import BaseView from './background-base';
import limax from 'limax';

export default BaseView.extend({
  initialize(options) {
    options.api.findBackgroundByName('Abkommen')
      .then(background => {
        const slug = limax(background.name);
        const lang = options.application.get('language');
        options._router.navigate(`${lang}/background/${slug}`, {trigger: true});
      });
  },
});
