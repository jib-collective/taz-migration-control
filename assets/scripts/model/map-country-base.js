import $ from 'jquery';
import _ from 'underscore';
import d3 from 'd3';
import i18n from 'lib/i18n';
import L from 'leaflet';
import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    year: 2010,
    map: undefined,
    layer: undefined,
    data: {},
  },

  initialize() {
    this.on('change:year', (model, value) => this.updateLayer(value));

    this.drawLayer()
      .then(layer => {
        this.updateLayer();
      });

    return this;
  },

  /* get dataset for a single year */
  _getDataValueForYear(type, year) {
    const data = this.get('data');
    let response;

    _.forEach(data[type], item => {
      if (_.keys(item)[0] == year) {
        response = item[year];
      }
    });

    return response;
  },

  getMap() {
    return this.get('map');
  },

  /* draw a layer on the map */
  addLayer() {
    const layer = this.get('layer');

    layer.addTo(this.getMap());
    return layer;
  },

  removeLayer() {
    const layer = this.get('layer');

    if (layer) {
      layer.removeFrom(this.getMap());
    }

    return layer;
  },
});
