var TagActions = require('../actions/tag_actions');

var TagUtil = {
  fetchTags: function(){
    $.ajax({
      url: 'api/taggings',
      success: function(tags){
        TagActions.receiveAllTags(tags);
      }
    });
  }
};

window.TagUtil = TagUtil;
module.exports = TagUtil;
