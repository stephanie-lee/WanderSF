var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchSpots: function(){
    $.ajax({
      url: 'api/spots',
      success: function(spots){
        ApiActions.receiveAll(spots);
      }
    });
  },
  fetchSingleSpot: function(id){
    $.ajax({
      url: 'api/spots/' + id,
      success: function (spot) {
        ApiActions.receiveSingleSpot(spot);
      }
    });
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
