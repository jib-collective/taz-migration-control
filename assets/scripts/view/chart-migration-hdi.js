import c3 from 'c3';

export default Backbone.View.extend({
  className: 'chart',

  renderChart() {
    const chart = c3.generate({
      bindto: this.$el.get(0),
      data: {
        columns: [
          [
            'Migrationsaufkommen', 30, 200, 100, 400, 150, 250
          ],
          [
            'EU Geld', 50, 20, 10, 40, 15, 25
          ]
        ],

        types: {
          'Migrationsaufkommen': 'area-spline',
          'EU Geld': 'area-spline'
        }
      },

      color: {
        pattern: [
          'rgb(216, 216, 216)',
          'rgb(255, 253, 56)',
        ],
      }
    });

    setTimeout(() => {
      chart.flush();
    }, 100);
  },

  render() {
    this.$el.html('');
    this.renderChart();
    return this;
  },
});
