var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactRouter = require('react-router');
var ReviewUtil = require('../../util/review_util');
var SpotUtil = require('../../util/spot_util');
var SpotStore = require('../../stores/spot');
var History = require('react-router').History;


var HomeReviewForm = React.createClass({
  mixins:[LinkedStateMixin, History],

  getInitialState: function() {
    return {searchString: "",
            querySpots: [],
            spot_id: "",
            rating: "",
            review: ""
           };
  },

  handleChange: function(e){
    this.setState({searchString: e.target.value});
    if (!!e.target.value) {
      SpotUtil.fetchQuerySpots(e.target.value);
    }
  },

  handleQuery: function(){
    this.setState({querySpots: SpotStore.all()});
    this.resetAutocomplete();
  },

  handleNameClick: function(e) {
    this.setState({searchString: e.target.innerHTML});
  },

  loadAutocomplete: function() {
    var _this = this;
    $(this.refs.searchInput).autocomplete({
      source: _this.state.querySpots
    });
  },

  resetAutocomplete: function() {
    var _this = this;
    var spots = this.state.querySpots.map(function(spot){
      return {id: spot.id, value: spot.name};
    });
    $(this.refs.searchInput).autocomplete("option", {
      source: spots,
      select: function(event, ui) {
        $("#txtAllowSearch").val(ui.item.value); // display the selected text
        $("#txtAllowSearchID").val(ui.item.id); // save selected id to hidden input
      }
    });
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this.handleQuery);
    this.loadAutocomplete();
    $("#home-review-rating").rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                size: "sm"}); //symbol: "👣"
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    $('#home-review-rating').off('rating.change', function(event, value, caption) {
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var currentReview = { spot_id: parseInt(event.target[3].value),
                          rating: parseInt(event.target[1].value),
                          comment: event.target[2].value }

    if(!currentReview.spot_id || !currentReview.rating || !currentReview.comment) {
      console.log("nope")
    }

    var userSpots = this.props.userSpots
    if (userSpots.length > 0) {
      for( review in userSpots ) {
        if(userSpots[review].spot_id === currentReview.spot_id) { //user reviewed before
          var conf = confirm("You've already reviewed this spot. Do you want to overwrite your past review?")
            if (conf === true) {
              currentReview.id = userSpots[review].review_id
              ReviewUtil.updateSingleReview(currentReview);
              break;
            }
          }
        }
    } else {
      ReviewUtil.createReview(currentReview);
    }
  },

  render: function() {
    return(
      <div>
        <form className="rating-choice" onSubmit={this.handleSubmit}>
          <div className="search-bar-stars">
            <div>
              <input type="text"
                     id="txtAllowSearch"
                     className="form-control spot-search-box"
                     ref="searchInput"
                     onChange={this.handleChange}
                     placeholder="Where did you wander?" />
              <div className="no-spot-suggest">
                Can't find your spot? Suggest one <a>here!</a>
              </div>
            </div>
            <input id="home-review-rating"
                   className="rating side-by-side"
                   type="number"
                   min='1'
                   max='5'/>
            <h7>Select a rating</h7>
          </div>
          <div className="review-text-box">
            <textarea cols='60'rows='4'></textarea>
          </div>
          <input type="hidden" id="txtAllowSearchID"/>
          <input type="submit" className="btn btn-success"/>
        </form>
      </div>
    );
  }

});

module.exports = HomeReviewForm;
