import _ from 'underscore';
import $ from 'jquery';
import NavigationEntry from 'view/navigationEntry';
import NavigationCollection from 'collection/navigation';

export default Backbone.View.extend({
  tagName: 'nav',

  className: 'navigation',

  initialize() {
    const language = this.attributes.application.get('language');

    this.collection = new NavigationCollection([
      {
        label: 'Countries',
        endpoint: `countries`,
        language,
      },

      {
        label: 'Thesis',
        language,
      },

      {
        label: 'Background',
        endpoint: 'background',
        language,
      },
    ]);

    this.listenTo(this.attributes.app, 'change:language', this.render);
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
    this.$el.html(this.template());

    this.collection.forEach(item => {
      const view = new NavigationEntry({
        attributes: this.attributes,
        model: item,
      });

      view.render().$el.appendTo(this.$el.find('.navigation__list'));
    });

    return this;
  },

  template: _.template(`
    <ul class="navigation__list"></ul>
  `),
});
