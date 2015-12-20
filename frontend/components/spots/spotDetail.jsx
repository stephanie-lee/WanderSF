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
             hasReviewed: false,
            //  yourReview : [],
             formView : true
           };
  },

  _onChange: function() {
    var spotId = parseInt(this.props.params.spotId);
    // this.setState({spot: SpotStore.find(spotId),
    //               reviews: ReviewStore.findBySpot(spotId)
    //             });

    this.yourReview = ReviewStore.findMySpotReview(spotId);
    var hasReviewed = false;
    if (this.yourReview) {
      hasReviewed = true;
    }
    this.setState({ spot: SpotStore.find(spotId),
                    reviews: ReviewStore.findBySpot(spotId),
                    hasReviewed: hasReviewed });
  },

  updateSpotlightReview: function() {

  },

  _updateReviews: function() {
    var id = parseInt(this.props.params.spotId);
    var hasReviewed = false;
    var newSpotReviews = ReviewStore.findBySpot(id);
    this.yourReview = ReviewStore.findMySpotReview(id);

    // newSpotReviews.forEach(function(review) {
    //   if (review.belongsToCurrentUser) {
    //     hasReviewed = true;
    //   }
    //   if (review !== undefined) {
    //     this.state.reviews[review] = newSpotReviews[review];
    //   }
    // }.bind(this));
    if(this.yourReview) {
      hasReviewed = true;
    }
    this.setState({ reviews: ReviewStore.findBySpot(id),
                    hasReviewed: hasReviewed });
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleSpot(parseInt(newProps.params.spotId));
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    this.reviewListener = ReviewStore.addListener(this._updateReviews);
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

    var reviews = this.state.reviews || [];
      return(
        <div>
          <Link to="/" >Back to All Spots</Link>
          <div className="spot-detail-pane">
            <ul className="detail">
              <li key='name'>Name: {this.state.spot.name}</li>
              <li key='info'>Info: {this.state.spot.description}</li>
              <li key='rating'>Rating: {this.state.rating}</li>
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
