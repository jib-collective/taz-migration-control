import _ from 'underscore';
import ThesisCollection from 'collection/thesis';

export default Backbone.View.extend({
  className: 'thesis__item',

  render() {
    this.setElement(this.template(this));
    return this;
  },

  template: _.template(`
    <h3 class="thesis__item-title">
      <%= this.model.get('title') %>
    </h3>

    <p class="thesis__item-teaser">
      <%= this.model.get('description') %>
    </p>
  `),
});
