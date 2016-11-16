import _ from 'underscore';
import $ from 'jquery';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'language',

  initialize(options) {
    this.options = options;
    this.listenTo(this.model, 'change', this.render);
    this.setInitialState();
    return this;
  },

  setInitialState() {
    const appLanguage = this.options.application.get('language');
    this.model.set('active', this.model.getSlug() === appLanguage);
  },

  events: {
    'click': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    this.options._router.navigate(this.model.getSlug(), {trigger: true});
  },

  render() {
    this.$el.html(this.template({
      model: this.model,
    }));

    return this;
  },

  template: _.template(`
    <% if (this.model.get('active')) { %>
      <span class="language__item language__item--active">
        <%= this.model.get('label') %>
      </span>
    <% } else { %>
      <a href="/<%= this.model.getSlug() %>"
         class="language__item">
        <%= this.model.get('label') %>
      </a>
    <% } %>
  `),
});
