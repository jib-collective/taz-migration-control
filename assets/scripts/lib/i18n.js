import _ from 'underscore';
import translations from 'fixtures/translations';

export default class I18n {
  constructor(language) {
    this.language = language;
    return this;
  }

  load(str) {
    const entity = translations[str];

    if (!entity) {
      //console.log('i18n: missing', entity);
      return str;
    }

    return entity[this.language] || str;
  }
}
