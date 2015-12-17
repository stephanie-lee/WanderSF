var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _spots = [];
var SpotStore = new Store(AppDispatcher);
var SpotConstants = require('../constants/spot_constants');

var resetSpots = function(newSpots) {
  _spots = newSpots;
};

SpotStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case SpotConstants.SPOTS_RECEIVED:
    resetSpots(payload.spots);
    SpotStore.__emitChange();
    break;
  }
}

SpotStore.all = function() {
  return _spots.slice(0);
};


window.SpotStore = SpotStore;
module.exports = SpotStore;
