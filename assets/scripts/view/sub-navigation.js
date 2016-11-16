import _ from 'underscore';
import i18n from 'lib/i18n';
import SubNavigationEntry from 'view/sub-navigation-entry';

export default Backbone.View.extend({
  tagName: 'nav',

  className: 'sub-navigation',

  initialize(options) {
    this.options = options;
    this.listenTo(this.options.collection, 'sync', this.render);
    return this;
  },

  render() {
    this.$el.html(this.template({
      i18n,
    }));

    /* render each entry */
    this.options.collection.forEach(model => {
      console.log(this.options);
      const options = {
        application: this.options.application,
        _router: this.options._router,
      };
      const view = new SubNavigationEntry(Object.assign(options, {model}));

      view.render().$el.appendTo(this.$el.find('.sub-navigation__list'));
    });

    return this;
  },

  template: _.template(`
    <h4 class="sub-navigation__title"><%= i18n('Countries') %></h4>
    <ul class="sub-navigation__list"></ul>
  `),
});
