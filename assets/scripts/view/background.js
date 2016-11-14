import _ from 'underscore';

export default Backbone.View.extend({
  initialize() {
    return this;
  },

  render() {
    this.setElement(this.template());
    return this;
  },

  template: _.template(`
    <div class="background">
      <p>Background view</p>
    </div>
  `),
});
