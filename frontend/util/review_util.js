var ReviewActions = require('../actions/review_actions');

var ReviewUtil = {
  createReview: function(review){
    $.ajax({
      url: '/api/reviews',
      dataType: 'json',
      type: 'POST',
      data: {review: review},
      success: function(review) {
        ReviewActions.receiveSingleReview(review);
      }
    });
  },

  updateSingleReview: function(review){
    $.ajax({
      url: 'api/reviews/' + review.id,
      type: "PATCH",
      dataType: "json",
      data: {review: review},
      success: function(reviewData) {
        ReviewActions.updateSingleReview(reviewData);
      }
    });
  },

  fetchReviews: function(){
    $.ajax({
      url: 'api/reviews',
      success: function(reviews){
        ReviewActions.receiveAllReviews(reviews);
      }
    });
  },

  deleteSingleReview: function(review){
    $.ajax({
      url: 'api/reviews/' + review.id,
      data: {review: review},
      type: "DELETE",
      dataType: "json",
      success: function(review){
        ReviewActions.deleteSingleReview(review);
      }
    });
  }
};

module.exports = ReviewUtil;
