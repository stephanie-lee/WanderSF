var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _taggings = [];
var _spotTaggings = [];
var TaggingStore = new Store(AppDispatcher);
var TaggingConstants = require('../constants/tagging_constants');

var resetTaggings = function(newTaggings) {
  _taggings = newTaggings;
};

module.exports = TagStore;
