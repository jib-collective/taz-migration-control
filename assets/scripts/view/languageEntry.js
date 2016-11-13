import _ from 'underscore';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'language',

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    return this.render();
  },

  events: {
    'click': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    this.attributes._router.navigate(this.model.get('endpoint'), {trigger: true});
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
      <a href="<%= this.model.get('endpoint') %>"
         class="language__item">
        <%= this.model.get('label') %>
      </a>
    <% } %>
  `),
});
