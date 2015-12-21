var React = require('react');
var SpotStore = require('../../stores/spot');
var ReviewIndexItem = require('../reviews/reviewIndexItem');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');

ReviewIndex = React.createClass({
  render: function() {
    var reviews = this.props.reviews;
    var yourReview = this.props.yourReview;

    if (yourReview) {
      for(var idx in reviews) {
        if (reviews[idx] === yourReview) {
          reviews.splice(idx, 1);
        }
      }
    }

    if (reviews.length === 0 && !yourReview) {
      reviewIndexDisplay = <div>Be the first to review!</div>;
    } else if (reviews.length === 0){
      reviewIndexDisplay = <div>You are the first to review this spot!</div>;
    } else {
      reviewIndexDisplay = <div className="review-index">
                            {reviews.map(function(review) {
                              return <ReviewIndexItem key={review.id} {...review} />;
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
