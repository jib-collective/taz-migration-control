import _ from 'underscore';
import i18n from 'lib/i18n';
import L from 'leaflet';

export default Backbone.View.extend({
  className: 'map',

  createMap() {
    const map = L.map(this.$el.find('.map__container').get(0), {
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
    this.$el.html(this.template({
      i18n,
    }));
    this.map = this.createMap();
    return this;
  },

  template: _.template(`
    <h1 class="map__title">
      <%= i18n('Who gets paid to stop the worlds refugees?') %>
    </h1>
    <div class="map__container"></div>
  `),
});
