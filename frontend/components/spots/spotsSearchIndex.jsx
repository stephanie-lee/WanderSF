var React = require('react');
var SpotStore = require('../../stores/spot');
var SpotUtil = require('../../util/spot_util');
var SpotIndexItem = require('./spotIndexItem');
var ReviewStore = require('../../stores/review');
var Map = require('./map');

var SpotsSearchIndex = React.createClass({
  getInitialState: function() {
    return { spots: [],
             query: this.props.location.query.query};
  },

  _onChange: function() {
    this.setState({ spots: SpotStore.all() });
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    SpotUtil.fetchSpotsByQuery(this.props.location.query.query);
  },

  componentWillReceiveProps: function(newProp) {
    SpotUtil.fetchSpotsByQuery(newProp.location.query.query);
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
  },

  handleMarkerClick: function (spot) {
    this.props.history.pushState(null, "spot/" + spot.id);
  },

  render: function() {
    var spots = this.state.spots.map(function(spotItem, idx) {
      return(<SpotIndexItem key={idx} spot={spotItem} />);
    });
    return(
      <div>
        <div className="search-content-title">
          Tags matching <strong>"{this.props.location.query.query}"</strong>
        </div>
        <ul id="search-index-container" className="list-group">
          {spots}
        </ul>
        <div id="search-index-map-container">
          <Map spots={this.state.spots} onMarkerClick={this.handleMarkerClick}/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = SpotsSearchIndex;
