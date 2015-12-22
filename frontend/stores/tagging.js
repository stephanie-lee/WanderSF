var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _taggings = [];
var _spotTaggings = [];
var TaggingStore = new Store(AppDispatcher);
var TaggingConstants = require('../constants/tagging_constants');

var resetTaggings = function(newTaggings) {
  _taggings = newTaggings;
};

var addTagging = function(newTagging) {
  _taggings.push(newTagging);
  console.log(_taggings);
};

var deleteTagging = function(deletedTagging) {
  var tempTaggings;
  for(var i = 0; i < _taggings.length; i++ ) {
    if(_taggings[i].id === deletedTagging.id) {
      _taggings.splice(i, 1);
      break;
    }
  }
};

TaggingStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TaggingConstants.TAGGINGS_RECEIVED:
      resetTaggings(payload.taggings);
      TaggingStore.__emitChange();
      break;
    case TaggingConstants.TAGGING_RECEIVED:
      addTagging(payload.tagging);
      TaggingStore.__emitChange();
      break;
    case TaggingConstants.DELETE_TAGGING:
      deleteTagging(payload.tagging);
      TaggingStore.__emitChange();
      break;
  }
};

TaggingStore.findBySpot = function(spotId) {
  _spotTaggings = [];
  if (_taggings.length === 0) {
    return [];
  }

  _taggings.forEach(function(tagging){
    if (tagging.spot_id === spotId) {
      _spotTaggings.push(tagging);
    }
  });
  return _spotTaggings;
};

TaggingStore.all = function() {
  return _taggings.slice(0);
};

window.TaggingStore = TaggingStore;
module.exports = TaggingStore;
