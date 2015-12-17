var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchSpots: function(){
    $.ajax({
      url: 'api/spots',
      success: function(spots){
        ApiActions.receiveAll(spots);
      }
    });
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
