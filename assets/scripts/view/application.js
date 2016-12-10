import _ from 'underscore';
import $ from 'jquery';
import ApplicationModel from 'model/application';
import BackgroundView from 'view/background';
import CountriesView from 'view/countries';
import CountriesEntryView from 'view/countries-entry';
import Footer from 'view/footer';
import HeaderView from 'view/header';
import MapView from 'view/map';
import NavigationView from 'view/navigation';
import ThesisView from 'view/thesis';
import WebFont from 'webfontloader';

export default Backbone.View.extend({
  className: 'app',

  initialize(options) {
    this.model = new ApplicationModel();

    this._globalCtx = {
      application: this.model,
      _router: options._router,
    };

    this.views = {
      _header: new HeaderView(this._globalCtx),
      _navigation: new NavigationView(this._globalCtx),
      _map: new MapView(this._globalCtx),
      _footer: new Footer(),

      index: CountriesView,
      background: BackgroundView,
      thesis: ThesisView,
      countries_entry: CountriesEntryView,
    };

    this.listenTo(this.model, 'change:language', () => this.render('complete'));
    this.listenTo(this.model, 'change:slug change:entry', () => this.render('content'));

    this.loadWebfonts();
  },

  loadWebfonts() {
    WebFont.load({
      custom: {
        families: [
          'TisaPro',
        ],
        urls: [
          '/dist/styles/fonts.css',
        ]
      },

      classes: false,
      events: false,
    });
  },

  introIsVisible() {
    return this.views._intro.model.get('visible') === true;
  },

  append() {
    return this.$el.prependTo('body');
  },

  getViewName(slug, entry) {
    let viewName = slug;

    if (!viewName) {
      viewName = 'index';
    }

    if (entry) {
      viewName += '_entry';
    }

    return viewName;
  },

  scrollToContent() {
    if (slug && entry) {
      return this;
    }

    const $content = $('.app__main');
    const contentTop = $content.offset().top;
    $(window).scrollTop(contentTop);
  },

  buildInterface() {
    ['navigation', /*'map',*/ 'header',].forEach(item => {
      this.views[`_${item}`].render().$el.prependTo(this.$el);
    });

    this.views._footer.render().$el.appendTo(this.$el);

    return this;
  },

  render(type = 'complete') {
    const slug = this.model.get('slug');
    const entry = this.model.get('entry');
    const viewName = this.getViewName(slug, entry);
    const activeView = this.model.get('activeView');

    /* destroy dynamic view */
    if (activeView) {
      activeView.remove();
      this.model.set('activeView', undefined);
    }

    /* build interface */
    if (type === 'complete') {
      this.$el.html(this.template());
      this.buildInterface();
    }

    /* build content view */
    const view = new this.views[viewName](this._globalCtx);
    this.model.set('activeView', view);
    view.render().$el.appendTo(this.$el.find('.app__main'));

    return this;
  },

  template: _.template(`
    <main class="app__main"></main>
  `),
});
