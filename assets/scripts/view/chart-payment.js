import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import c3 from 'c3';
import i18n from 'lib/i18n';

const YEAR = 2014;

export default Backbone.View.extend({
  className: 'chart',

  fetchData() {
    const countryIds = [
      9399,
      9931,
      8083,
      7187,
    ];
    const promises = [];
    const promiseData = [];

    countryIds.forEach(id => {
      const promise = $.getJSON(`http://localhost:8080/migrationcontrol/v1/de/country/${id}/`)
        .then(data => promiseData.push(data));

      promises.push(promise);
    });

    return $.when.apply($, promises)
      .then(data => promiseData);
  },

  renderChart(data) {
    const c3Options = {
      axis: {
        x: {
          type: 'category',
          categories: _.map(data, country => country.name),
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
          [i18n('Human Development Index') + ' (' + YEAR + ')'],
          [i18n('EU-Gelder') + ' (' + YEAR + ')'],
        ],
        type: 'bar'
      },

      bar: {
        width: {
          ratio: .5,
        }
      },

      color: {
        pattern: [
          'rgb(255, 253, 56)',
          'rgb(216, 216, 216)',
        ],
      }
    };

    _.forEach(data, country => {
      country.data.hdi.forEach(item => {
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

    c3Options.data.axes[c3Options.data.columns[0][0]] = 'y';
    c3Options.data.axes[c3Options.data.columns[1][0]] = 'y2';

    const chart = c3.generate(c3Options);

    setTimeout(() => {
      chart.flush();
    }, 100);
  },

  initialize() {
    this.fetchData().then(data => this.renderChart(data));

    return this;
  },

  render() {
    this.$el.html('');
    return this;
  },
});
