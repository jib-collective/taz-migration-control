import _ from 'underscore';
import $ from 'jquery';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'sub-navigation__list-item',

  initialize() {
    this.setInitialState();
    this.addListeners();
    return this;
  },

  setInitialState() {
    const appEntry = this.attributes.application.get('entry');
    this.model.set('active', appEntry === this.model.get('slug'));
  },

  addListeners() {
    this.listenTo(this.model, 'change', this.render);

    this.listenTo(this.attributes.application, 'change:entry', (model, value) => {
      this.model.set('active', this.model.get('slug') === value);
    });
  },

  events: {
    'click .sub-navigation__item': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    let target = $(event.target).attr('href');
    if (target) {
      this.attributes._router.navigate(target, {trigger: true});
    }
  },

  render() {
    const language = this.attributes.application.get('language');
    const slug = this.model.get('slug');
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
