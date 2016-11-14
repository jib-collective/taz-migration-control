import _ from 'underscore';
import $ from 'jquery';
import Intro from 'model/intro';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'intro',

  events: {
    'click .intro__close': 'close',
  },

  initialize() {
    this.model = new Intro();

    this.listenTo(this.model, 'change:visible', (model, value) => {
      if (value === false) {
        this.$el.addClass('intro--hide');
        setTimeout(() => {
          this.remove();
        }, 500);
      }
    });
    $('body').css({
      overflow: 'hidden',
    });
  },

  close() {
    this.model.set('visible', false);
    $('body').css({
      overflow: 'auto',
    });
  },

  render() {
    this.$el.html(this.template());
    return this;
  },

  template: _.template(`
    <button class="intro__close">Skip Intro</button>
  `),
});
