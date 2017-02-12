import BaseView from './background-base';
import limax from 'limax';

export default BaseView.extend({
  subnav: false,

  initialize(options) {
    options.api.findItemByFirstPosition('backgroundoverview', 'Background')
      .then(background => {
        const slug = limax(background.name);
        const lang = options.application.get('language');
        options._router.navigate(`${lang}/background/${slug}`, {trigger: true});
      });
  },
});
