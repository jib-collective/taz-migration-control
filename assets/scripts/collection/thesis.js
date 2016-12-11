import _ from 'underscore';
import Base from 'collection/base';
import ThesisEntry from 'model/thesis';

export default Base.extend({
  model: ThesisEntry,

  initialize(data, options) {
    this.options = options;

    this.options.api.fetch('theses')
      .then(data => {
        _.forEach(data, item => this.add(item));
        this.trigger('sync');
      });

    return this;
  },
});
