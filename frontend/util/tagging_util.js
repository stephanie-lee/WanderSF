var TaggingActions = require('../actions/tagging_actions');

var TaggingUtil = {
  fetchTaggings: function(){
    $.ajax({
      url: 'api/taggings',
      success: function(taggings){
        TaggingActions.receiveAllTaggings(taggings);
      }
    });
  },

  createTagging: function(tagging){
    $.ajax({
      url: 'api/taggings',
      dataType: 'json',
      type: 'POST',
      data: {tagging: tagging},
      success: function(tagging){
        TaggingActions.receiveSingleTagging(tagging);
      }
    });
  },

  deleteTagging: function(taggingId){
    $.ajax({
      url: 'api/taggings/' + taggingId,
      dataType: 'json',
      data: {taggingId: taggingId},
      type: 'DELETE',
      success: function(tagging){
        TaggingActions.deleteSingleTagging(tagging);
      }
    });
  }
};

window.TaggingUtil = TaggingUtil;
module.exports = TaggingUtil;
