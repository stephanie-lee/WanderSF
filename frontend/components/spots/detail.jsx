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

  // getStateFromStore: function() {
  //   return { spot: SpotStore.find(parseInt(this.props.params.spotId)),
  //            reviews: ReviewStore.find(parseInt(this.props.params.spotId)),
  //            hasReviewed: false,
  //          };
  // },

  getInitialState: function() {
    return { spot: SpotStore.find(parseInt(this.props.params.spotId)),
             reviews: ReviewStore.find(parseInt(this.props.params.spotId)),
             hasReviewed: false,
           };
  },

  _onChange: function() {
    this.setState({spot: SpotStore.find(parseInt(this.props.params.spotId)),
                  reviews: ReviewStore.find(parseInt(this.props.params.spotId)),
                  hasReviewed: this.updateReview(),
                });
    this.spotRating();
    this.updateReview();
    console.log(this.state.hasReviewed);
  },

  updateReview: function() {
    debugger
    var id = this.props.params.spotId;
    var hasReviewed;
    var currentSpotReviews = this.state.reviews;
    for (var review in currentSpotReviews) {
      if (currentSpotReviews[review].belongsToCurrentUser) {
        hasReviewed = true;
        this.yourReview = currentSpotReviews[review];
      }
    }
    debugger
    this.setState({ hasReviewed: hasReviewed });
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
        hasReviewed={this.state.hasReviewed}/>;
    } else {
      reviewForm = <ReviewForm spotId={this.props.params.spotId}/>;
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
              <ReviewForm
                spotId={this.props.params.spotId}
                hasReviewed={this.state.hasReviewed}/>
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
              // {['name', 'description', 'rating'].map(function (attr) {
              //   return <li key={attr}> {attr}: {this.state.spot[attr]}</li>;
              // }.bind(this))}
