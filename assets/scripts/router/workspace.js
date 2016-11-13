import ApplicationView from 'view/application';

export default Backbone.Router.extend({
  initialize() {
    this.app = new ApplicationView({
      attributes: {
        _router: this,
      },
    });
    this.app.render().append();
  },

  routes: {
    '': 'renderIndex',
    ':slug': 'renderView',
    ':slug/:type': 'renderView',
  },

  renderIndex() {
    return this.app.view('');
  },

  renderView(slug) {
    return this.app.view(slug);
  },
});
