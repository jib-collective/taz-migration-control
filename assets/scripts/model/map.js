export default Backbone.Model.extend({
  defaults: {
    tileLayer: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',

    mapOptions: {
      scrollWheelZoom: false,
      zoomControl: false,
      doubleClickZoom: false,
    },

    view: [25.36, 17],

    zoom: 4,
  },
});
