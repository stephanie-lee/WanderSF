var React = require('react');
var SpotStore = require('../../stores/spot');
var SpotUtil = require('../../util/spot_util');
var SpotIndexItem = require('./spotIndexItem');
var ReviewStore = require('../../stores/review');

var SpotIndex = React.createClass({
  getInitialState: function() {
    return { spots: SpotStore.all() };
  },

  _onChange: function() {
    this.setState({ spots: SpotStore.all() });
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    SpotUtil.fetchSpots();
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
  },

  render: function() {
    var spot = this.state.spots.map(function(spotItem, idx) {
      return(<SpotIndexItem key={idx} spot={spotItem} />);
    });
    return(
      <div>
        <ul className="list-group">
          {spot}
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = SpotIndex;
