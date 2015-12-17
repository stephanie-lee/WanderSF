var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');

var indexItem = require('./IndexItem');

var Index = React.createClass({
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
    return(
      <ul>
        {this.state.spots.map(function(spot) {
          console.log(spot);
          return <div>
                  <li key={spot.id}>{spot.name}:
                    <br/>
                    {spot.description}</li>
                  <br/>
                </div>;
        })}
      </ul>
    );
  }
});

module.exports = Index;
