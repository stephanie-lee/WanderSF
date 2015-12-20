var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
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

    return <div className="review-index">
            {reviews.map(function(review) {
            return <ReviewIndexItem key={review.id} {...review} />;
            })}
          </div>;
  }
});

module.exports = ReviewIndex;
