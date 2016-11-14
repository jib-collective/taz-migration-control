import _ from 'underscore';
import ApplicationModel from 'model/application';
import BackgroundView from 'view/background';
import CountriesView from 'view/countries';
import CountriesEntryView from 'view/countries-entry';
import HeaderView from 'view/header';
import MapView from 'view/map';
import NavigationView from 'view/navigation';
import ThesisView from 'view/thesis';

export default Backbone.View.extend({
  className: 'app',

  initialize() {
    this.model = new ApplicationModel();

    this._globalCtx = {
      attributes: {
        application: this.model,
        _router: this.attributes._router,
      },
    };

    this.views = {
      _header: new HeaderView(this._globalCtx),
      _navigation: new NavigationView(this._globalCtx),
      _map: undefined,

      index: ThesisView,
      background: BackgroundView,
      countries: CountriesView,
      countries_entry: CountriesEntryView,
    };

    /* on language change, re-render the whole application */
    this.listenTo(this.model, 'change:language', this.render);
  },

  view(section, entry) {
    /* destroy all dynamic views */
    if (this.model.get('activeView')) {
      const activeView = this.model.get('activeView');

      activeView.remove();
      this.model.set('activeView', undefined);
    }

    /* build requested view */
    let viewName = section;

    if (!viewName) {
      viewName = 'index';
    }

    if (entry) {
      viewName += '_entry';
    }

    this.model.set('activeView', new this.views[viewName](this._globalCtx));
    this.model.get('activeView').render().$el.appendTo(this.$el.find('.app__main'));
  },

  append() {
    return this.$el.prependTo('body');
  },

  render() {
    this.$el.html(this.template());

    // re-build map view
    if (this.views._map) {
      this.views._map.remove();
    }

    this.views._map = new MapView(this._globalCtx);

    ['navigation', 'map', 'header',].forEach(item => {
      this.views[`_${item}`].render().$el.prependTo(this.$el);
    });

    return this;
  },

  template: _.template(`
    <main class="app__main"></main>
  `),
});
