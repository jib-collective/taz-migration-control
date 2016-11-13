import _ from 'underscore';
import ThesisEntryView from 'view/thesisEntry';
import ThesisCollection from 'collection/thesis';

export default Backbone.View.extend({
  className: 'thesis',

  initialize() {
    this.collection = new ThesisCollection();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render() {
    this.$el.html(this.template(this.attrs));

    this.collection.forEach(model => {
      const view = new ThesisEntryView({ model });
      view.render().$el.appendTo(this.$el);
    });

    return this;
  },

  template: _.template(``),
});
