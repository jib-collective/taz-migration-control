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

  // http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
  //let ramp = d3.scale.linear().domain([0,100]).range([0, 1]);
  //console.log(ramp(98));

  url: '/data/countries.json',
});
