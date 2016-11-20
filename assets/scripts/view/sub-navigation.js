import _ from 'underscore';
import i18n from 'lib/i18n';
import SubNavigationEntry from 'view/sub-navigation-entry';

export default Backbone.View.extend({
  tagName: 'nav',

  className: 'sub-navigation',

  initialize(options) {
    this.options = options;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'change:active', model => this.setTitle());
    return this;
  },

  setTitle() {
    const label = this.collection.getActiveLabel();
    this.$el.find('.sub-navigation__title').text(label);
    return this;
  },

  render() {
    this.$el.html(this.template(this));

    this.collection.models.forEach(model => {
      const options = {
        application: this.options.application,
        _router: this.options._router,
        model,
      };

      const view = new SubNavigationEntry(options);
      view.render().$el.appendTo(this.$el.find('.sub-navigation__list'));
    });

    return this;
  },

  template: _.template(`
    <h4 class="sub-navigation__title">
      <%= this.collection.getActiveLabel() %>
    </h4>

    <ul class="sub-navigation__list"></ul>
  `),
});
