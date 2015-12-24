var ReactDOM = require('react-dom');
var React = require('react');
var SearchBar = require('./search');

var NavBar = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-inverse bg-faded">
        <a className="navbar-brand" href="#">
          <img src="/assets/WanderSF.png"
               alt="Wander SF logo"
               height="50"
               width="150">
          </img>
        </a>
        <ul className="nav navbar-nav fixed">
          <li className="nav-item">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
        </ul>
        <SearchBar location={this.props.location}/>

      </nav>
    );
  }
});

module.exports = NavBar;
