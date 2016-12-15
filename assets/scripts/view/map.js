import _ from 'underscore';
import i18n from 'lib/i18n';
import L from 'leaflet';
import LayerControl from 'view/map-layer-control';
import MapModel from 'model/map';

export default Backbone.View.extend({
  className: 'map',

  initialize(options) {
    this.options = options;
    this.model = new MapModel();

    return this;
  },

  createMap() {
    const options = this.model.get('mapOptions');
    const tileLayer = this.model.get('tileLayer');
    const tileOptions = this.model.get('tileLayerOptions');
    const view = this.model.get('view');
    const zoom = this.model.get('zoom');
    const targetContainer = this.$el.find('.map__container').get(0);

    const map = L.map(targetContainer, options);

    L.tileLayer(tileLayer, tileOptions).addTo(map);

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

    this.layerControl = new LayerControl(Object.assign(this.options, {
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
