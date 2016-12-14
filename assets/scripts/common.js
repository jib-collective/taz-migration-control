import $ from 'jquery';
import Backbone from 'backbone';

import Workspace from 'router/workspace';

$(function() {
  let env = '{{ENV}}';
  let workspace = new Workspace();
  let options = {
    pushState: true
  };

  if (env === 'production') {
    options.pushState = true;
  }

  Backbone.history.start(options);
});
