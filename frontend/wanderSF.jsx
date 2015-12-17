var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var root = document.getElementById('root');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// components required here
var SpotStore = require('./stores/spot');
var ApiUtil = require('./util/api_util.js');
var Index = require('./components/index.jsx');
var Search = require('./components/search.jsx');

var App = React.createClass({
  render: function(){
    return (
      <div id="index">
        <div className="spots-index">
          <Index />
        </div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={App}>
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});
