var React = require('react');
var SpotStore = require('../../stores/spot');
var ReviewIndexItem = require('../reviews/reviewIndexItem');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');

ReviewIndex = React.createClass({
  getInitialState: function() {
    return ({ allReviews: [] });
  },

  componentDidMount: function() {
    reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchReviews();
  },

  componentWillUnmount: function() {
    reviewListener.remove();
  },

  onChange: function() {
    this.setState({ allReviews: ReviewStore.all() });
  },

  render: function() {
    var reviews = this.props.reviews;
    var yourReview = this.props.userReview;

    function userReviewCount(userId) {
      allReviews = ReviewStore.all();
      count = 0;
      for( var review in allReviews ) {
        if (allReviews[review].user.id === userId) {
          count += 1;
        }
      }
      return count;
    }
    if (yourReview) {
      var idx;
      for (var review in reviews) {
        if (reviews[review].belongsToCurrentUser === true) {
          idx = review;
        }
        break;
      }
      reviews.splice(idx, 1);
    }

    if (reviews.length === 0 && !yourReview) {
      reviewIndexDisplay = <div>Be the first to review!</div>;
    } else if (reviews.length === 0){
      reviewIndexDisplay = <div>You are the first to review this spot!</div>;
    } else {
      reviewIndexDisplay = <div className="review-index">
                            {reviews.map(function(review) {
                              reviewCount = userReviewCount(review.user.id);
                              return <ReviewIndexItem key={review.id} {...review} reviewCount={reviewCount} />;
                            })}
                          </div>;
    }

    return (
      <div className='review-index-pane'>
        {reviewIndexDisplay}
      </div>
    );
  }
});

module.exports = ReviewIndex;
