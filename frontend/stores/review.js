var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _reviews = [];
var ReviewStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/review_constants');

var resetReviews = function(newReviews) {
  _reviews = newReviews;
};

var addReview = function(newReview) {
  _reviews.push(newReview);
};

var updateReview = function(edittedReview) {
  targetId = edittedReview.id;

  _reviews.forEach(function(review, idx){
    if (review.id === targetId) {
      _reviews.splice(idx, 1);
      _reviews.push(edittedReview);
    }
  });
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
  }
};

ReviewStore.find = function(spotId) {
  spotReviews = [];
  if (_reviews.length === 0) {
    return [];
  }

  _reviews.forEach(function(review){
    if (review.spot_id === spotId) {
      spotReviews.push(review); //////
    }
  });
  return spotReviews;
};

ReviewStore.all = function() {
  return _reviews.slice(0);
};

window.ReviewStore = ReviewStore;
module.exports = ReviewStore;
