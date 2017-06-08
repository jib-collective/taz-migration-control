import _ from 'underscore';
import FooterEntry from 'model/footer-entry';

export default Backbone.Collection.extend({
  model: FooterEntry,

  slug: 'imprint',

  initialize(data, options) {
    this.options = options;

    this.options.api.fetch(this.slug)
      .then(data => {
        _.forEach(data, item => this.models.push(new FooterEntry(item)));
        this.trigger('sync');
      });
  },
});
