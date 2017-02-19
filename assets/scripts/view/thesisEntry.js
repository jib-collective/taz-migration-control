import _ from 'underscore';
import $ from 'jquery';
import ChartHDIView from 'view/chart-migration-hdi';
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
          i18n: this.options.i18n,
          countries: [
            'sn',
          ],
        }));
        break;

      case 'remittances':
        let charts = [];

        [
          'eg',
          'dz',
          'et',
          'bj',
          'bf',
          'dj',
          'ci',
          'gm',
          'gh',
          'gn',
          'cm',
          'cv',
          'ke',
          'ml',
          'ma',
          'ne',
          'ng',
          'sn',
          'sd',
          'ug',
        ].forEach(country => views.push(
          new RemittancesView({
            api: this.options.api,
            i18n: this.options.i18n,
            countries: [
              country,
            ]
          })
        ));
        break;
    }

    if (views.length > 0) {
      const $target = this.$el.find('.thesis__chart');
      views.forEach(view => view.$el.appendTo($target));

      if (this.model.get('diagramType') === 'remittances') {
        this.addRemittancesLabels();
      }
    }

    return this;
  },

  initialize(options) {
    this.options = options;
    return this;
  },

  addRemittancesLabels(chart) {
    [
      {
        label: this.options.i18n.load('Remittances'),
        color: 'rgb(128, 127, 128)',
      },

      {
        label: this.options.i18n.load('International aid'),
        color: 'rgb(255, 253, 56)',
      },
    ].forEach(item => {
      const $color = $('<span />')
                      .addClass('chart__label-color')
                      .css('background-color', item.color);
      const $label = $('<span />')
                      .addClass('chart__label-text')
                      .text(item.label);
      const $container = $('<span />')
                          .addClass('chart__label');
      const $wrapper = $('<div/>');

      $container.append($color, $label);
      $wrapper.append($container);
      this.$el.find('.thesis__chart').append($wrapper);
    })
  },

  render() {
    this.$el.html(this.template({
      this,
      chartType: this.model.get('diagramType'),
      context: this.model.get('contextualisation'),
      count: this.model.get('count'),
      imageUrl: this.model.get('imageUrl'),
      source: this.model.get('sourceinfo'),
      suffix: this.options.i18n.load('Thesis'),
      text: this.model.get('text'),
      title: this.model.get('name'),
    }));

    if (this.model.has('diagramType')) {
      this.renderChart();
    }

    return this;
  },

  template: _.template(`
    <h2 class="thesis__item-title">
      <span class="thesis__item-count">
        <%= suffix %> <%= count %>
        <span class="visually-hidden">:</span>
      </span>

      <%= title %>
    </h2>

    <% if (chartType) { %>
      <div class="thesis__chart"></div>
    <% } else if (imageUrl) { %>
      <img src="<%= imageUrl %>"
           class="fluid-image thesis__image" />
    <% } %>

    <p class="thesis__item-text">
      <%= text %>
    </p>

    <% if (context) { %>
      <p class="thesis__item-text">
        <%= context %>
      </p>
    <% } %>

    <% if (source) { %>
      <p class="thesis__item-context">
        <%= source %>
      </p>
    <% } %>
  `),
});
