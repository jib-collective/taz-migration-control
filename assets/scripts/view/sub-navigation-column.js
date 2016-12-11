import Entry from 'view/sub-navigation-entry';
import EntryModel from 'model/sub-navigation-entry';

export default Backbone.View.extend({
  tagName: 'ul',

  className: 'sub-navigation__list',

  initialize(options) {
    this.options = options;
    return this;
  },

  render() {
    this.$el.html('');

    this.options.model.attributes.entries.forEach(entry => {
      const model = new EntryModel(entry);
      const options = {
        application: this.options.application,
        _router: this.options._router,
        model,
        slug: this.options.slug,
      };
      const view = new Entry(options);

      view.render().$el.appendTo(this.$el);
    });

    return this;
  },
});
