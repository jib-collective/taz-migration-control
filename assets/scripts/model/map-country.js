import $ from 'jquery';
import d3 from 'd3';
import L from 'leaflet';
import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    name: '',
    year: 2010,
    map: undefined,

    intensity: undefined,
    intensityStyle: {
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

    this.intensity()
      .then(layer => {
        this.oda(layer);
        this.updateCountry();
      });

    return this;
  },

  updateCountry() {
    const year = parseInt(this.get('year'), 10);
    this.setIntensityYear(year);

    if (year === 2016) {
      this.setValettaYear(year);
    } else {
      this.clearValettaYear(year);
    }

    return this;
  },

  intensity() {
    const fetchGeoData = () => {
      const slug = limax(this.get('name'));
      return $.getJSON(`/data/geo/${slug}.geojson`);
    };

    return fetchGeoData()
      .then(data => {
        const style = this.get('intensityStyle');
        const className = 'leaflet-country-overlay';
        const opts = Object.assign(style, {className});
        const layer = L.geoJson(data, opts);

        this.set('intensity', layer);
        layer.addTo(this.get('map'));

        return layer;
      });
  },

  setIntensityYear(year) {
    const getOpacity = (year) => {
      const type = 'migration-intensity';
      const scale = this.get('intensityScale');
      console.log(scale);
      const range = d3.scale.linear().domain(scale).range([0, 1]);
      const value = this._getDataValueForYear(type, year);

      return range(value);
    };

    const layer = this.get('intensity');
    const fillOpacity = getOpacity(year);
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

    const center = this.get('intensity').getBounds().getCenter();
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

  oda() {
    return this;
  },

  _getDataValueForYear(type, year) {
    return this.get('data')[type][year];
  },
});
