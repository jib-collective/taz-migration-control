import _ from 'underscore';
import Backbone from 'backbone';
import Page from 'model/pages-entry';
import {setPageTitle} from 'lib/title';

export default Backbone.View.extend({
  tagName: 'article',

  className: 'page article',

  initialize(options) {
    this.options = options;
    const slug = this.options.application.get('entry');
    this.options.api.findPageBySlug(slug)
      .then(page => {
        this.model = new Page(page);
        setPageTitle(this.model.getTitle());
        this.render();
      });

    this.$el.addClass(`page--${slug}`);

    return this;
  },

  render() {
    this.$el.html(this.template({
      model: this.model,
    }));

    return this;
  },

  template: _.template(`
    <h1 class="article__title">
      <%= model.getTitle() %>
    </h1>

    <div class="article__corpus article__corpus--open">
      <%= model.getText() %>
    </div>
  `),
});
