var AppDispatcher = require('../dispatcher/dispatcher');
var SpotConstants = require('../constants/spot_constants');

var ApiActions = {
  receiveAll: function(spots){
    AppDispatcher.dispatch({
      actionType: SpotConstants.SPOTS_RECEIVED,
      spots: spots
    });
  }
};

module.exports = ApiActions;
