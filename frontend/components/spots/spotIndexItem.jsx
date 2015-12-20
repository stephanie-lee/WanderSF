var React = require('react');
var History = require('react-router').History;
var ReviewStore = require('../../stores/review');

var SpotIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { avg: "No rating yet!"};
  },

  showDetail: function() {
    this.history.pushState(null, 'spot/' + this.props.spot.id, {});
  },

  onChange: function() {
    this.avg = ReviewStore.averageRating(this.props.spot.id);

    if(isNaN(this.avg)){
      this.avg = "No rating yet!";
    }
    this.setState({ avg: this.avg });
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
  },

  render: function() {
    // var avg = ReviewStore.averageRating(this.props.spot.id);
    // var reviews = this.state.reviews || [];
    //   totalRating = 0;
    //   reviews.forEach(function(review) {
    //       totalRating += review.rating;
    //     });
    //   var rating =  (totalRating / reviews.length);
    //   console.log(rating)

    return(
      <div>
        <li className="spot-list-item" onClick={this.showDetail} key={this.props.spot.id}>
          {this.props.spot.name}
          <br/>
          Info: {this.props.spot.description}
          <br/>
          Rating: {this.state.avg}
          <br/><br/>
        </li>
      </div>
    );
  },
});

module.exports = SpotIndexItem;
