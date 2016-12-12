import _ from 'underscore';
import Backbone from 'backbone';
import Page from 'model/pages-entry';
import {nl2br} from 'lib/format';

export default Backbone.View.extend({
  tagName: 'article',

  className: 'page article',

  initialize(options) {
    this.options = options;
    const slug = this.options.application.get('entry');
    this.options.api.findPageBySlug(slug)
      .then(page => {
        this.model = new Page(page);
        this.render();
      });

    return this;
  },

  render() {
    this.$el.html(this.template({
      model: this.model,
      nl2br,
    }));

    return this;
  },

  template: _.template(`
    <h1 class="article__title">
      <%= model.getTitle() %>
    </h1>

    <div class="article__corpus article__corpus--open">
      <%= nl2br(model.getText()) %>
    </div>
  `),
});
