import _ from 'underscore';
import i18n from 'lib/i18n';
import SubNavigationEntry from 'view/sub-navigation-entry';

export default Backbone.View.extend({
  tagName: 'nav',

  className: 'sub-navigation',

  initialize(data) {
    this.collection = data.collection;
    this.listenTo(this.collection, 'sync', this.render);
    return this;
  },

  render() {
    this.$el.html(this.template({
      i18n,
    }));

    /* render each entry */
    this.collection.forEach(model => {
      const view = new SubNavigationEntry({
        attributes: this.attributes,
        model,
      });

      view.render().$el.appendTo(this.$el.find('.sub-navigation__list'));
    });

    return this;
  },

  template: _.template(`
    <h4 class="sub-navigation__title"><%= i18n('Countries') %></h4>
    <ul class="sub-navigation__list"></ul>
  `),
});
