import _ from 'underscore';
import CountryBaseView from './country-base';

export default CountryBaseView.extend({
  className: 'countries',

  template: _.template(`
    <p>Single Country view</p>
  `),
});
