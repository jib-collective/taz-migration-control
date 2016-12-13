import _ from 'underscore';
import TRANSLATIONS from 'fixtures/translations';

export default function i18n(str, sourceLanguage) {
  const language = sourceLanguage || 'de';
  const entity = TRANSLATIONS[str] || undefined;
  let translation;

  if (sourceLanguage) {
    const opts = {};
    opts[sourceLanguage] = str;
    translation = _.findKey(TRANSLATIONS, opts);
  } else if (entity) {
    translation = entity[language] || undefined;
  }

  return translation || str;
};
