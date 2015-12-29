var ReactDOM = require('react-dom');
var React = require('react');
var SearchBar = require('./search');
var ApiUtil = require('../../util/api_util');
var ReactRouter = require('react-router');
var UserInfo = require('./userInfo');

var SignOut = React.createClass({
  mixins: [ReactRouter.History],

  signOut: function(){
    ApiUtil.destroySession(CURRENT_USER_ID);
  },


  render: function() {
    return(
        <button className="btn btn-default navbar-btn pull-right" bsStyle="primary" id="right-nav-button" onClick={this.signOut}>Sign Out</button>
    );
  }
});

var NavBar = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-inverse bg-faded">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/assets/WanderSF.png"
                 alt="Wander SF logo"
                 height="60"
                 width="200">
            </img>
          </a>

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#collapse-menu"
                    aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="collapse-menu">
            <ul className="nav navbar-nav list-unstyled">
              <li><SearchBar location={this.props.location}/></li>
              <li><UserInfo className="left-nav"/></li>
              <li><SignOut className="left-nav"/></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
