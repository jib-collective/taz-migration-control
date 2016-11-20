import _ from 'underscore';
import $ from 'jquery';
import Intro from 'model/intro';
import IntroCollection from 'collection/intro';
import SlideView from 'view/intro-entry';

export default Backbone.View.extend({
  className: 'intro',

  events: {
    'click .intro__close': '_close',
  },

  initialize() {
    this.model = new Intro();
    this.slides = new IntroCollection();

    this.listenTo(this.model, 'change:visible', this.clearView);
    this.listenTo(this.slides, 'sync', this.render);
    this.listenTo(this.slides, 'change:visible', this.closeIfLast);

    $('body').css({
      overflow: 'hidden',
    });

    return this;
  },

  clearView(model, value) {
    const $body = $('body');
    const waitTime = 500;

    if (value === false) {
      this.$el.addClass('intro--hide');

      $body.css({
        overflow: 'auto',
      });

      setTimeout(() => {
        this.remove();
      }, waitTime);
    }
  },

  closeIfLast(model, value) {
    if (value === false) {
      if (this.slides.indexOf(model) + 1 === this.slides.length) {
        return this._close();
      }
    }
  },

  _close(event) {
    if (event) {
      event.preventDefault();
    }

    this.model.set('visible', false);
    return this;
  },

  render() {
    this.$el.html(this.template());

    /* no idea why this is necessary here ... */
    this.delegateEvents();

    this.slides.forEach(model => {
      const view = new SlideView({model});

      view.render().$el.appendTo(this.$el);
    });

    return this;
  },

  remove() {
    this.model.destroy();
    this.slides.destroy();
    Backbone.View.prototype.remove.call(this);
  },

  template: _.template(`
    <button class="intro__close">Skip Intro</button>
  `),
});
