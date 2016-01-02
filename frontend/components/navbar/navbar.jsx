var ReactDOM = require('react-dom');
var React = require('react');
var SearchBar = require('./search');
var ApiUtil = require('../../util/api_util');
var ReactRouter = require('react-router');
var UserInfo = require('./userInfo');
var UserAvatar = require('./userAvatar');

var SignOut = React.createClass({
  mixins: [ReactRouter.History],

  signOut: function(){
    ApiUtil.destroySession(CURRENT_USER_ID);
  },


  render: function() {
    return(
        <button className="btn btn-primary navbar-btn button-md"
                id="right-nav-button"
                onClick={this.signOut}>Sign Out</button>
    );
  }
});

var NavBar = React.createClass({
  render: function(){
      var liStyle = {bottom: '5px', left: '5px'};
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand" href="#">
              <img src="/assets/WanderSF.png"
                   alt="Wander SF logo"
                   height="60"
                   width="200">
              </img>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="search-bar"><SearchBar location={this.props.location}/></li>
              <li></li>
              <li className="dropdown" style={liStyle}>
                <a href="#"
                   className="dropdown-toggle user-avatar"
                   data-toggle="dropdown"
                   role="button"
                   aria-haspopup="true"
                   aria-expanded="false"><UserAvatar /><span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><SignOut /></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
