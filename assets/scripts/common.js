import $ from 'jquery';
import Backbone from 'backbone';

import Workspace from 'router/workspace';

$(function() {
  let workspace = new Workspace();
  Backbone.history.start({pushState: true});
});
