import _ from 'underscore';
import $ from 'jquery';
import Intro from 'model/intro';

export default Backbone.View.extend({
  className: 'intro',

  events: {
    'click .intro__close': '_close',
  },

  initialize() {
    this.model = new Intro();

    this.listenTo(this.model, 'change:visible', (model, value) => {
      const $body = $('body');

      if (value === false) {
        this.$el.addClass('intro--hide');

        $body.css({
          overflow: 'auto',
        });

        setTimeout(() => {
          this.remove();
        }, 500);
      }
    });

    $('body').css({
      overflow: 'hidden',
    });

  },

  _close() {
    this.model.set('visible', false);
  },

  render() {
    this.$el.html(this.template());

    /* no idea why this is necessary here ... */
    this.delegateEvents();
    return this;
  },

  template: _.template(`
    <button class="intro__close">Skip Intro</button>
  `),
});
