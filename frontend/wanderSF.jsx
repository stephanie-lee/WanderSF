var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// components required here
var SpotStore = require('./stores/spot');
var ReviewStore = require('./stores/review');
var SpotDetail = require('./components/spots/detail');
var App = require('./components/app');

var routes = (
  <Route path='/' component={App}>
    <Route path='spot/:spotId' component={SpotDetail}>
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  var root = document.getElementById('root');
  ReactDOM.render(<Router>{routes}</Router>, root);
});
