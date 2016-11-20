import $ from 'jquery';
import d3 from 'd3';
import L from 'leaflet';
import limax from 'limax';

/*

Datenstruktur

Geld = ODA + Migrationsabwehrzahlungen

- HDI / Geld: HDI Flaechenlayer
** - Migrationsindex / Geld: MI Flaechenlayer
- Migrationsindex / Detention Center: MI Flaechenlayer

*/


export default Backbone.Model.extend({
  defaults: {
    name: '',
    year: 2010,
    map: undefined,

    area: undefined,
    areaType: 'migration-intensity',
    areaScale: [0, 8],
    areaStyle: {
      stroke: true,
      color: 'rgb(255, 255, 255)',
      fill: true,
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: 1,
      opacity: 1,
      weight: 1,
    },

    overlay: undefined,
    overlayType: 'oda',
    overlayScale: [],
    overlayStyle: {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 253, 56)',
      fillOpacity: .8,
    },

    data: {},
  },

  initialize(map) {
    this.updateCountry(2010);
    this.on('change:year', this.updateCountry);
    return this;
  },

  draw() {
    this.area()
      .then(() => {
        //this.overlay();
      });
  },

  updateCountry(year) {
    const areaLayer = this.get('area');
    const overlayLayer = this.get('overlay');

    if (!areaLayer) {
      return this;
    }

    this.setAreaYear(year);
    //this.setOverlayYear(year);

    return this;
  },

  fetchCountryPolygon() {
    const slug = limax(this.get('name'));
    return $.getJSON(`/data/geo/${slug}.geojson`);
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
    const opacity = 1;

    return layer.setStyle({fillOpacity, opacity});
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

  _getDataValueForYear(type, year) {
    return this.get('data')[type][year];
  },

  _getRadius() {
    const overlayType = this.get('overlayType');
    const currentYear = this.get('year');
    const overlayScale = this.get('overlayScale');
    const range = d3.scale.linear().domain(overlayScale).range([0, 1]);
    const value = this._getDataValueForYear(overlayType, currentYear);
    const sizeFactor = range(value);

    if (sizeFactor) {
      return (1000000/2) * sizeFactor;
    }

    return 1;
  },

  _getOpacity() {
    const areaType = this.get('areaType');
    const currentYear = this.get('year');
    const areaScale = this.get('areaScale');
    const range = d3.scale.linear().domain(areaScale).range([0, 1]);
    const value = this._getDataValueForYear(areaType, currentYear);

    return range(value);
  },
});
