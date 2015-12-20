var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');//*****
var ReviewIndex = require('../reviews/reviewIndex');

var Link = ReactRouter.Link;

var SpotDetail = React.createClass({
  getInitialState: function() {
    return { spot: SpotStore.find(parseInt(this.props.params.spotId)),
             reviews: ReviewStore.findBySpot(parseInt(this.props.params.spotId)),
             rating: 0,
             hasReviewed: false,
             formView : true
           };
  },

  onChange: function() {
    var spotId = parseInt(this.props.params.spotId);
    var hasReviewed = false;

    this.yourReview = ReviewStore.findMySpotReview(spotId);

    if (this.yourReview) {
      hasReviewed = true;
    }
    this.setState({ spot: SpotStore.find(spotId),
                    reviews: ReviewStore.findBySpot(spotId),
                    hasReviewed: hasReviewed });
  },



  updateSpotlightReview: function() {

  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleSpot(parseInt(newProps.params.spotId));
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this.onChange);
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ApiUtil.fetchSingleSpot(parseInt(this.props.params.spotId)); //need this?
    ApiUtil.fetchReviews();
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    this.reviewListener.remove();
  },

  // spotRating: function() {
  //   var rating = 0;
  //   if (!this.state.spot){
  //     return <div></div>;
  //   }
  //   var reviews = this.state.reviews;
  //   for (var i = 0; i < reviews.length; i++ ) {
  //     rating += reviews[i].rating;
  //   }
  //   rating = Math.round((rating/reviews.length) * 2 / 2);
  //   if (rating.isNaN) {
  //     rating = 0;
  //   }
  //   this.setState({ rating: rating });
  // },

  render: function() {
    var reviewForm;

    if (!this.state.spot){
      return <div></div>;
    }

      return(
        <div>
          <Link to="/" >Back to All Spots</Link>
          <div className="spot-detail-pane">
            <ul className="detail">
              <li key='name'>Name: {this.state.spot.name}</li>
              <li key='info'>Info: {this.state.spot.description}</li>
              <li key='rating'>Rating: </li>
            <br/>
            <div className="reviews">
              {"You Reviewed: " + this.state.hasReviewed}
              <ReviewForm
                spotId={this.props.params.spotId}
                hasReviewed={this.state.hasReviewed}
                yourReview={this.yourReview}
                />
              <ReviewIndex reviews={this.state.reviews}/>
            </div>
            </ul>
          </div>

          {this.props.children}

        </div>
      );
  }
});

module.exports = SpotDetail;
