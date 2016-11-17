import MapCountry from 'model/map-country';

export default Backbone.Collection.extend({
  model: MapCountry,

  initialize() {
    this.on('add', (model) => {
      const overlayType = model.get('overlayType');
      const areaType = model.get('areaType');
      model.set('overlayScale', this._getDataRange(overlayType, 1));
      model.set('areaScale', this._getDataRange(areaType, 0));
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

  _getDataRange(type, min) {
    let max = 0;

    this.models.forEach(country => {
      const data = country.get('data');
      const dataSet = data[type];

      Object.keys(dataSet).forEach(year => {
        const value = dataSet[year];

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
