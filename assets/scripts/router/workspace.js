import ApplicationView from 'view/application';

export default Backbone.Router.extend({
  initialize() {
    this.app = new ApplicationView();
  },

  routes: {
    '': 'renderIndex',
    ':slug/:type': 'renderView',
  },

  renderIndex() {
    return this.app.view('index');
  },

  renderView(slug) {
    return this.app.view(slug);
  },
});
