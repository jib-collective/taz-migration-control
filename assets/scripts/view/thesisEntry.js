import _ from 'underscore';
import ChartMigrationHDIView from 'view/chart-migration-hdi';
import ThesisCollection from 'collection/thesis';

export default Backbone.View.extend({
  className: 'thesis__item',

  renderChart() {
    let view;

    switch (this.model.get('chart')) {
      case 'migration-hdi-time':
        view = new ChartMigrationHDIView();
        break;
    }

    view.render().$el.appendTo(this.$el.find('.thesis__chart'));

    return this;
  },

  render() {
    this.$el.html(this.template(this));

    if (this.model.has('chart')) {
      this.renderChart();
    }

    return this;
  },

  template: _.template(`
    <h3 class="thesis__item-title">
      <%= this.model.get('title') %>
    </h3>

    <% if (this.model.get('chart')) { %>
      <div class="thesis__chart"></div>
    <% } %>

    <p class="thesis__item-teaser">
      <%= this.model.get('description') %>
    </p>
  `),
});
