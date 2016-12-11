import i18n from 'lib/i18n';
import SubNavigationCollection from 'collection/sub-navigation';
import SubNavigationView from 'view/sub-navigation';

export default Backbone.View.extend({
  className: 'countries',

  initialize(options) {
    this.options = options;

    this.subnavView = new SubNavigationView(Object.assign({
      collection: new SubNavigationCollection([], {
        api: this.options.api,
        endpoint: 'countriesoverview',
      }),
    }, this.options));

    return this;
  },

  render() {
    if (this.template) {
      this.$el.html(this.template({
        this,
        i18n,
      }));
    }

    this.subnavView.render().$el.prependTo(this.$el);

    return this;
  },
});
