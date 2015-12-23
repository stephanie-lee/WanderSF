var SpotActions = require('../actions/spot_actions.js');

var SpotUtil = {
  fetchSpots: function(){
    $.ajax({
      url: 'api/spots',
      success: function(spots){
        SpotActions.receiveAllSpots(spots);
      }
    });
  },

  updateSingleSpot: function(id){
    $.ajax({
      url: 'api/spots/' + id,
      success: function (spot) {
        SpotActions.updateSingleSpot(spot); //check this
      }
    });
  },

  fetchSingleSpot: function(id){
    $.ajax({
      url: 'api/spots/' + id,
      success: function (spot) {
        SpotActions.receiveSingleSpot(spot); //check this
      }
    });
  },

  fetchSpotsByQuery: function(string){
    $.ajax({
      url: 'api/spots/',
      data: {search: string},
      success: function(spots) {
        SpotActions.receiveAllSpots(spots);
      }
    });
  }
};

module.exports = SpotUtil;
