var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var ReviewActions = {
  receiveAllReviews: function(reviews){
    AppDispatcher.dispatch({
      actionType: ReviewConstants.REVIEWS_RECEIVED,
      reviews: reviews
    });
  },

  receiveSingleReview: function(review){
    AppDispatcher.dispatch({
      actionType: ReviewConstants.REVIEW_RECEIVED,
      review: review
    });
  },

  updateSingleReview: function(review){
    AppDispatcher.dispatch({
      actionType: ReviewConstants.UPDATE_REVIEW,
      review: review
    });
  },

  deleteSingleReview: function(review){
    AppDispatcher.dispatch({
      actionType: ReviewConstants.DELETE_REVIEW,
      review: review
    });
  },

  receiveRecentReviews: function(reviews){
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_RANDOM_REVIEWS,
      reviews: reviews
    });
  },

  receiveUserReviews: function(reviews){
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_USER_REVIEWS,
      reviews: reviews
    });
  }
};

module.exports = ReviewActions;
