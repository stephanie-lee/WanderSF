var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _tags = [];
var _spotTags = [];
var TagStore = new Store(AppDispatcher);
var TagConstants = require('../constants/tag_constants');

var resetTags = function(newTags) {
  _tags = newTags;
};

TagStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TagConstants.TAGS_RECEIVED:
      resetTags(payload.tags);
      TagStore.__emitChange();
      break;
  }
};

TagStore.findBySpot = function(spotId) {
  _spotTags = [];
  if (_tags.length === 0) {
    return [];
  }

  _tags.forEach(function(tag){
    if (tag.spot_id === spotId) {
      _spotTags.push(tag);
    }
  });
  return _spotTags;
};

TagStore.all = function() {
  return _tags.slice(0);
};

window.TagStore = TagStore;
module.exports = TagStore;
