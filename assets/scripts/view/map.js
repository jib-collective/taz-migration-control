import L from 'leaflet';

export default Backbone.View.extend({
  className: 'map',

  createMap() {
    const map = L.map(this.$el.get(0), {
      scrollWheelZoom: false,
    });
    map.setView([51.505, -0.09], 13);

    // dont know why
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    return map;
  },

  render() {
    this.$el.html('');
    this.map = this.createMap();
    return this;
  },
});
