import _ from 'underscore';
import $ from 'jquery';
import Chart from 'view/chart';
import i18n from 'lib/i18n';

const YEAR = 2014;

export default Chart.extend({
  className: 'chart',

  type: 'remittances',

  renderChart(data) {
    const c3Options = {
      bindto: this.$el.get(0),
      data: {
        columns: [
          [i18n('Remittances')],
          [i18n('EU Money')],
        ],
        type : 'pie',
      },
      color: {
        pattern: [
          'rgb(216, 216, 216)',
          'rgb(255, 253, 56)',
        ],
      }
    };

    data.forEach(country => {
      country.data.remittances.forEach(item => {
        if (_.keys(item)[0] == YEAR) {
          c3Options.data.columns[0].push(_.values(item)[0]);
        }
      });

      country.data.oda.forEach(item => {
        if (_.keys(item)[0] == YEAR) {
          c3Options.data.columns[1].push(_.values(item)[0]);
        }
      });
    });

    return this.buildChart(c3Options);
  },

});
