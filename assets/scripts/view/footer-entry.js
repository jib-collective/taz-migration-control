import _ from 'underscore';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'footer__list-item',

  initialize(options) {
    this.options = options;
    return this.render();
  },

  render() {
    this.$el.html(this.template({
      this,
      language: this.options.application.get('language'),
    }));
    return this;
  },

  template: _.template(`
    <a href="/<%= language %>/pages/<%= this.model.getSlug() %>"
       class="footer__item">
      <%= this.model.get('name') %>
    </a>
  `),
});
