var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var UserActions = {
  receiveCurrentUser: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  },
  // receiveSpotReviewers: function(users){
  //   AppDispatcher.dispatch({
  //     actionType: UserConstants.SPOT_REVIEWERS_RECEIVED,
  //     users: users
  //   });
  // },
};

module.exports = UserActions;
