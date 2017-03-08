import _ from 'underscore';
import $ from 'jquery';
import d3 from 'd3';
import Chart from 'view/chart';

const YEAR = 2014;

export default Chart.extend({
  className: 'chart',

  type: 'remittances',

  renderChart(data) {
    if (!data || data.length === 0) {
      return;
    }

    const UNIT_LABEL = this.options.i18n.load('Dollar per capita');
    const c3Options = {
      bindto: this.$el.get(0),
      data: {
        columns: [
          [this.options.i18n.load('Remittances')],
          [this.options.i18n.load('International aid')],
        ],
        type : 'pie',
      },
      color: {
        pattern: [
          'rgb(128, 127, 128)',
          'rgb(255, 253, 56)',
        ],
      },
      legend: {
        show: false,
      },
      size: {
        height: 80,
      },
      pie: {
        label: {
          show: false,
        },
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            const dollar = (Math.round(value * 100)/100).toFixed(2);
            return `${dollar} ${UNIT_LABEL}`;
          }
        }
      },
    };

    data.forEach(country => {
      country.data.remittances.forEach(item => {
        const keys = _.keys(item);
        const key = keys[0];

        if (key == YEAR) {
          c3Options.data.columns[0].push(item[key].value);
        }
      });

      country.data.oda.forEach(item => {
        const keys = _.keys(item);
        const key = keys[0];

        if (key == YEAR) {
          c3Options.data.columns[1].push(item[key].value);
        }
      });
    });

    this.chart = this.buildChart(c3Options);

    /* custom label */
    d3.select(this.$el.get(0))
      .insert('p')
        .attr('class', 'country-legend')
        .html(id => {
          return data[0].name;
        });

    return this.chart;
  },

});
