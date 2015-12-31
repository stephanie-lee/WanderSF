var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _reviews = [];
var _myReviews = [];
var currentReview = null;
var ReviewStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/review_constants');

var resetReviews = function(newReviews) {
  _reviews = newReviews;
  findMyReviews();
};

var addReview = function(newReview) {
  _reviews.push(newReview);
  findMyReviews();
};

var updateReview = function(edittedReview) {
  var targetId = edittedReview.id;
  _reviews.forEach(function(review, idx){
    if (review.id === targetId) {
      _reviews[idx] = edittedReview;
    }
  });
  findMyReviews();
};

var deleteReview = function(deletedReview) {
  var targetId = deletedReview.id;
  var index;
  _reviews.forEach(function(review, idx){
    if (review.id === targetId) {
      var index = idx;
    }
  });
  _reviews = _reviews.splice(index, 1);
  findMyReviews();
};

var findMyReviews = function() {
  var myReviews = [];
  _reviews.forEach(function(review) {
    if(review.belongsToCurrentUser) {
      myReviews.push(review);
    }
  });
  _myReviews = myReviews;
};

var findUserReviews = function(userId) {
  var userReviews = [];
  _reviews.forEach(function(review) {
    if(review.user_id === userId) {
      userReviews.push(review);
    }
  });

  return userReviews;
};

var findMySpotReview = function(spotId) {
  for( var i = 0; i < _myReviews.length; i++ ) {
    if (_myReviews[i].spot_id === spotId) {
      currentReview = _myReviews[i];
      break;
    }
  }
  return currentReview;
};

ReviewStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ReviewConstants.REVIEWS_RECEIVED:
      resetReviews(payload.reviews);
      ReviewStore.__emitChange();
      break;
    case ReviewConstants.REVIEW_RECEIVED:
      addReview(payload.review);
      ReviewStore.__emitChange();
      break;
    case ReviewConstants.UPDATE_REVIEW:
      updateReview(payload.review);
      ReviewStore.__emitChange();
      break;
    case ReviewConstants.DELETE_REVIEW:
      deleteReview(payload.review);
      ReviewStore.__emitChange();
  }
};

ReviewStore.findBySpot = function(spotId) {
  spotReviews = [];
  if (_reviews.length === 0) {
    return [];
  }

  _reviews.forEach(function(review){
    if (review.spot_id === spotId) {
      spotReviews.push(review); 
    }
  });
  return spotReviews;
};

ReviewStore.findMySpotReview = function(spotId) {
  currentReview = undefined;
  for( var i = 0; i < _myReviews.length; i++ ) {
    if (_myReviews[i].spot_id === spotId) {
      currentReview = _myReviews[i];
      break;
    }
  }
  return currentReview;
};

ReviewStore.all = function() {
  return _reviews.slice(0);
};

ReviewStore.allMyReviews = function() {
  return _myReviews.slice(0);
};

ReviewStore.averageRating = function(spotId) {
  spotReviews = this.findBySpot(spotId);
  totalRatings = 0;
  spotReviews.forEach(function(review) {
    totalRatings += review.rating;
  });
  return (Math.round((totalRatings / spotReviews.length) * 2 ) / 2);
};

window.ReviewStore = ReviewStore;
module.exports = ReviewStore;
