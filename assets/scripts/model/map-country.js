import $ from 'jquery';
import d3 from 'd3';
import L from 'leaflet';
import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    name: '',
    year: 2010,
    map: undefined,

    area: undefined,
    areaType: 'migration-intensity',
    areaStyle: {
      stroke: true,
      color: 'rgb(36, 36, 38)',
      fill: true,
      fillColor: 'rgb(255, 253, 56)',
      fillOpacity: 1,
      opacity: 1,
      weight: 1,
    },

    valetta: undefined,
    valettaStyle: {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: .95,
    },

    oda: undefined,
    odaStyle: {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: .95,
    },

    data: {},
  },

  initialize(map) {
    this.on('change:year', (model, value) => this.updateCountry(value));
    this.area().then(() => this.updateCountry(this.get('year')));

    return this;
  },

  updateCountry(year) {
    const yearValue = parseInt(year, 10);
    this.setAreaYear(yearValue);

    if (yearValue === 2016) {
      this.setValettaYear(year);
    } else {
      this.clearValettaYear(year);
    }

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
        const className = 'leaflet-country-overlay';
        const layer = L.geoJson(data, Object.assign(style, {className}));

        this.set('area', layer);
        layer.addTo(this.get('map'));

        return layer;
      });
  },

  setAreaYear(year) {
    const layer = this.get('area');
    const fillOpacity = this._getOpacity();
    const opacity = 1;

    if (layer) {
      layer.setStyle({fillOpacity, opacity})
    }

    return this;
  },

  valetta() {
    const data = this.get('data');
    const label = data['valetta-label'] || undefined;

    if (!label) {
      return undefined;
    }

    const center = this.get('area').getBounds().getCenter();
    const markerStyle = this.get('valettaStyle');
    const tooltipDefaults = {
      className: 'leaflet-valetta-label',
      direction: 'center',
      permanent: true,
    };
    const markerDefaults = {
      className: 'leaflet-valetta-marker',
      radius: 80,
    };
    const tooltip = L.tooltip(tooltipDefaults)
    const layer = L.circleMarker(center, Object.assign(markerStyle, markerDefaults));

    layer.bindTooltip(tooltip);
    layer.setTooltipContent(label);

    this.set('valetta', layer);

    return layer;
  },

  setValettaYear(year) {
    let layer = this.valetta();

    if (layer) {
      layer.addTo(this.get('map'));
    }

    return this;
  },

  clearValettaYear(year) {
    const layer = this.get('valetta');

    if (layer) {
      layer.remove();
    }

    return this;
  },

  _getDataValueForYear(type, year) {
    return this.get('data')[type][year];
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
