import $ from 'jquery';
import i18n from 'lib/i18n';

export function setPageTitle(title) {
  const appendix = i18n('Migration Control');
  $('title').text(`${title} | ${appendix}`);
};
