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
      this.closeTreaty($target, $icon);
    } else {
      this.openTreaty($target, $icon);
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

      <% if (this.model.get('treaties')) { %>
        <h2 class="visually-hidden">
          <%= i18n('Treaties') %>
        </h2>
        <%= renderTreatyList(this.model.get('treaties')) %>
      <% } %>
    </div>
  `),

  scrollIntoView() {
    $('html').scrollTop(this.$el.offset().top - 120);
  },

  initialize(options) {
    const slug = options.application.get('entry');

    options.api.findBackgroundBySlug(slug)
      .then(background => {
        this.model = new Background(background);
        setPageTitle(this.model.get('headline'));
        this.render();
      });

    return this;
  },
});
