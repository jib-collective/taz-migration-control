import _ from 'underscore';

export default Backbone.View.extend({
  render() {
    this.setElement(this.template());
    return this;
  },

  template: _.template(`
    <div class="countries">
      <p>Country view</p>
    </div>
  `),
});
