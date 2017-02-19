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

    const items = this.model.get('entries');

    items.forEach(item => {
      const options = {
        application: this.options.application,
        _router: this.options._router,
        model: new EntryModel(item),
        slug: this.options.slug,
        subnav: this.options.subnav,
      };

      new Entry(options).$el.appendTo(this.$el);
    });

    return this;
  },
});
