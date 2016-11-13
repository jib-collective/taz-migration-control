import _ from 'underscore';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'navigation__list-item',

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    return this;
  },

  render() {
    const attrs = {
      i18n,
      model: this.model,
    };
    let url = `/${this.attributes.application.get('language')}`;

    if (this.model.get('endpoint')) {
      url += `/${this.model.get('endpoint')}`;
    }

    this.$el.html(this.template(Object.assign({url}, attrs)));
    return this;
  },

  template: _.template(`
    <% if (this.model.get('active')) { %>
      <span class="navigation__item navigation__item--active">
        <%= i18n( this.model.get('label') ) %>
      </span>
    <% } else { %>
      <a href="<%= url %>"
         class="navigation__item">
        <%= i18n( this.model.get('label') ) %>
      </a>
    <% } %>
  `),
});
