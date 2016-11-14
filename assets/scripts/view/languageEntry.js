import _ from 'underscore';
import $ from 'jquery';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'language',

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.attributes.application, 'change:slug', this.render);
    return this.render();
  },

  events: {
    'click': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    const target = $(event.target).attr('href');
    this.attributes._router.navigate(target, {trigger: true});
  },

  render() {
    let url = this.model.get('endpoint');
    const slug = this.attributes.application.get('slug');

    if (slug) {
      url += `/${slug}`;
    }

    this.$el.html(this.template({
      model: this.model,
      url,
    }));
    return this;
  },

  template: _.template(`
    <% if (this.model.get('active')) { %>
      <span class="language__item language__item--active">
        <%= this.model.get('label') %>
      </span>
    <% } else { %>
      <a href="<%= url %>"
         class="language__item">
        <%= this.model.get('label') %>
      </a>
    <% } %>
  `),
});
