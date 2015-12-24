var React = require('react');
var SpotIndex = require('./spots/spotsIndex');
var NavBar = require('./navbar/navbar');

var App = React.createClass({
  render: function(){
    return (
      <div id="index">
        <NavBar location={this.props.location}/>
        <div className='container below-nav'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
