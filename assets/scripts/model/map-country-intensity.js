import $ from 'jquery';
import _ from 'underscore';
import d3 from 'd3';
import i18n from 'lib/i18n';
import limax from 'limax';
import MapContryBase from 'model/map-country-base';

export default MapContryBase.extend({
  defaults: {
    layerStyle: {
      stroke: true,
      color: 'rgb(36, 36, 38)',
      fill: true,
      fillColor: 'rgb(255, 253, 56)',
      fillOpacity: 1,
      opacity: 1,
      weight: 1,
    },
  },

  /* draw intensity layer */
  drawLayer() {
    const fetchGeoData = () => {
      const slug = i18n(limax(this.get('name')), 'de');
      return $.getJSON(`/data/geo/${slug}.geojson`);
    };

    return fetchGeoData()
      .then(data => {
        const style = this.get('layerStyle');
        const className = 'leaflet-country-overlay';
        const opts = Object.assign(style, {className});
        const layer = L.geoJson(data, opts);

        this.set('layer', layer);
        return this.addLayer();
      });
  },

  getScale(year) {
    const type = 'migrationIntensity';
    const scale = this.get('layerScale');
    const range = d3.scale.linear().domain(scale).range([0, 1]);
    const value = this._getDataValueForYear(type, year);

    return range(value);
  },

  /* set intensity for a single year */
  setLayerYear(year) {
    const layer = this.get('layer');
    const fillOpacity = this.getScale(year);
    const opacity = 1;

    if (layer) {
      layer.setStyle({fillOpacity, opacity})
    }

    return this;
  },

  updateLayer() {
    const year = parseInt(this.get('year'), 10);
    this.setLayerYear(year);
    return this;
  },
});
