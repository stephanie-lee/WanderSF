var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactRouter = require('react-router');
var ReviewUtil = require('../../util/review_util');
var History = require('react-router').History;


var ReviewForm = React.createClass({
  mixins:[LinkedStateMixin, History],

  getInitialState: function () {
    if(this.props.hasReviewed) {
      var yourReview = this.props.yourReview;
      return ({ id: yourReview.rating,
                rating: yourReview.rating,
                comment: yourReview.comment });
    } else {
      return ({ id: null,
                rating: "3",
                comment: "",
                spot_id: this.props.spotId });
    }
  },

  componentDidMount: function() {
    $("#review-rating").rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                size: "sm"}); //symbol: "👣"
    $("#review-rating").rating('update', this.state.rating);
    $('#review-rating').on('rating.change', function(event, value, caption) {
    this.setState({rating: value});
  }.bind(this));
  },

  componentWillUnmount: function() {
    $('#review-rating').off('rating.change', function(event, value, caption) {
    this.setState({rating: value});
    });
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.yourReview) {
      var yourReview = newProps.yourReview;
      this.setState({ id: yourReview.id,
                      rating: yourReview.rating,
                      comment: yourReview.comment
      });
    } else {
      this.setState({ id: null,
                      rating: "3",
                      comment: "",
                      spot_id: this.props.spotId});
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var review = $.extend(
      {},
      this.state
    );

    if(this.props.hasReviewed) {
      var reviewId = this.props.yourReview.id;
      review.id = reviewId;
      ReviewUtil.updateSingleReview(review);
    } else {
      var stateKeys = Object.keys(this.state);
      var newReview = {};
      for ( var i = 1; i < stateKeys.length; i++ ) {
        newReview[ stateKeys[i] ] = this.state[ stateKeys[i] ];
      }
      ReviewUtil.createReview(newReview);
    }
  },

  render: function() {
    return(
      <div className="review-form">
        <form className="rating-choice" onSubmit={this.handleSubmit}>
          <input id="review-rating"
                 className="rating"
                 type="number"
                 min='1'
                 max='5'
                 valueLink={this.linkState('rating')}/>
          <h7>Select a rating</h7>
          <br/><br/>
          <textarea autoFocus
                    cols='50'
                    rows='3'
                    valueLink={this.linkState('comment')}>
</textarea>
          <br/>
          <input type="submit" />
        </form>
      </div>
    );
  }

});

module.exports = ReviewForm;

// <button onClick={/*this.handleCancel*/}>Cancel</button>
