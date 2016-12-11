import _ from 'underscore';
import i18n from 'lib/i18n';
import SubNavigationColumn from 'view/sub-navigation-column';

export default Backbone.View.extend({
  tagName: 'nav',

  className: 'sub-navigation',

  events: {
    'click [data-module="toggle"]': 'toggleMenu',
  },

  toggleMenu(event) {
    event.preventDefault();

    this.$el
      .find('.sub-navigation__list-container')
      .toggleClass('sub-navigation__list-container--open');

    return this;
  },

  initialize(options) {
    this.options = options;
    this.columns = [];
    this.listenTo(this.collection, 'sync', this.render);
    return this.render();
  },

  setTitle(title) {
    this.$el.find('.sub-navigation__title').text(title);
    return this;
  },

  render() {
    this.$el.html(this.template(this));

    this.collection.models.forEach(model => {
      const options = {
        application: this.options.application,
        _router: this.options._router,
        model,
        slug: this.collection.options.slug,
        subnav: this,
      };

      const view = new SubNavigationColumn(options);
      this.columns.push(view);
      view.$el.appendTo(this.$el.find('.sub-navigation__list-container'));
    });

    return this;
  },

  template: _.template(`
    <button class="sub-navigation__title"
            data-module="toggle">
      Lorem ipsum
    </button>
    <div class="sub-navigation__list-container"></div>
  `),
});
