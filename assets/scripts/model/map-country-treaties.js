import L from 'leaflet';
import MapContryBase from 'model/map-country-base';

const LEAFLET_NO_TRANSPARENCY = 'leaflet-interactive--no-transparency';
const LEAFLET_HIDDEN = 'leaflet-interactive--hidden';

export default MapContryBase.extend({
  addLayer() {
    const countryCoords = this.get('countryCoords');
    const partnerCoords = this.get('partnerCoords');
    const startEndMarkerOptions = {
      className: LEAFLET_NO_TRANSPARENCY,
      color: '#ffffff',
      fillOpacity: 1,
      opacity: 1,
      radius: 50000,
    };
    const options = {
      className: LEAFLET_NO_TRANSPARENCY,
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

    const setLayerActive = () => {
      layer.setStyle(active);
      this.getStartEndMarker().forEach(marker => marker.setStyle(active));
    };

    const setLayerInActive = event => {
      if ((!layer.isPopupOpen() && event.type !== 'popupclose') ||
          event.type === 'popupclose') {
        layer.setStyle(options);
        this.getStartEndMarker().forEach(marker => marker.setStyle(options));
      }
    };

    // build start/ end marker
    this.set('_start-end-marker', fromTo.map(latLong => {
      const marker = L.circle(latLong, startEndMarkerOptions);

      marker.addTo(this.getMap());
      marker.on({
        'mouseover': setLayerActive,
        'mouseout': setLayerInActive,
        'click': () => layer.openPopup(),
      });

      return marker;
    }));

    layer.on('mouseover popupopen', setLayerActive);
    layer.on('mouseout popupclose', setLayerInActive);

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
    return this.get('_start-end-marker') || [];
  },

  // Monkey patch, because of the marker removal
  removeLayer() {
    this.getStartEndMarker().forEach(marker => marker.remove());
    return MapContryBase.prototype.removeLayer.call(this);
  },

  setLayerYear(year) {
    const layer = this.get('layer');
    const date = this.get('date');
    let isVisible = parseInt(date.year, 10) <= year;
    let options = {
      fillOpacity: isVisible ? 1 : 0,
      opacity: isVisible ? 1 : 0,
    };

    if (layer) {
      layer.setStyle(options);

      if (layer.isPopupOpen()) {
        layer.closePopup();
      }
    }

    this.getStartEndMarker().forEach(marker => marker.setStyle(options));

    return this;
  },
});
