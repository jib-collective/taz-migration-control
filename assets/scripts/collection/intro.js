import $ from 'jquery';
import Slide from 'model/intro-entry';

export default Backbone.Collection.extend({
  model: Slide,

  url: '/data/intro.json',

  initialize() {
    this.on('change:visible', this.updateVisibleState);

    this.on('sync', (collection) => {
      this.models.forEach((model, index) => {
        // activate first item
        if (index === 0) {
          model.set('visible', true);
        }
      });
    });

    this.fetch();
    return this;
  },

  updateVisibleState(changedModel, value) {
    // only continue, of one slide got hidden
    if (value === true) {
      return this;
    }

    const changedModelIndex = this.indexOf(changedModel);

    this.models.forEach(model => {
      if (changedModel.cid !== model.cid) {
        const modelIndex = this.indexOf(model);
        let visible = false;

        if (changedModelIndex + 1 === modelIndex) {
          visible = true;
        }

        model.set('visible', visible);
      }
    });
  },

  destroy() {
    this.models.forEach(model => model.destroy());
  },
});
