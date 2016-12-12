import _ from 'underscore';
import $ from 'jquery';
import i18n from 'lib/i18n';
import Entry from 'view/footer-entry';
import FooterCollection from 'collection/footer';

export default Backbone.View.extend({
  tagName: 'footer',

  className: 'footer',

  events: {
    'click .footer__item': 'navigateTo',
  },

  initialize(options) {
    this.options = options;
    this.collection = new FooterCollection([], this.options);
    this.listenTo(this.collection, 'sync', this.render);
    return this;
  },

  navigateTo(event) {
    if (event) {
      event.preventDefault();
    }

    const target = $(event.target).attr('href');
    this.options._router.navigate(target, {trigger: true});

    return this;
  },

  render() {
    this.$el.html(this.template({
      i18n,
      language: this.options.application.get('language'),
    }));

    this.collection.models.forEach(model => {
      const options = Object.assign(this.options, {
        model
      });
      const view = new Entry(options);
      view.$el.appendTo(this.$el.find('.footer__list'));
    });

    return this;
  },

  template: _.template(`
    <ul class="footer__list">
      <li class="footer__list-item">
        <a href="http://www/taz.de"
           class="footer__item">
          <%= i18n('A project of taz, the daily newspaper') %>
        </a>
      </li>

      <li class="footer__list-item">
        <a href="https://www.facebook.com/migcontrol/"
           class="footer__item">
          <%= i18n('Follow on Facebook') %>
        </a>

        <a href="https://twitter.com/MigControl">
          <%= i18n('Follow on Twitter') %>
        </a>
      </li>
    </ul>
  `),
});
