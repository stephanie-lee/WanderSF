var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
var Review = require('../reviews/Review');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');//*****
var ReviewIndex = require('../reviews/reviewIndex');

var Link = ReactRouter.Link;

var SpotDetail = React.createClass({
  getInitialState: function() {
    return { spot: SpotStore.find(parseInt(this.props.params.spotId)),
             reviews: ReviewStore.find(parseInt(this.props.params.spotId)),
             hasReviewed: false,
             yourReview : []
           };
  },

  _onChange: function() {
    this.setState({spot: SpotStore.find(parseInt(this.props.params.spotId)),
                  reviews: ReviewStore.find(parseInt(this.props.params.spotId)),
                  hasReviewed: this.updateReview(),
                });
    this.spotRating();
    this.updateReview();
  },

  updateReview: function() {
    var id = this.props.params.spotId;
    var hasReviewed;
    var currentSpotReviews = this.state.reviews;
    for (var review in currentSpotReviews) {
      if (currentSpotReviews[review].belongsToCurrentUser) {
        // hasReviewed = true;
        // this.state.;
        this.setState({
           hasReviewed: true,
           yourReview: currentSpotReviews[review]
         });
        break;
      }
    }
    // this.setState({ hasReviewed: hasReviewed });
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleSpot(parseInt(newProps.params.spotId));
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    this.reviewListener = ReviewStore.addListener(this._onChange); //*****
    ApiUtil.fetchSingleSpot(parseInt(this.props.params.spotId));
    ApiUtil.fetchReviews();
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    this.reviewListener.remove();
  },

  spotRating: function() {
    var rating = 0;
    if (!this.state.spot){
      return <div></div>;
    }
    var reviews = this.state.reviews;
    for (var i = 0; i < reviews.length; i++ ) {
      rating += reviews[i].rating;
    }
    rating = Math.round((rating/reviews.length) * 2 / 2);
    if (rating.isNaN) {
      rating = 0;
    }
    this.setState({ rating: rating });
  },

  render: function() {
    var reviewForm;

    if (!this.state.spot){
      return <div></div>;
    }

    if (this.state.hasReviewed) {
      reviewForm = <ReviewForm
        spotId={this.props.params.spotId}
        hasReviewed={this.state.hasReviewed}
        yourReview={this.state.yourReview} />;
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
              {reviewForm}
              <ReviewIndex reviews={this.state.reviews}/>}
            </div>
            </ul>
          </div>

          {this.props.children}

        </div>
      );
  }
});

module.exports = SpotDetail;
              // {['name', 'description', 'rating'].map(function (attr) {
              //   return <li key={attr}> {attr}: {this.state.spot[attr]}</li>;
              // }.bind(this))}
