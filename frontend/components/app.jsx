var React = require('react');
var SpotIndex = require('./spots/spotsIndex');
var NavBar = require('./navbar/navbar');

var App = React.createClass({
  render: function(){
    return (
      <div id="index">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

        // <div className="spots-index">
        //   <SpotIndex />
        // </div>
module.exports = App;
