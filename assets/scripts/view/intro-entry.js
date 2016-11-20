import _ from 'underscore';
import $ from 'jquery';

export default Backbone.View.extend({
  className: 'intro__slide',

  initialize() {
    this.listenTo(this.model, 'change', () => {
      this.render();
    });

    return this;
  },

  render() {
    const ACTIVE_CLASS = 'intro__slide--is-active';

    this.$el.html(this.template(this));

    if (this.model.get('visible') === false) {
      this.$el.removeClass(ACTIVE_CLASS);
    } else {
      this.$el.addClass(ACTIVE_CLASS);
    }

    /* timer for visibility time */
    if (this.model.get('visible')) {
      this.timer = setTimeout(() => {
        this.model.set('visible', false);
      }, this.model.get('interval'));
    } else if (this.timer) {
      clearTimeout(this.timer);
    }

    return this;
  },

  template: _.template(`
    <strong class="intro__slide-text"><%= this.model.get('text') %></strong>
  `),
});
