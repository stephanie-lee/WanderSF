var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// components required here
var SpotsIndex = require('./components/spots/spotsIndex');
var SpotStore = require('./stores/spot');
var TagStore = require('./stores/tag');
var TagUtil = require('./util/tag_util');
var ReviewStore = require('./stores/review');
var SpotDetail = require('./components/spots/spotDetail');
var App = require('./components/app');

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={SpotsIndex} />
    <Route path='spot/:spotId' component={SpotDetail} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  var root = document.getElementById('root');
  ReactDOM.render(<Router>{routes}</Router>, root);
});
