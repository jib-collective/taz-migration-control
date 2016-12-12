import _ from 'underscore';
import $ from 'jquery';
import Country from 'model/country';
import CountryBaseView from './country-base';

export default CountryBaseView.extend({
  events: {
    'click [data-module="read-more"]': 'readMore',
  },

  readMore(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);

    $target
      .next('.article__corpus')
      .addClass('article__corpus--open');

    $target.remove();
  },

  template: _.template(`
    <h2 class="visually-hidden">
      <%= i18n('Introduction') %>
    </h2>

    <div class="article">
      <% if (this.model.attributes.finding) { %>
        <div class="countries__block">
          <h3 class="article__title">
            <%= this.model.getFinding('headline') %>
          </h3>

          <p class="article__lead">
            <%= this.model.getFinding('lead') %>
          </p>

          <button type="button"
                  data-module="read-more"
                  class="read-more">
            <%= i18n('Read More') %>
          </button>

          <div class="article__corpus">
            <%= this.model.getFinding('corpus') %>
          </div>
        </div>
      <% } %>

      <% if (this.model.attributes.features && this.model.attributes.features.length > 0) { %>
        <div class="countries__block">
          <h2 class="countries__block-title">
            <%= i18n('Features') %>
          </h2>

          <ul class="features">
            <% _.forEach(this.model.getFeatures(), function(feature) { %>
              <li class="features__item">
                <h3 class="article__title">
                  <span class="features__item-title-dossier">
                    <%= feature.kicker %>
                  </span>

                  <%= feature.headline %>
                </h3>

                <% _.forEach(feature.images, function(image) { %>
                  <figure class="features__item-image">
                    <img src="<%= image.src %>"
                         alt="<%= image.alt %>"
                          class="fluid-image" />

                    <figcaption class="features__item-caption">
                      <%= image.caption %>
                    </figcaption>
                <% }) %>

                <p class="article__lead">
                  <%= feature.lead %>
                </p>

                <button type="button"
                        data-module="read-more"
                        class="read-more">
                  <%= i18n('Read More') %>
                </button>

                <div class="article__corpus">
                  <%= feature.corpus %>
                </div>
              </li>
            <% }); %>
          </ul>
        </div>
      <% } %>

      <% if (this.model.attributes.factSheet) { %>
        <div class="countries__block">
          <h2 class="countries__block-title">
            <%= i18n('Information') %>
          </h2>

          <dl class="facts">
            <% _.mapObject(this.model.attributes.factSheet, function(item, index) { %>
              <dt class="facts__term">
                <%= i18n(index) %>
              </dt>
              <dd class="facts__value">
                <%= item %>
              </dd>
            <% }) %>
          </dl>
        </div>
      <% } %>

      <% if (this.model.attributes.treaties) { %>
        <h2 class="countries__block-title">
          <%= i18n('Treaties') %>
        </h2>

        <%= renderCountryTreaties(this.model.attributes.treaties, true) %>
      <% } %>
    </div>
  `),

  initialize(options) {
    const slug = options.application.get('entry');

    options.api.findCountryBySlug(slug)
      .then(country => {
        this.model = new Country(country);
        this.render();
      });

    return CountryBaseView.prototype.initialize.apply(this, [options]);
  },
});
