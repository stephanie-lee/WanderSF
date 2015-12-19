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
    this.setState({spot: SpotStore.find(parseInt(this.props.params.spotId)),
                  reviews: ReviewStore.findBySpot(parseInt(this.props.params.spotId))
                });
    // this.spotRating();
    // this.updateReview();
  },

  updateSpotlightReview: function() {

  },

  _updateReviews: function() {
    var id = parseInt(this.props.params.spotId);
    var hasReviewed;
    var allYourReviews = ReviewStore.allMyReviews();
    this.yourReview = "fake";

    allYourReviews.forEach(function(review) {
      if (review.spot_id === id) {
        console.log('true')
        this.yourReview = review;
        // console.log(this)
      }
      // console.log(this)
    }.bind(this));

    console.log(this.yourReview);
    if (this.yourReview) {
      hasReviewed = true;
    } else {
      hasReviewed = false;
    }
    this.setState({ reviews: this.state.reviews, hasReviewed: hasReviewed});
    // var hasReviewed;
    // var currentSpotReviews = this.state.reviews;
    // var yourReview = { rating: "3", comment: ""};
    // for (var review in currentSpotReviews) {
    //   if (currentSpotReviews[review].belongsToCurrentUser) {
    //     yourReview = currentSpotReviews[review];
    //     this.setState({
    //        hasReviewed: true,
    //        yourReview: yourReview
    //      });
    //     break;
    //   }
    // }
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
                />;
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
