import $ from 'jquery';
import _ from 'underscore';
import d3 from 'd3';
import L from 'leaflet';
import limax from 'limax';
import MapContryBase from 'model/map-country-base';

export default MapContryBase.extend({
  addLayer() {
    const lat = this.get('lat');
    const long = this.get('lon');
    const icon = L.icon({
      iconUrl: '/dist/images/detention-center-marker.svg',
      iconSize: [28, 28],
    });
    const layer = L.marker([lat, long], {icon});

    this.set({layer});
    return MapContryBase.prototype.addLayer.call(this);
  },

  getPopupContent() {
    const title = this.get('name');

    return `
      <span class="leaflet-popup__title">${title}</span>
    `;
  },

  updateLayer() {
    return this;
  },
});
