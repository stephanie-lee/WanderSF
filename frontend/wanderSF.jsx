var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var root = document.getElementById('root');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// components required here
var SpotStore = require('./stores/spot');
var ApiUtil = require('./util/api_util');
var Index = require('./components/spots/index');
var Search = require('./components/search');
var SpotDetail = require('./components/spots/detail');
var App = require('./components/app');

var routes = (
  <Route path='/' component={App}>
    <Route path='spot/:spotId' component={SpotDetail}>
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});
