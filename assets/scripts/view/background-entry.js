import _ from 'underscore';
import $ from 'jquery';
import Background from 'model/background';
import BaseView from 'view/background-base';
import {toggle} from 'lib/icon';
import {setPageTitle} from 'lib/title';

export default BaseView.extend({
  events: {
    'click [data-module="treaties-toggle"]': 'toggleTreaties',
  },

  toggleTreaties(event) {
    event.preventDefault();

    const $eventTarget = $(event.target);
    const $target = $eventTarget.next();
    const $icon = $eventTarget.children('.treaties__country-toggle-icon');

    if (this.isTreatyOpen($target)) {
      return this.closeTreaty($target, $icon);
    } else {
      return this.openTreaty($target, $icon);
    }
  },

  openTreaty($treaty, $icon) {
    toggle($icon, 'chevron-up');
    return $treaty.addClass('treaties__item-treaties--open');
  },

  closeTreaty($treaty, $icon) {
    toggle($icon, 'chevron-down');
    return $treaty.removeClass('treaties__item-treaties--open');
  },

  isTreatyOpen($treaty) {
    return $treaty.hasClass('treaties__item-treaties--open');
  },

  template: _.template(`
    <div class="app__content">
      <div class="article">
        <% if (headline) { %>
          <h1 class="article__title">
            <%= headline %>
          </h1>

          <% if (lead) { %>
            <p class="article__lead">
              <%= lead %>
            </p>
          <% } %>

          <% if (corpus) { %>
            <div class="article__corpus article__corpus--open">
              <%= corpus %>

              <% if (authors) { %>
                <small class="article__authors-container">
                  <strong>
                    <%= i18n.load('Authors') %>:
                  </strong>
                  <%= renderAuthors(authors) %>
                </small>
              <% } %>
            </div>
          <% } %>

          <% if (treaties) { %>
            <h2 class="visually-hidden">
              <%= i18n.load('Treaties') %>
            </h2>
            <%= renderTreatyList(treaties) %>
          <% } %>
        <% } else { %>
          <h1 class="article__title">
            <%= i18n.load('A problem occurred while fetching the article.') %>
          </h1>
        <% } %>
      </div>
    </div>
  `),

  initialize(options) {
    const slug = options.application.get('entry');

    options.api.findBackgroundBySlug(slug)
      .then(background => {
        this.model = new Background(background);
        const headline = this.model.get('headline') || '';

        setPageTitle(headline);
        this.render();
      });

    return BaseView.prototype.initialize.call(this, options);
  },
});
