import _ from 'underscore';
import Backbone from 'backbone';
import videojs from 'video.js';
import vimeo from 'videojs-youtube';

export default Backbone.View.extend({
  className: 'intro-video',

  initialize(options) {
    this.options = options;
    this.player = '';
    return this;
  },

  render() {
    this.$el.html(this.template());

    const options =  {
      autoplay: true,
      controls: false,
      muted: true,
      sources: [
        {
          type: 'video/youtube',
          src: 'https://www.youtube.com/watch?v=QU2wiL4qjkk'
        }
      ],
      techOrder: [
        'youtube',
      ],
    };

    this.player = videojs(this.$el.children('video').get(0), options);
    this.player.on('ended', () => {
      this.player.dispose();
      this.remove();
    });

    return this;
  },

  template: _.template(`
    <video class="video-js"></video>
  `),
});
