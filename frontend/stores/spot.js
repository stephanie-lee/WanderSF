var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _spots = [];
var _currentSpot = null;
var SpotStore = new Store(AppDispatcher);
var SpotConstants = require('../constants/spot_constants');

var resetSpots = function(newSpots) {
  _spots = newSpots;
};

var updateSpot = function(newSpot) {
  _currentSpot = newSpot;
};

var resetSpot = function(newSpot) {
  _currentSpot = newSpot;
};

SpotStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SpotConstants.SPOTS_RECEIVED:
      resetSpots(payload.spots);
      SpotStore.__emitChange();
      break;
    case SpotConstants.SPOT_UPDATED:
      updateSpot(payload.spot);
      SpotStore.__emitChange();
      break;
    case SpotConstants.SPOT_RECEIVED:
      resetSpot(payload.spot);
      SpotStore.__emitChange();
  }
};

SpotStore.find = function(id) {
  for (i = 0; i < _spots.length; i++) {
    if (_spots[i].id === id) {
      return _spots[i];
    }
  }
};

SpotStore.all = function() {
  return _spots.slice(0);
};

SpotStore.current = function() {
  return _currentSpot;
};

window.SpotStore = SpotStore;
module.exports = SpotStore;
