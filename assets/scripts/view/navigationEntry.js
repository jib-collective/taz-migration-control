import _ from 'underscore';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'navigation__list-item',

  initialize() {
    this.attrs = {
      i18n,
      model: this.model,
    };
    this.listenTo(this.model, 'change', this.render);
    return this.render();
  },

  render() {
    this.$el.html(this.template(this.attrs));
    return this;
  },

  template: _.template(`
    <% if (this.model.get('active')) { %>
      <span class="navigation__item navigation__item--active">
        <%= i18n( this.model.get('label') ) %>
      </span>
    <% } else { %>
      <a href="<%= this.model.get('endpoint') %>"
         class="navigation__item">
        <%= i18n( this.model.get('label') ) %>
      </a>
    <% } %>
  `),
});
