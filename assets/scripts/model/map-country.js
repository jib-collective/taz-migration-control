import $ from 'jquery';
import L from 'leaflet';

export default Backbone.Model.extend({
  defaults: {
    name: '',
    year: 2010,
    map: undefined,

    area: undefined,
    areaType: 'migration-intensity',
    areaStyle: {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: 1,
    },

    overlay: undefined,
    overlayType: 'migration-money',
    overlayStyle: {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 253, 56)',
      fillOpacity: .8,
    },

    data: {},
  },

  initialize(map) {
    this.on('change:year', this.updateCountry);

    this.area()
      .then(() => {
        this.overlay();
      });

    return this;
  },

  updateCountry(year) {
    this.setAreaYear(year);
    this.setOverlayYear(year);
    return this;
  },

  fetchCountryPolygon() {
    return $.getJSON(`/data/geo/${this.get('name')}.geojson`);
  },

  area() {
    return this.fetchCountryPolygon()
      .then(data => {
        const style = this.get('areaStyle');
        const layer = L.geoJson(data, style);

        this.set('area', layer);
        layer.addTo(this.get('map'));

        return layer;
      });
  },

  setAreaYear(year) {
    const layer = this.get('area');
    const fillOpacity = this._getOpacity();
    return layer.setStyle({fillOpacity});
  },

  overlay() {
    const center = this.get('area').getBounds().getCenter();
    const style = this.get('overlayStyle');
    const radius = this._getRadius();
    const layer = L.circle(center, radius, style);

    this.set('overlay', layer);
    layer.addTo(this.get('map'));

    return layer;
  },

  setOverlayYear(year) {
    const layer = this.get('overlay');
    return layer.setRadius(this._getRadius());
  },

  _getRadius() {
    return 500 * 1000 * Math.random();
  },

  _getOpacity() {
    return Math.random();
  },
});
