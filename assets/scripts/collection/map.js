import MapCountry from 'model/map-country';

export default Backbone.Collection.extend({
  model: MapCountry,

  parse(res) {
    return res.map(item => {
      return {
        name: item.label.toLowerCase(),
        map: this._map,
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

    this.model.forEach(country => {
      country.data.keys().forEach(key => {
        const value = parseFloat(country.data[key], 10);

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

  getHDIRange() {
    return this._getDataRange('hdi', 0);
  },

  getODARange() {
    return this._getDataRange('oda', 0);
  },

  getMigrationIndexRange() {
    return this._getDataRange('migration', 0);
  },

  url: '/data/countries.json',
});
