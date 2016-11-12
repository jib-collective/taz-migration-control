import BackgroundView from 'view/background';
import HeaderView from 'view/header';
import MapView from 'view/map';
import ThesisView from 'view/thesis';

export default Backbone.View.extend({
  initialize() {
    this.views = {
      _header: new HeaderView(),
      _map: new MapView(),

      index: ThesisView,
      background: BackgroundView,
    };

    this.activeView = undefined;
  },

  view(section, slug) {
    /* destroy all dynamic views */
    if (this.activeView) {
      this.activeView.destroy();
    }

    /* build requested view */
    this.activeView = new this.views[section];
  },
});
