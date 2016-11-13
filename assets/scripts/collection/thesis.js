import $ from 'jquery';
import ThesisEntry from 'model/thesis';

export default Backbone.Collection.extend({
  model: ThesisEntry,

  url: '/data/thesis.json',

  initialize() {
    this.fetch();
    return this;
  },
});
