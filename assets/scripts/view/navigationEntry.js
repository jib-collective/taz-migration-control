import _ from 'underscore';
import $ from 'jquery';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'navigation__list-item',

  initialize() {
    this.setInitialState();
    this.addListeners();

    return this;
  },

  addListeners() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.attributes.application, 'change:slug', (model, value) => {
      this.model.set('active', this.model.getSlug() === value);
    });
  },

  setInitialState() {
    const appSlug = this.attributes.application.get('slug');
    this.model.set('active', this.model.getSlug() === appSlug);
  },

  events: {
    'click .navigation__item': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    let target = $(event.target).attr('href');
    this.attributes._router.navigate(target, {trigger: true});
  },

  render() {
    const attrs = {
      i18n,
      model: this.model,
      url: `/${this.attributes.application.get('language')}`,
    };

    if (this.model.getSlug()) {
      attrs.url += `/${this.model.getSlug()}`;
    }

    this.$el.html(this.template(attrs));
    return this;
  },

  template: _.template(`
    <a href="<%= url %>"
       class="navigation__item <% if (this.model.get('active')) { %> navigation__item--active <% } %> ">
      <%= i18n( this.model.get('label') ) %>
    </a>
  `),
});
