var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
var Review = require('../reviews/Review');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');

ReviewIndex = React.createClass({
  render: function() {
    var reviews = this.props.reviews;

    return <div className="review-index">
            {reviews.map(function(review) {
            return <Review key={review.id} {...review} />;
            })}
          </div>;
  }
});

module.exports = ReviewIndex;
