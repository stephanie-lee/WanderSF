var AppDispatcher = require('../dispatcher/dispatcher');
var TagConstants = require('../constants/tag_constants');

var TagActions = {
  receiveAllTags: function(tags){
    AppDispatcher.dispatch({
      actionType: TagConstants.TAGS_RECEIVED,
      tags: tags
    });
  },

  receiveSingleTag: function(tag){
    AppDispatcher.dispatch({
      actionType: TagConstants.TAG_RECEIVED,
      tag: tag
    });
  },
};

module.exports = TagActions;
