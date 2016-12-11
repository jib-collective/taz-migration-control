import TRANSLATIONS from 'fixtures/translations';

export default function i18n(str, targetLanguage) {
  const language = targetLanguage || 'de';
  const entity = TRANSLATIONS[str] || undefined;
  let translation;

  if (entity) {
    translation = entity[language] || undefined;
  }

  if (!translation) {
    console.log('Missed translation: ', str, ', language: ', language);
  }

  return translation || str;
};
