import Backbone from 'backbone';
import limax from 'limax';

export default Backbone.Model.extend({
  getSlug() {
    let name = this.get('name').toLowerCase();

    return limax(name);
  },
});
