import _ from 'underscore';
import SubNavigationCollection from 'collection/sub-navigation';
import SubNavigationView from 'view/sub-navigation';

export default Backbone.View.extend({
  className: 'countries',

  initialize() {
    this.collection = new SubNavigationCollection([], {
      url: '/data/countries.json',
    });

    return this;
  },

  render() {
    this.$el.html(this.template());

    const subNavigationView = new SubNavigationView({
      attributes: this.attributes,
      collection: this.collection,
    });

    subNavigationView.render().$el.prependTo(this.$el);

    return this;
  },

  template: _.template(`
    <p>Single country view</p>
  `),
});
