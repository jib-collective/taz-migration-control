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
        this.trigger('layers-painted');
      });

    return this;
  },

  /* update all country layers for a single year */
  updateCountry() {
    const year = parseInt(this.get('year'), 10);

    this.setIntensityYear(year);
    this.setOdaYear(year);

    if (year === 2016) {
      this.drawValetta();
    } else {
      this.removeValetta();
    }

    return this;
  },

  /* draw intensity layer */
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
        return this._addLayerToMap(layer);
      });
  },

  /* set intensity for a single year */
  setIntensityYear(year) {
    const getOpacity = (year) => {
      const type = 'migration-intensity';
      const scale = this.get('intensityScale');
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

  /* draw valetta label */
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

  /* draw valetta label for a single year */
  drawValetta() {
    let layer = this.valetta();

    if (layer) {
      return this._addLayerToMap(layer);
    }

    return this;
  },

  /* remove valetta label */
  removeValetta() {
    const layer = this.get('valetta');

    if (layer) {
      layer.remove();
    }

    return this;
  },

  /* calculate radius for an oda bubble for a single year */
  getOdaRadius(year) {
    const scale = this.get('odaScale');
    const range = d3.scale.linear().domain(scale).range([0, 1]);
    const value = this._getDataValueForYear('oda', year);

    if (!value) {
      return 1;
    }

    const radiusFactor = range(value);

    if (radiusFactor) {
      return 700 * 1000 * radiusFactor;
    }

    return 1;
  },

  /* draw oda layer */
  oda() {
    const center = this.get('intensity').getBounds().getCenter();
    const style = this.get('odaStyle');
    const radius = this.getOdaRadius(this.get('year'));
    const layer = L.circle(center, radius, style);

    this.set('oda', layer);

    return this._addLayerToMap(layer);
  },

  /* update ODA layer */
  setOdaYear(year) {
    const layer = this.get('oda');

    if (layer) {
      layer.setRadius(this.getOdaRadius(year))
    }

    return this;
  },

  /* get dataset for a single year */
  _getDataValueForYear(type, year) {
    const data = this.get('data');

    if (data[type] && data[type][year]) {
      return data[type][year];
    }

    return undefined;
  },

  /* draw a layer on the map */
  _addLayerToMap(layer) {
    layer.addTo(this.get('map'));
    return layer;
  },
});
