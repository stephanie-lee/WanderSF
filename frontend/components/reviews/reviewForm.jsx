var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactRouter = require('react-router');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;


var ReviewForm = React.createClass({
  mixins:[LinkedStateMixin, History],

  getInitialState: function () {
    if(this.props.hasReviewed) {
      var yourReview = this.props.yourReview;
      return ({ id:yourReview.rating,
                rating: yourReview.rating,
                comment: yourReview.comment });
    } else {
      return ({ rating: "3",
                comment: "",
                spot_id: this.props.spotId });
    }
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.yourReview) {
      var yourReview = newProps.yourReview;
      this.setState({ id: yourReview.id,
                      rating: yourReview.rating,
                      comment: yourReview.comment
      });
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
      ApiUtil.updateSingleReview(review);
    } else {
      ApiUtil.createReview(review);
    }
  },

  render: function() {
    return(
      <div className="review-form">
        <form onSubmit={this.handleSubmit}>
          <input type="number" min='1' max='5' valueLink={this.linkState('rating')}/>
          <br/><br/>
          <textarea cols='50'
                    rows='3'
                    valueLink={this.linkState('comment')}></textarea>
          <br/>
          <input type="submit" />
        </form>
      </div>
    );
  }

});

module.exports = ReviewForm;

// <button onClick={/*this.handleCancel*/}>Cancel</button>
