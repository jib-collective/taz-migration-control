import _ from 'underscore';
import ChartHDIView from 'view/chart-migration-hdi';
import ChartPaymentView from 'view/chart-payment';
import RemittancesView from 'view/chart-remittances';
import ThesisCollection from 'collection/thesis';

export default Backbone.View.extend({
  className: 'thesis__item',

  renderChart() {
    let views = [];

    switch (this.model.get('diagramType')) {
      case 'payments':
        views.push(new ChartHDIView({
          api: this.options.api,
          countries: [
            'Tschad',
          ],
        }));
        break;

      case 'hdi':
        views.push(new ChartPaymentView({
          api: this.options.api,
          countries: [
            'Tschad',
            'Südsudan',
            'Marokko',
            'Kap Verde',
          ],
        }));
        break;

      case 'remittances':
        [
          'Sierra Leone',
          'Dschibuti',
          'Sudan',
          'Kamerun',
        ].forEach(country => views.push(
          new RemittancesView({
            api: this.options.api,
            countries: [
              country,
            ]
          })
        ));
        break;
    }

    if (views.length > 0) {
      views.forEach(view => view.$el.appendTo(this.$el.find('.thesis__chart')));
    }

    return this;
  },

  initialize(options) {
    this.options = options;
    return this;
  },

  render() {
    this.$el.html(this.template(this));

    if (this.model.has('diagramType')) {
      this.renderChart();
    }

    return this;
  },

  template: _.template(`
    <h3 class="thesis__item-title">
      <span class="thesis__item-count">
        Thesis <%= this.model.get('count') %>
      </span>

      <%= this.model.get('title') %>
    </h3>

    <% if (this.model.get('diagramType')) { %>
      <div class="thesis__chart"></div>
    <% } %>

    <p class="thesis__item-text">
      <%= this.model.get('text') %>
    </p>

    <% if (this.model.get('contextualisation')) { %>
      <p class="thesis__item-context">
        <%= this.model.get('contextualisation') %>
      </p>
    <% } %>
  `),
});
