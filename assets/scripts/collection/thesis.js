import Base from 'collection/base';
import ThesisEntry from 'model/thesis';

export default Base.extend({
  model: ThesisEntry,

  initialize() {
    this.url = this.getAPIEndpointURL('theses');
    this.fetch();
    return this;
  },
});
