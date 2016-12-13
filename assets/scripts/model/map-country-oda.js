import $ from 'jquery';
import _ from 'underscore';
import d3 from 'd3';
import i18n from 'lib/i18n';
import L from 'leaflet';
import limax from 'limax';
import MapContryBase from 'model/map-country-base';

export default MapContryBase.extend({
  defaults: {
    layer: undefined,
    layerStyle: {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: .95,
    },
    data: {},
  },

  /* update all country layers for a single year */
  updateLayer() {
    const year = parseInt(this.get('year'), 10);
    this.setLayerYear(year);
    return this;
  },

  /* calculate radius for an oda bubble for a single year */
  getOdaRadius(year) {
    const scale = this.get('layerScale');
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
  drawLayer() {
    const center = this.get('layer').getBounds().getCenter();
    const style = this.get('layerStyle');
    const radius = this.getScale(this.get('year'));
    const layer = L.circle(center, radius, style);

    this.set('layer', layer);

    return this.addLayer();
  },

  /* update ODA layer */
  setLayerYear(year) {
    const layer = this.get('layer');

    if (layer) {
      layer.setRadius(this.getScale(year))
    }

    return this;
  },
});
