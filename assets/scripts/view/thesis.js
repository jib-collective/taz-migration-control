import Entry from 'view/thesisEntry';
import ThesisCollection from 'collection/thesis';

export default Backbone.View.extend({
  className: 'thesis',

  initialize(options) {
    this.options = options;
    this.collection = new ThesisCollection();
    this.listenTo(this.collection, 'sync', this.render);
    return this;
  },

  render() {
    this.$el.html('');

    this.collection.forEach((model, index) => {
      const count = index + 1;
      model.set({count});
      const view = new Entry({
        api: this.options.api,
        model
      });
      view.render().$el.appendTo(this.$el);
    });

    return this;
  },
});
