import _ from 'underscore';
import $ from 'jquery';
import i18n from 'lib/i18n';
import L from 'leaflet';
import SliderView from 'view/slider';

export default Backbone.View.extend({
  className: 'map',

  initialize() {
    this.slider = new SliderView();
    this.listenTo(this.slider.model, 'change:value', (model, value) => {
      this.countryLayer.forEach(layer => {
        layer.setStyle({
          fillOpacity: Math.random(),
        });
      });
    });
    this.countryLayer = [];
  },

  createMap() {
    const map = L.map(this.$el.find('.map__container').get(0), {
      scrollWheelZoom: false,
    });

    map.setView([25.36, 17]);
    map.setZoom(4);

    // dont know why
    setTimeout(() => {
      map.invalidateSize();
      this.drawCountry(map, 'libya');
      this.drawCountry(map, 'mali');
      this.drawCountry(map, 'chad');
    }, 300);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(map);
    return map;
  },

  drawCountry(map, name) {
    const style = {
      stroke: false,
      fill: true,
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: 1,
    };

    $.getJSON(`/data/geo/${name}.geojson`)
      .then(data => {
        const layer = L.geoJson(data, {style}).addTo(map);
        this.countryLayer.push(layer);
      });
  },

  render() {
    this.$el.html(this.template({
      i18n,
    }));

    this.map = this.createMap();
    this.slider.render().$el.appendTo(this.$el);

    return this;
  },

  template: _.template(`
    <h1 class="map__title">
      <%= i18n('Who gets paid to stop the worlds refugees?') %>
    </h1>
    <div class="map__container"></div>
  `),
});
