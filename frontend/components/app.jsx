var React = require('react');
var SpotIndex = require('./spots/spotsIndex');

var App = React.createClass({
  render: function(){
    return (
      <div id="index">
        <div className="spots-index">
          <SpotIndex />
        </div>

        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
