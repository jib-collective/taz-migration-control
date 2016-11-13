import _ from 'underscore';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  render() {
    let attrs = {
      i18n,
    };
    this.setElement(this.template(attrs));
    return this;
  },

  template: _.template(`
      <header class="header">
        <h1 class="header__title">
          <%= i18n('Migration Control') %>
        </h1>
      </header>
  `),
});
