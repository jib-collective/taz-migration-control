import Entry from 'view/sub-navigation-entry';
import EntryModel from 'model/sub-navigation-entry';

export default Backbone.View.extend({
  tagName: 'ul',

  className: 'sub-navigation__list',

  initialize(options) {
    this.options = options;
    return this.render();
  },

  render() {
    this.$el.html('');

    const entries = this.model.get('entries');

    entries.forEach(entry => {
      const model = new EntryModel(entry);
      const options = {
        application: this.options.application,
        _router: this.options._router,
        model,
        slug: this.options.slug,
        subnav: this.options.subnav,
      };

      this.listenTo(model, 'change:active', (model, value) => {
        if (value === true) {
          this.options.subnav.setTitle(model.getTitle());
        }
      });

      const view = new Entry(options);
      view.$el.appendTo(this.$el);
    });

    return this;
  },
});
