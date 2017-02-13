import _ from 'underscore';
import translations from 'fixtures/translations';

export default class I18n {
  constructor(language) {
    this.setLanguage(language);
    return this;
  }

  getLanguage() {
    return this._language;
  }

  setLanguage(language) {
    this._language = language;
  }

  load(str) {
    const entity = translations[str];

    if (!entity) {
      return str;
    }

    return entity[this.language] || str;
  }
}
