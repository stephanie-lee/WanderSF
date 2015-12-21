var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');
var ReviewIndex = require('../reviews/reviewIndex');
var ReviewUserItem = require('../reviews/reviewUserItem.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Link = ReactRouter.Link;

var SpotDetail = React.createClass({
  // mixins: [ReactPersistentState],

  getInitialState: function() {
    return { spot: SpotStore.find(parseInt(this.props.params.spotId)),
             reviews: ReviewStore.findBySpot(parseInt(this.props.params.spotId)),
             rating: 0,
             hasReviewed: false,
             formView: true
           };
  },

  onChange: function() {
    var spotId = parseInt(this.props.params.spotId);
    var hasReviewed = false;
    var formView = true;

    this.yourReview = ReviewStore.findMySpotReview(spotId);

    if (this.yourReview) {
      hasReviewed = true;
      formView = false;
    }
    this.setState({ spot: SpotStore.find(spotId),
                    reviews: ReviewStore.findBySpot(spotId),
                    hasReviewed: hasReviewed,
                    formView: formView});
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

  toggleReviewForm: function() {
    this.setState({formView: true});
  },

  deleteYourReview: function() {
    ApiUtil.deleteSingleReview(this.yourReview);
  },

  render: function() {
    var reviewForm;

    if (!this.state.spot){
      return <div></div>;
    }

    if (this.state.hasReviewed) {
      yourReviewItem = <div>
        <h4>Your Review</h4>
        <ReviewUserItem
        yourReview={this.yourReview} /></div>;
    } else {
      yourReviewItem = <div></div>;
    }

    if (this.state.formView) {
      reviewForm = <ReviewForm
        spotId={this.props.params.spotId}
        hasReviewed={this.state.hasReviewed}
        yourReview={this.yourReview} />;
    } else {
      reviewForm = <div>
                      <button className="edit-review"
                              onClick={this.toggleReviewForm}>Edit</button>
                            <button className="delete-review"
                                    onClick={this.deleteYourReview}>Delete</button>
                    </div>;
    }
    var spot = this.state.spot;

    var rating;
    if(isNaN(ReviewStore.averageRating(spot.id))) {
        rating = "Be the first to review!";
      } else {
        rating = ReviewStore.averageRating(spot.id);
      }

    return(
      <div>
        <Link to="/" >Back to All Spots</Link>
        <div className="spot-detail-pane">
          <ul className="detail">
            <li key='name'>Name: {spot.name}</li>
            <li key='info'>Info: {spot.description}</li>
            <li key='rating'>Rating: {rating}</li>
          <br/>
          <div className="reviews">
            {yourReviewItem}
            {reviewForm}
            <br/><br/>
            <h4>Reviews</h4>
            <ReviewIndex reviews={this.state.reviews} yourReview={this.yourReview} />
          </div>
          </ul>
        </div>

        {this.props.children}

      </div>
    );
  }
});

module.exports = SpotDetail;
