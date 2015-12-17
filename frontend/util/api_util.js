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
      success: function(reviews) {
        ApiActions.receiveAllReviews(review);
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
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
