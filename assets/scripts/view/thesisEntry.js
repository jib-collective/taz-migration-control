import _ from 'underscore';
import ChartHDIView from 'view/chart-migration-hdi';
import ChartPaymentView from 'view/chart-payment';
import ThesisCollection from 'collection/thesis';

export default Backbone.View.extend({
  className: 'thesis__item',

  renderChart() {
    let view;

    switch (this.model.get('diagramType')) {
      case 'hdi':
        view = new ChartHDIView();
        break;

      case 'payments':
        view = new ChartPaymentView();
        break;

      case 'remittances':
        break;
    }

    if (view) {
      view.$el.appendTo(this.$el.find('.thesis__chart'));
    }

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
