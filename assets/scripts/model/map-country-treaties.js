import L from 'leaflet';
import { icon } from 'lib/icon';
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
      radius: 38000,
    };
    const options = {
      className: LEAFLET_NO_TRANSPARENCY,
      color: '#ffffff',
      weight: 1.5,
    };
    const active = Object.assign({}, options, {
      color: '#fffd38',
    });
    const fromTo = [
      [countryCoords.lat, countryCoords.lon],
      [partnerCoords.lat, partnerCoords.lon],
    ];

    const layer = L.polyline(fromTo, options);
    layer.view = this;

    const setLayerActive = (options = {}) => {
      options.layer.setStyle(active);
      options.layer.bringToFront();

      options.layer.view.getStartEndMarker().forEach(marker => {
        marker.setStyle(active);
        marker.bringToFront();
      });

      if (options.marker) {
        const markerType = options.marker.type;
        const markerLatLng = options.marker.getLatLng();

        this.collection.models.forEach(model => {
          const countryCoords = model.get('countryCoords');
          const partnerCoords = model.get('partnerCoords');
          const layer = model.get('layer');
          const activateIfSimilar = (coords) => {
            if (markerLatLng.lat === coords.lat && markerLatLng.lng === coords.lon) {
              setLayerActive({ layer });
            }
          };

          if (markerType === 'country') {
            activateIfSimilar(countryCoords);
          } else {
            activateIfSimilar(partnerCoords);
          }
        });
      }
    };

    const setLayerInActive = (args) => {
      args.layer.setStyle(options);
      args.layer.view.getStartEndMarker().forEach(marker => marker.setStyle(options));

      if (args.marker) {
        this.collection.models.forEach(model => {
          const layer = model.get('layer');
          setLayerInActive({ layer });
        });
      }
    };

    // build start/ end marker
    this.set('_start-end-marker', fromTo.map((latLong, index) => {
      const marker = L.circle(latLong, startEndMarkerOptions);
      marker.type = index === 0 ? 'country' : 'partner';

      marker.addTo(this.getMap());
      marker.on({
        mouseover: () => { setLayerActive({ marker, layer }) },
        mouseout: () => { setLayerInActive({ marker, layer }) },
      });

      return marker;
    }));

    layer.on('mouseover popupopen', () => setLayerActive({ layer }));
    layer.on('mouseout popupclose', () => setLayerInActive({ layer }));

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
         class="leaflet-popup__title"
         target="_blank"
         rel="noopener noreferrer">
        ${icon('external-link', 'leaflet-popup__external-icon')}
        ${title}
      </a>
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
