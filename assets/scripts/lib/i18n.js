import _ from 'underscore';
import translations from 'fixtures/translations';

export default class I18n {
  constructor(options) {
    this.options = options;

    if (this.options.application) {
      this.options.application.on('change:language', (model, value) => {
        this.language = value;
      });
    }

    this.language = this.options.application.get('language');
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
