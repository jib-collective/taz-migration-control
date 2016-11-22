import _ from 'underscore';
import $ from 'jquery';
import CountryCollection from 'collection/map';
import d3 from 'd3';
import i18n from 'lib/i18n';
import L from 'leaflet';
import LayerControl from 'view/map-layer-control';
import MapCountry from 'model/map-country';
import MapModel from 'model/map';
import SliderView from 'view/slider';

export default Backbone.View.extend({
  className: 'map',

  initialize() {
    this.slider = new SliderView();
    this.countries = new CountryCollection();
    this.model = new MapModel();
    this.layerControl = new LayerControl({
      collection: this.countries,
    });

    this.listenTo(this.slider.model, 'change:value', (model, value) => {
      this.countries.setYear(value);
    });

    return this;
  },

  createMap() {
    const options = this.model.get('mapOptions');
    const tileLayer = this.model.get('tileLayer');
    const view = this.model.get('view');
    const zoom = this.model.get('zoom');
    const targetContainer = this.$el.find('.map__container').get(0);

    const map = L.map(targetContainer, options);

    L.tileLayer(tileLayer).addTo(map);

    map.setView(view);
    map.setZoom(zoom);

    this.countries._map = map;
    this.countries.fetch();

    // todo: try to get rid of this
    setTimeout(() => {
      map.invalidateSize();
    }, 20);

    return map;
  },

  render() {
    this.$el.html(this.template({
      i18n,
    }));

    this.map = this.createMap();
    this.slider.render().$el.appendTo(this.$el);
    this.layerControl.render().$el.appendTo(this.$el);

    return this;
  },

  template: _.template(`
    <h1 class="map__title">
      <%= i18n('Who gets paid to stop the worlds refugees?') %>
    </h1>
    <div class="map__container"></div>
  `),
});
