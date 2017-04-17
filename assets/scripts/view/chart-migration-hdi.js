import _ from 'underscore';
import $ from 'jquery';
import Chart from 'view/chart';

export default Chart.extend({
  className: 'chart',

  type: 'hdi',

  renderChart(data) {
    if (!data || data.length === 0) {
      return;
    }

    const PAYMENTS_LABEL = this.options.i18n.load('Payments from EU countries');
    const INTENSITY_LABEL = this.options.i18n.load('asylumFigures');
    const UNIT_LABEL = this.options.i18n.load('Dollar per capita');

    const windowWidth = $(window).width();
    const c3Options = {
      axis: {
        x: {
          type: 'category',
          categories: [],
          tick: {
            culling: {
              max: 8,
            },
          },
        },
        y: {
          show: true,
        },
        y2: {
          show: true,
        },
      },
      bindto: this.$el.get(0),
      data: {
        axes: {},
        columns: [
          [INTENSITY_LABEL],
          [PAYMENTS_LABEL],
        ],
        types: {},
      },
      color: {
        pattern: [
          'rgb(128, 127, 128)',
          'rgb(255, 253, 56)',
        ],
      },
      tooltip: {
        format: {
          value(value, ratio, id) {
            if (id === PAYMENTS_LABEL) {
              const dollar = (Math.round(value * 100)/100).toFixed(2);
              return  `${dollar} ${UNIT_LABEL}`;
            }

            return value;
          }
        }
      },
      legend: {
        show: false,
      },
    };

    data.forEach(country => {
      if (country.data.asylumFigures) {
        country.data.asylumFigures.forEach(item => {
          const keys = _.keys(item);
          const key = keys[0];

          c3Options.data.columns[0].push(item[key].value);

          if (windowWidth < 768) {
            const shortHand = ('' + keys[0]).slice(-2);
            c3Options.axis.x.categories.push(shortHand);
          } else {
            c3Options.axis.x.categories.push(keys[0]);
          }
        });
      }

      if (country.data.oda) {
        country.data.oda.forEach(item => {
          const keys = _.keys(item);
          const key = keys[0];

          c3Options.data.columns[1].push(item[key].value);
        });
      }
    });

    c3Options.data.axes[c3Options.data.columns[0][0]] = 'y';
    c3Options.data.axes[c3Options.data.columns[1][0]] = 'y2';

    c3Options.data.types[c3Options.data.columns[0][0]] = 'area-spline';
    c3Options.data.types[c3Options.data.columns[1][0]] = 'area-spline';

    this.chart = this.buildChart(c3Options);

    /* custom label */
    const selection = d3.select(this.$el.eq(0).parent().get(0))
      .selectAll('span')
      .data([
        INTENSITY_LABEL,
        PAYMENTS_LABEL,
      ])
        .enter();

    const label = selection.append('span').attr('class', 'chart__label');

    label
      .append('span')
        .attr('class', 'chart__label-color')
        .attr('style', id => `background-color: ${this.chart.color(id)}`);

    label
      .append('span')
        .attr('class', 'chart__label-text')
        .html(id => id);

    return this.chart;
  },

});
