import _ from 'underscore';

export default Backbone.View.extend({
  className: 'background',

  initialize() {
    return this;
  },

  render() {
    this.$el.html(this.template());
    return this;
  },

  template: _.template(`
    <p>Background view</p>
  `),
});
