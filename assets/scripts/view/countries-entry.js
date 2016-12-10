import _ from 'underscore';
import Country from 'model/country';
import CountryBaseView from './country-base';

export default CountryBaseView.extend({
  className: 'countries',

  template: _.template(`
    <% if (this.model.attributes.finding) { %>
      <div class="countries__block">
        <h3 class="countries__sub-title">
          <%= this.model.getFinding('headline') %>
        </h3>

        <p class="countries__block-lead">
          <%= this.model.getFinding('lead') %>
        </p>

        <button type="button">
          Weiter lesen
        </button>

        <div class="countries__block-corpus">
          <%= this.model.getFinding('corpus') %>
        </div>
      </div>
    <% } %>

    <% if (this.model.attributes.features && this.model.attributes.features.length > 0) { %>
      <div class="countries__block">
        <h2 class="countries__block-title">
          Features
        </h2>

        <ul class="features">
          <% _.forEach(this.model.getFeatures(), function(feature) { %>
            <li class="features__item">
              <h3 class="features__item-title">
                <span class="features__item-title-dossier">
                  <%= feature.kicker %>
                </span>

                <%= feature.headline %>
              </h3>

              <% _.forEach(feature.images, function(image) { %>
                <figure class="features__item-image">
                  <img src="<%= image.src %>"
                       alt="<%= image.alt %>">

                  <figcaption class="features__item-caption">
                    <%= image.caption %>
                  </figcaption>
              <% }) %>

              <p class="countries__block-lead">
                <%= feature.lead %>
              </p>

              <button type="button">
                Weiter lesen
              </button>
            </li>
          <% }); %>
        </ul>
      </div>
    <% } %>

    <% if (this.model.attributes.factSheet) { %>
      <div class="countries__block">
        <h2 class="countries__block-title">
          Infos
        </h2>

        <dl class="facts">
          <% _.mapObject(this.model.attributes.factSheet, function(item, index) { %>
            <dt class="facts__term">
              <%= index %>
            </dt>
            <dd class="facts__value">
              <%= item %>
            </dd>
          <% }) %>
        </dl>
      </div>
    <% } %>
  `),

  initialize(options) {
    this.model = new Country({
      slug: options.application.get('entry'),
    });

    this.listenTo(this.model, 'sync', this.render);
    return CountryBaseView.prototype.initialize.apply(this, [options]);
  },
});
