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
      fillColor: 'rgb(255, 253, 56)',
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

  addLayer() {
    const fetchGeoData = () => {
      const slug = i18n(limax(this.get('name')), 'de');
      return $.getJSON(`/data/geo/${slug}.geojson`);
    };

    return fetchGeoData()
      .then(data => {
        const geoJSON = L.geoJson(data);
        const center = geoJSON.getBounds().getCenter();
        const style = this.get('layerStyle');
        const radius = this.getRadius(this.get('year'));
        const title = this._getDataValueForYear('singlePayments', this.get('year'));
        const layer = L.circleMarker(center, Object.assign(style, {radius}));

        if (title) {
          const tooltip = L.tooltip({
            className: 'leaflet-payment-label',
            direction: 'center',
            permanent: true,
          });

          layer.bindTooltip(tooltip);
          layer.setTooltipContent(`${title}`);
        }

        this.set('layer', layer);
        this.updateLayer();

        return MapContryBase.prototype.addLayer.call(this);
      });
  },

  /* calculate radius for an oda bubble for a single year */
  getRadius(year) {
    const range = this.getRange([25, 150]);
    const value = this._getDataValueForYear('singlePayments', year);

    if (!value) {
      return 0;
    }

    return range(value);
  },

  /* update ODA layer */
  setLayerYear(year) {
    const layer = this.get('layer');
    const title = this._getDataValueForYear('singlePayments', year);

    if (layer) {
      const radius = this.getRadius(year);

      if (radius !== 0) {
        layer.setStyle(this.get('layerStyle'));
        layer.setRadius(radius);
        layer.openTooltip();
        layer.setTooltipContent(`${title}`);
      } else {
        layer.setStyle({fillOpacity: 0});
        layer.closeTooltip();
      }
    }

    return this;
  },
});
