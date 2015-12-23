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

  fetchQueryTags: function(query){
    $.ajax({
      url: 'api/tags',
      dataType: 'json',
      data: {query: query},
      success: function(tags){
        TagActions.receiveQueryTags(tags);
      }
    });
  }
};

window.TagUtil = TagUtil;
module.exports = TagUtil;
