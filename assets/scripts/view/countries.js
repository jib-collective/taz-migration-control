import CountryBaseView from './country-base';
import limax from 'limax';

export default CountryBaseView.extend({
  subnav: false,

  initialize(options) {
    options.api.findItemByFirstPosition('countriesoverview', 'Country')
      .then(country => {
        const slug = limax(country.name);
        const lang = options.application.get('language');
        options._router.navigate(`${lang}/countries/${slug}`, {trigger: true});
      });
  },
});
