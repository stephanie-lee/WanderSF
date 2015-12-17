var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
var SpotIndexItem = require('./IndexItem');

var SpotIndex = React.createClass({
  getInitialState: function() {
    return { spots: SpotStore.all() };
  },

  _onChange: function() {
    this.setState({ spots: SpotStore.all() });
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    ApiUtil.fetchSpots();
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
  },

  render: function() {
    var spot = this.state.spots.map(function(spot, idx) {
      return(<SpotIndexItem key={idx} spot={spot}/>);
    });
    return(
      <div>
        <ul>
          {spot}
        </ul>
      </div>
    );
  }
});

module.exports = SpotIndex;
