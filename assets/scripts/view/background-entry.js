import _ from 'underscore';
import Background from 'model/background';
import BaseView from './background-base';

export default BaseView.extend({
  className: 'background',

  template: _.template(`
    <div class="article">
      <% if (this.model.get('headline')) { %>
        <h1 class="article__title">
          <%= this.model.get('headline') %>
        </h1>
      <% } %>

      <% if (this.model.get('lead')) { %>
        <p class="article__lead">
          <%= this.model.get('lead') %>
        </p>
      <% } %>

      <% if (this.model.get('corpus')) { %>
        <div class="article__corpus article__corpus--open">
          <%= this.model.get('corpus') %>
        </div>
      <% } %>
    </div>
  `),

  initialize(options) {
    const slug = options.application.get('entry');

    options.api.findBackgroundBySlug(slug)
      .then(background => {
        this.model = new Background(background);
        this.render();
      });

    return BaseView.prototype.initialize.apply(this, [options]);
  },
});
