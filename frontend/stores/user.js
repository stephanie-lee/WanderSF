var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var currentUser = [];
// var currentSpotReviewers = [];
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/user_constants');

var resetUser = function(newUser) {
  currentUser = [];
  currentUser.push(newUser);
};

// var resetSpotReviewers = function(newUsers) {
//   currentSpotReviewers = [];
//   currentSpotReviewers.push(newUsers);
// };

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case UserConstants.USER_RECEIVED:
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.SPOT_REVIEWERS_RECEIVED:
      resetSpotReviewers(payload.users);
      UserStore.__emitChange();
      break;
  }
};

UserStore.user = function() {
  return currentUser.slice(0);
};

// UserStore.findBySpotReviews = function(spotId) {
//  return currentSpotReviewers.slice(0);
// };

module.exports = UserStore;
