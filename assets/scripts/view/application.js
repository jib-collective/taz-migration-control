import _ from 'lodash';

import ApplicationModel from 'model/application';
import BackgroundView from 'view/background';
import CountriesView from 'view/countries';
import HeaderView from 'view/header';
import MapView from 'view/map';
import NavigationView from 'view/navigation';
import ThesisView from 'view/thesis';

export default Backbone.View.extend({
  initialize() {
    this.model = new ApplicationModel();

    this.views = {
      _header: new HeaderView(),
      _navigation: new NavigationView({
        attributes: {
          language: this.model.get('language'),
          _router: this.attributes._router,
        },
      }),
      _map: new MapView(),

      index: ThesisView,
      background: BackgroundView,
      countries: CountriesView,
    };

    this.activeView = undefined;
  },

  view(section, slug) {
    /* destroy all dynamic views */
    if (this.activeView) {
      this.activeView.remove();
    }

    /* update navigation */
    this.views._navigation.collection.forEach(item => {
      item.set('active', item.get('endpoint') === section);
    });

    /* build requested view */
    this.activeView = new this.views[section || 'index'];
    this.activeView.render().$el.appendTo(this.$el.find('.app__main'));
  },

  append() {
    return this.$el.prependTo('body');
  },

  render() {
    this.setElement(this.template());

    this.views._navigation.render().$el.prependTo(this.$el);
    this.views._map.render().$el.prependTo(this.$el);
    this.views._header.render().$el.prependTo(this.$el);

    return this;
  },

  template: _.template(`
    <div class="app">
      <main class="app__main"></main>
    </div>
  `),
});
