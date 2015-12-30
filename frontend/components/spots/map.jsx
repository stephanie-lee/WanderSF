var React = require('react');
var ReactDOM = require('react-dom');
// var FilterActions = require('../actions/filter_actions');

// function _getCoordsObj(latLng) {
//   return {
//     lat: latLng.lat(),
//     lng: latLng.lng()
//   };
// }

var CENTER = {lat: 37.7758, lng: -122.435};

var Map = React.createClass({
  componentDidMount: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7458, lng: -122.4416},
      zoom: 12,
      scrollwheel: false
    };
    this.map = new google.maps.Map(map, mapOptions);
  },

  componentDidUpdate: function (oldProps) {
    this._onChange();
  },

  componentWillReceiveProps: function(newProps) {
    newProps.spots.forEach(this.createMarkerFromSpot);
  },

  _onChange: function(){
    this.props.spots.forEach(this.createMarkerFromSpot);
  },

  componentWillUnmount: function(){
    this.markerListener.remove();
  },

  createMarkerFromSpot: function (spot) {
    var that = this;
    var pos = new google.maps.LatLng(spot.lat, spot.lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      spotId: spot.id
    });
    this.markerListener = marker.addListener('click', function () {
      that.props.onMarkerClick(spot);
    });
  },

  render: function(){
    return ( <div className="map" ref="map">Map</div>);
  }
});

module.exports = Map;
