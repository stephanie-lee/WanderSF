var TagActions = require('../actions/tag_actions');

var TagUtil = {
  fetchTags: function(){
    $.ajax({
      url: 'api/tags',
      success: function(tags){
        TagActions.receiveAllTags(tags);
      }
    });
  },

  createTag: function(tag){
    $.ajax({
      url: 'api/tags',
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
