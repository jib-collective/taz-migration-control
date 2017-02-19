import _ from 'underscore';
import $ from 'jquery';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'sub-navigation__list-item',

  initialize(options) {
    this.options = options;
    const appEntry = this.options.application.get('entry');

    this.listenTo(this.options.application, 'change:entry', (model, value) => {
      this.model.set('active', this.model.getSlug() === value);
      this.render();
    });

    this.listenTo(this.model, 'change:active', (model, value) => {
      if (value === true) {
        const title = this.model.get('name');
        this.options.subnav.setTitle(title);
      }
    });

    if (this.model.getSlug() === appEntry) {
      this.model.set('active', true);
    }

    return this.render();
  },

  events: {
    'click .sub-navigation__item': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    let target = $(event.target).attr('href');

    /* close Subnav container */
    if ($(window).width() <= 768) {
      this.options.subnav.closeMenu();
    }

    if (target) {
      this.options._router.navigate(target, {trigger: true});
    }
  },

  render() {
    const language = this.options.application.get('language');
    const slug = this.options.slug;
    const attrs = {
      model: this.model,
      url: `/${language}/${slug}/${this.model.getSlug()}`,
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
