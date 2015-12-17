var AppDispatcher = require('../dispatcher/dispatcher');
var SpotConstants = require('../constants/spot_constants');
var ReviewConstants = require('../constants/review_constants');

var ApiActions = {
  receiveAllSpots: function(spots){
    AppDispatcher.dispatch({
      actionType: SpotConstants.SPOTS_RECEIVED,
      spots: spots
    });
  },

  receiveSingleSpot: function(spot){
    AppDispatcher.dispatch({
      actionType: SpotConstants.SPOT_RECEIVED,
      spot: spot
    });
  },

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
};

module.exports = ApiActions;
