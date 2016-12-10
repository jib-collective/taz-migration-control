import _ from 'underscore';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'footer',

  className: 'footer',

  render() {
    this.$el.html(this.template({
      i18n
    }));

    return this;
  },

  template: _.template(`
    <ul class="footer__list">
      <li class="footer__list-item">
        <a href="http://www/taz.de">
          <%= i18n('Ein Projekt von taz, die Tageszeitung') %>
        </a>
      </li>

      <li class="footer__list-item">
        <a href="/">
          <%= i18n('Partners') %>
        </a>
      </li>

      <li class="footer__list-item">
        <a href="/">
          <%= i18n('Finanzierung') %>
        </a>
      </li>

      <li class="footer__list-item">
        <a href="/">
          <%= i18n('Quellen') %>
        </a>
      </li>

      <li class="footer__list-item">
        <a href="/">
          <%= i18n('Impressum') %>
        </a>
      </li>

      <li class="footer__list-item">
        <a href="/">
          <%= i18n('Follow on Facebook') %>
        </a>

        <a href="/">
          <%= i18n('Follow on Twitter') %>
        </a>
      </li>
    </ul>
  `),
});
