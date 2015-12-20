var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchSpots: function(){
    $.ajax({
      url: 'api/spots',
      success: function(spots){
        ApiActions.receiveAllSpots(spots);
      }
    });
  },

  fetchSingleSpot: function(id){
    $.ajax({
      url: 'api/spots/' + id,
      success: function (spot) {
        ApiActions.receiveSingleSpot([spot]); //check this
      }
    });
  },

  createReview: function(review){
    $.ajax({
      url: '/api/reviews',
      dataType: 'json',
      type: 'POST',
      data: {review: review},
      success: function(review) {
        ApiActions.receiveSingleReview(review);
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
        ApiActions.updateSingleReview(reviewData);
      }
    });
  },

  fetchReviews: function(){
    $.ajax({
      url: 'api/reviews',
      success: function(reviews){
        ApiActions.receiveAllReviews(reviews);
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
        ApiActions.deleteSingleReview(review);
      }
    });
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
