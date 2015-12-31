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
      center: {lat: 37.7358, lng: -122.4416},
      zoom: 12,
      scrollwheel: false
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.markers = [];
    this.props.spots.forEach(this.createMarkerFromSpot);
  },

  componentDidUpdate: function (oldProps) {
    this._onChange();
  },

  componentWillReceiveProps: function(newProps) {
    newProps.spots.forEach(this.createMarkerFromSpot);
  },

  _onChange: function(){
    var spots = this.props.spots;
    var toAdd = [], toRemove = this.markers.slice(0);
    spots.forEach(function(spot, idx) {
      var removeIdx = -1;

      for(var i = 0; i < toRemove.length; i++){
        if(toRemove[i].spotId == spot.id){
          removeIdx = i;
          break;
        }
      }
      if(removeIdx === -1){
        toAdd.push(spot);
      } else {
        toRemove.splice(removeIdx, 1);
      }
    });
    toAdd.forEach(this.createMarkerFromSpot);
    toRemove.forEach(this.removeMarker);
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
    this.markers.push(marker);
  },

  removeMarker: function(marker){
    for(var i = 0; i < this.markers.length; i++){
      if (this.markers[i].spotId === marker.spotId){
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);
        break;
      }
    }
  },

  render: function(){
    return ( <div className="map" ref="map">Map</div>);
  }
});

module.exports = Map;
