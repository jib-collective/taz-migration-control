export default Backbone.Model.extend({
  defaults: {
    tileLayer: 'https://cartocdn-ashbu.global.ssl.fastly.net/migrationskontrolle/api/v1/map/migrationskontrolle@d88cc80b@0f46a528a621a1d369fb4c2df8d41e27:1481735928967/1,2,3/{z}/{x}/{y}.png',

    tileLayerOptions: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },

    mapOptions: {
      scrollWheelZoom: false,
      zoomControl: false,
      doubleClickZoom: false,
    },

    view: [25.36, 17],

    zoom: 4,
  },
});
