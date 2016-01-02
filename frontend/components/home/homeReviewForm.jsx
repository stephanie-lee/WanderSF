var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactRouter = require('react-router');
var ReviewUtil = require('../../util/review_util');
var SpotSearchBar = require('./spotSearch');
var History = require('react-router').History;


var HomeReviewForm = React.createClass({
  mixins:[LinkedStateMixin, History],

  componentDidMount: function() {
    $("#home-review-rating").rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                size: "sm"}); //symbol: "👣"
  },

  componentWillUnmount: function() {
    $('#home-review-rating').off('rating.change', function(event, value, caption) {
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
  },

  render: function() {
    return(
      <div>
        <form className="rating-choice" onSubmit={this.handleSubmit}>
          <div className="search-bar-stars">
            <div>
              <SpotSearchBar />
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
          <input type="submit" className="btn btn-success"/>
        </form>
      </div>
    );
  }

});

module.exports = HomeReviewForm;
