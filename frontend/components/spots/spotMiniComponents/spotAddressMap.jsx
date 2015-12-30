var React = require('react');
var ReactDOM = require('react-dom');

var SpotAddressMap = React.createClass({
  componentDidMount: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    this.spot = this.props.spot;
    var mapOptions = {
      center: {lat: this.spot.lat, lng: this.spot.lng},
      zoom: 14,
    };
    this.map = new google.maps.Map(map, mapOptions);
  },

  componentDidUpdate: function (oldProps) {
    this._onChange();
  },

  componentWillReceiveProps: function(newProps) {
    this.createMarkerFromSpot(newProps.spot);
  },

  _onChange: function(){
    this.createMarkerFromSpot(this.props.spot);
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
    var address = this.props.spot.address;
    var cityStateZip = address.city + ", " + address.state + " " + address.zip;
    return ( <ul id="map-address-container" className="list-unstyled">
              <li><div className="map" ref="map">Map</div></li>
              <li className="details-address-box">
                <ul className="list-unstyled">
                  <li><strong>{address.street_address}</strong></li>
                  <li><strong>{cityStateZip}</strong></li>
                  <li>{address.neighborhood}</li>
                </ul>
              </li>
            </ul>
          );
    }
});

module.exports = SpotAddressMap;
