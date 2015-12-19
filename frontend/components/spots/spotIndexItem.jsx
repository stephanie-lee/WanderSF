var React = require('react');
var History = require('react-router').History;
var ReviewStore = require('../../stores/review');

var SpotIndexItem = React.createClass({
  mixins: [History],

  showDetail: function() {
    this.history.pushState(null, 'spot/' + this.props.spot.id, {});
  },

  render: function() {
    // var avg = ReviewStore.averageRating(this.props.spot.id);

    return(
      <div>
        <li className="spot-list-item" onClick={this.showDetail} key={this.props.spot.id}>
          {this.props.spot.name}
          <br/>
          Info: {this.props.spot.description}
          <br/>
          Rating: {this.props.spot.rating}
          <br/><br/>
        </li>
      </div>
    );
  },
});

module.exports = SpotIndexItem;
