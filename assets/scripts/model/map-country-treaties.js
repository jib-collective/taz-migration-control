import L from 'leaflet';
import MapContryBase from 'model/map-country-base';

export default MapContryBase.extend({
  defaults: {
    '_start-end-marker': [],
  },

  addLayer() {
    const countryCoords = this.get('countryCoords');
    const partnerCoords = this.get('partnerCoords');
    const startEndMarker = this.get('_start-end-marker');
    const startEndMarkerOptions = {
      className: 'leaflet-interactive--no-transparency',
      color: '#ffffff',
      fillOpacity: 1,
      opacity: 1,
      radius: 50000,
    };
    const options = {
      className: 'leaflet-interactive--no-transparency',
      color: '#ffffff',
      fillOpacity: 1,
      opacity: 1,
      weight: 3,
    };
    const active = Object.assign({}, options, {
      color: '#fffd38',
    });
    const fromTo = [
      [countryCoords.lat, countryCoords.lon],
      [partnerCoords.lat, partnerCoords.lon],
    ];

    const layer = L.polyline(fromTo, options);

    // build start/ end marker
    for(let i = 0; i < 2; ++i) {
      const marker = L.circle(fromTo[i], startEndMarkerOptions);
      marker.addTo(this.getMap());
      startEndMarker.push(marker);
    }

    layer.on('mouseover popupopen', () => layer.setStyle(active));
    layer.on('mouseout popupclose', event => {
      if ((!layer.isPopupOpen() && event.type !== 'popupclose') ||
          event.type === 'popupclose') {
        layer.setStyle(options);
      }
    });

    this.set({layer});

    return MapContryBase.prototype.addLayer.call(this);
  },

  getPopupContent() {
    const name = this.get('name');
    const country = this.get('country');
    const partner = this.get('partner');
    const title = `${name} <br/> ${country} – ${partner}`;
    const link = this.get('link');
    const date = this.get('date');

    return `
      <a href="${link}"
         class="leaflet-popup__title">${title}</a>
      <span class="leaflet-popup__value">&nbsp;</span>
      <span class="leaflet-popup__label">${date.day}.${date.month}.${date.year}</span>
    `;
  },

  getStartEndMarker() {
    return this.get('_start-end-marker');
  },

  // Monkey patch, because of the marker removal
  removeLayer() {
    this.getStartEndMarker().forEach(marker => marker.remove());
    return MapContryBase.prototype.removeLayer.call(this);
  },

  updateLayer() {
    return this;
  },
});
