var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _tags = [];
var TagStore = new Store(AppDispatcher);
var TagConstants = require('../constants/tag_constants');

var resetTags = function(newTags) {
  _tags = newTags;
};

var addTag = function(newTag) {
  _tags.push(newTag);
};

TagStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TagConstants.TAGS_RECEIVED:
      resetTags(payload.tags);
      TagStore.__emitChange();
      break;
    case TagConstants.TAG_RECEIVED:
      addTag(payload.tag);
      TagStore.__emitChange();
      break;
  }
};

TagStore.find = function(tagName) {
  for(var tag in _tags) {
    if(tag.name === tagName) {
      return (tag.id);
    }
  }
};

TagStore.all = function() {
  return _tags.slice(0);
};

window.TagStore = TagStore;
module.exports = TagStore;
