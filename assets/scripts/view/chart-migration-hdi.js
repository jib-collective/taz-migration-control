import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import c3 from 'c3';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  className: 'chart',

  fetchData() {
    const countryId = 9931;

    return $.getJSON(`http://localhost:8080/migrationcontrol/v1/de/country/${countryId}/`)
      .then(data => {
        let column1 = [i18n('Migrationsaufkommen')];
        let column2 = [i18n('EU Geld')];
        let years = [];

        _.forEach(data.data.migrationIntensity, item => {
          return column1.push(_.values(item)[0]);
        });

        _.forEach(data.data.oda, item => {
          return column2.push(_.values(item)[0]);
        });

        _.forEach(data.data.migrationIntensity, item => {
          return years.push(_.keys(item)[0]);
        });

        return {
          column1,
          column2,
          years,
        };
      });
  },

  renderChart(data) {
    const {column1, column2, years} = data;

    const c3Options = {
      axis: {
        x: {
          type: 'category',
          categories: years,
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
          column1,
          column2,
        ],
        types: {},
      },
      color: {
        pattern: [
          'rgb(216, 216, 216)',
          'rgb(255, 253, 56)',
        ],
      }
    };

    c3Options.data.axes[column1[0]] = 'y';
    c3Options.data.axes[column2[0]] = 'y2';

    c3Options.data.types[column1[0]] = 'area-spline';
    c3Options.data.types[column2[0]] = 'area-spline';

    const chart = c3.generate(c3Options);

    setTimeout(() => {
      chart.flush();
    }, 100);
  },

  initialize() {
    this.fetchData()
      .then(data => this.renderChart(data));

    return this;
  },

  render() {
    this.$el.html('');
    return this;
  },
});
