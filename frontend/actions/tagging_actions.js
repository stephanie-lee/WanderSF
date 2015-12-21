var AppDispatcher = require('../dispatcher/dispatcher');
var TaggingConstants = require('../constants/tagging_constants');

var TaggingActions = {
  receiveAllTaggings: function(taggings){
    AppDispatcher.dispatch({
      actionType: TaggingConstants.TAGGINGS_RECEIVED,
      taggings: taggings
    });
  },

  receiveSingleTagging: function(tagging){
    AppDispatcher.dispatch({
      actionType: TaggingConstants.TAGGING_RECEIVED,
      tagging: tagging
    });
  },
};

module.exports = TaggingActions;
