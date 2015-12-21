var TagActions = require('../actions/tag_actions');

var TagUtil = {
  fetchTags: function(){
    $.ajax({
      url: 'api/taggings',
      success: function(tags){
        TagActions.receiveAllTags(tags);
      }
    });
  },

  createTag: function(tag){
    $.ajax({
      url: 'api/taggings',
      dataType: 'json',
      type: 'POST',
      data: {tag: tag},
      success: function(tag){
        TagActions.receiveSingleTag(tag);
      }
    });
  },
};

window.TagUtil = TagUtil;
module.exports = TagUtil;
