import _ from 'underscore';
import $ from 'jquery';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'sub-navigation__list-item',

  initialize(options) {
    this.options = options;
    this.addListeners();

    const appEntry = this.options.application.get('entry');
    this.model.set('active', this.model.getSlug() === appEntry);

    return this;
  },

  addListeners() {
    this.listenTo(this.model, 'change', this.render);
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
    const attrs = {
      model: this.model,
      url: `/${language}/countries/${this.model.getSlug()}`,
    };

    this.$el.html(this.template(attrs));
    return this;
  },

  template: _.template(`
    <% if (model.get('active')) { %>
      <span class="sub-navigation__item sub-navigation__item--active">
        <%= model.getTitle() %>
      </span>
    <% } else { %>
      <a href="<%= url %>"
         class="sub-navigation__item">
        <%= model.getTitle() %>
      </a>
    <% } %>
  `),
});
