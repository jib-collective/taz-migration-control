import _ from 'underscore';
import $ from 'jquery';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'sub-navigation__list-item',

  initialize(options) {
    this.options = options;
    this.setInitialState();
    this.addListeners();
    return this;
  },

  setInitialState() {
    const appEntry = this.options.application.get('entry');
    this.model.set('active', this.model.getSlug() === appEntry);
  },

  addListeners() {
    this.listenTo(this.model, 'change', this.render);

    this.listenTo(this.options.application, 'change:entry', (model, value) => {
      this.model.set('active', this.model.getSlug() === value);
    });
  },

  events: {
    'click .sub-navigation__item': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    let target = $(event.target).attr('href');
    if (target) {
      this.options._router.navigate(target, {trigger: true});
    }
  },

  render() {
    const language = this.options.application.get('language');
    const slug = this.model.getSlug();
    const attrs = {
      i18n,
      model: this.model,
      url: `/${language}/countries/${slug}`,
    };

    this.$el.html(this.template(attrs));
    return this;
  },

  template: _.template(`
    <% if (this.model.get('active')) { %>
      <span class="sub-navigation__item sub-navigation__item--active">
        <%= i18n( this.model.get('label') ) %>
      </span>
    <% } else { %>
      <a href="<%= url %>"
         class="sub-navigation__item">
        <%= i18n( this.model.get('label') ) %>
      </a>
    <% } %>
  `),
});
