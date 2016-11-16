import _ from 'underscore';
import $ from 'jquery';
import d3 from 'd3';
import i18n from 'lib/i18n';
import L from 'leaflet';
import CountryCollection from 'collection/map';
import MapCountry from 'model/map-country';
import SliderView from 'view/slider';

export default Backbone.View.extend({
  className: 'map',

  initialize() {
    this.slider = new SliderView();
    this.countries = new CountryCollection();

    this.listenTo(this.slider.model, 'change:value', (model, value) => {
      this.countries.setYear(value);
    });

    return this;
  },

  createMap() {
    const map = L.map(this.$el.find('.map__container').get(0), {
      scrollWheelZoom: false,
      zoomControl: false,
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(map);

    map.setView([25.36, 17]);
    map.setZoom(4);

    this.countries._map = map;
    this.countries.fetch();

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return map;
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
