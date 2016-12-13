import _ from 'underscore';
import $ from 'jquery';
import d3 from 'd3';
import i18n from 'lib/i18n';
import L from 'leaflet';
import LayerControl from 'view/map-layer-control';
import MapModel from 'model/map';
import SliderView from 'view/slider';

export default Backbone.View.extend({
  className: 'map',

  initialize(options) {
    this.options = options;
    this.slider = new SliderView();
    this.model = new MapModel();

    //this.listenTo(this.slider.model, 'change:value', (model, value) => {
    //  this.countries.setYear(value);
    //});

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

    this.layerControl = new LayerControl(Object.assign(this.options, {
      slider: this.slider,
      map: this.map,
    }));
    this.layerControl.$el.appendTo(this.$el);

    return this;
  },

  template: _.template(`
    <h1 class="map__title">
      <%= i18n('Who gets paid to stop the worlds refugees?') %>
    </h1>
    <div class="map__container"></div>
  `),
});
