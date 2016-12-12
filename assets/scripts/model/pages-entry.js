import Backbone from 'backbone';

export default Backbone.Model.extend({
  getTitle() {
    return this.get('name');
  },

  getText() {
    return this.get('text');
  },
});
