var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactRouter = require('react-router');
var ReviewUtil = require('../../util/review_util');
var SpotUtil = require('../../util/spot_util');
var SpotStore = require('../../stores/spot');
var History = require('react-router').History;
var Message = require('react-message');


var HomeReviewForm = React.createClass({
  mixins:[LinkedStateMixin, History],

  getInitialState: function() {
    return {searchString: "",
            querySpots: [],
            spot_id: "",
            rating: "",
            review: "",
            error: null,
            info: ""
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
    var currentReview = { spot_id: parseInt(event.target[2].value),
                          rating: parseInt(event.target[1].value),
                          comment: event.target[3].value }
    if(isNaN(currentReview.spot_id) || currentReview.spot_id === 0) {
      var error = ["**Please select an existing spot**"]
      this.setState({error: error});
    } else if (!currentReview.rating || !currentReview.comment) {
      var error = ["**All fields must be filled out.**"]
      this.setState({error: error});
    } else {
      that = this
      this.setState({error: null});
      var userSpots = this.props.userSpots
      if (userSpots.length > 0) {
        var exists;
        for( review in userSpots ) {
          if(userSpots[review].spot_id === currentReview.spot_id) { //user reviewed before
            var conf = confirm("You've already reviewed this spot. Do you want to overwrite your past review?")
            if (conf === true) {
              currentReview.id = userSpots[review].review_id
              ReviewUtil.updateSingleReview(currentReview);
              exists = true
              this.refs.searchInput.blur();
              console.log(this)
              this.setState({info: ["Your review has been updated!"]})
              setTimeout(function(){that.setState({info: null})}, 5000)
            }
          }
        }
        if (!exists) {
          ReviewUtil.createReview(currentReview);
          this.refs.searchInput.blur();

          this.setState({info: ["Your review has been created!"]})
          setTimeout(function(){that.setState({info: null})}, 7000)
        }
      } else {
        ReviewUtil.createReview(currentReview);
        this.refs.searchInput.blur();

        this.setState({info: ["Your review has been created!"]})
        setTimeout(function(){that.setState({info: null})}, 7000)
      }
    }
  },

  render: function() {
    if (this.state.error) {
      currentError = <Message type="error" messages={this.state.error} />
    } else {
      currentError = <div></div>
    }

    if (this.state.info) {
      successMessage = <Message type="info" messages={this.state.info} />
    } else {
      successMessage = <div></div>
    }

    return(
      <div>
        <form className="rating-choice" onSubmit={this.handleSubmit} name="form" noValidate>
          <div>{currentError}</div>
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
          <input type="hidden" id="txtAllowSearchID"/>
          <textarea cols='70'rows='4'></textarea>
          <input type="submit" className="btn btn-success"/>
          {successMessage}
        </form>
      </div>
    );
  }

});

module.exports = HomeReviewForm;
