export default Backbone.Model.extend({
  defaults: {
    tileLayer: 'https://api.mapbox.com/styles/v1/gustavpursche/cizwj7ulj004v2rleivodl103/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VzdGF2cHVyc2NoZSIsImEiOiJhVVRUaFV3In0.IdUObuDS1u0tzNNDvNpfKg',

    mapOptions: {
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false,
      doubleClickZoom: false,
      touchZoom: false,
      tap: false,
    },

    view: [25.36, 17],

    zoom: 4,
  },
});
