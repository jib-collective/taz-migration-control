import _ from 'underscore';
import {renderTreatyList} from 'lib/render-treaties';
import {renderAuthors} from 'lib/render-authors';

export default Backbone.View.extend({
  className: 'background',

  subnav: 'background',

  initialize(options) {
    this.options = options;
    return this;
  },

  render() {
    if (this.template) {
      this.$el.html(this.template({
        corpus: this.model.get('corpus'),
        headline: this.model.get('headline'),
        i18n: this.options.i18n,
        renderTreatyList,
        renderAuthors,
        treaties: this.model.get('treaties'),
        authors: this.model.get('authors'),
        lead: this.model.get('lead'),
      }));
    }

    return this;
  },
});
