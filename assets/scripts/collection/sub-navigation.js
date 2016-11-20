import SubNavigationEntry from 'model/sub-navigation-entry';

export default Backbone.Collection.extend({
  model: SubNavigationEntry,

  initialize(data, options) {
    if (options.url) {
      this.url = options.url;
      this.fetch();
    }
  },

  getActiveLabel() {
    let label;

    this.models.forEach(model => {
      if (model.get('active') === true) {
        label = model.get('label');
      }
    });

    return label;
  },
});
