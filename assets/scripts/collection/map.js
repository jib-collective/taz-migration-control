import MapCountry from 'model/map-country';

export default Backbone.Collection.extend({
  model: MapCountry,

  initialize() {
    this.on('add', (model) => {
      model.set({
        overlayScale: this._getDataRange(model.get('overlayType')),
        areaScale: this._getDataRange(model.get('areaType')),
      });

      model.draw();
    });

    return this;
  },

  parse(res) {
    return res.map(item => {
      return {
        name: item.label.toLowerCase(),
        map: this._map,
        data: item.data,
      };
    });
  },

  setYear(year) {
    this.models.forEach(model => {
      model.set({year});
    });
  },

  _getDataRange(type) {
    let max = 0;
    let min;

    this.models.forEach(country => {
      const data = country.get('data');
      const dataSet = data[type] || {};

      Object.keys(dataSet).forEach(year => {
        const value = dataSet[year];

        if (!min) {
          min = value
        } else if (value < min) {
          min = value;
        }

        if (value > max) {
          max = value;
        }
      });
    });

    return [
      min,
      max,
    ];
  },

  url: '/data/countries.json',
});
