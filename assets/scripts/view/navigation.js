import _ from 'underscore';
import $ from 'jquery';
import NavigationEntry from 'view/NavigationEntry';
import NavigationCollection from 'collection/navigation';

export default Backbone.View.extend({
  initialize() {
    this.collection = new NavigationCollection([
      {
        label: 'Countries',
        endpoint: '/countries',
      },

      {
        label: 'Thesis',
        endpoint: '/',
      },

      {
        label: 'Background',
        endpoint: '/background',
      },
    ]);
  },

  events: {
    'click .navigation__item': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    let target = $(event.target).attr('href');
    this.attributes._router.navigate(target, {trigger: true});
  },

  render() {
    this.setElement(this.template());

    this.collection.forEach(item => {
      const view = new NavigationEntry({
        model: item,
      }).$el.appendTo(this.$el.find('.navigation__list'));
    });

    return this;
  },

  template: _.template(`
    <nav class="navigation">
      <ul class="navigation__list"></ul>
    </nav>
  `),
});
