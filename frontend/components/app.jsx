var React = require('react');
var SpotIndex = require('./spots/spotsIndex');

var App = React.createClass({
  render: function(){
    return (
      <div id="index">
        {this.props.children}
      </div>
    );
  }
});

        // <div className="spots-index">
        //   <SpotIndex />
        // </div>
module.exports = App;
