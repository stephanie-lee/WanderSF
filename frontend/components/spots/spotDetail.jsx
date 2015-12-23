var React = require('react');
var SpotStore = require('../../stores/spot');
var ReviewUtil = require('../../util/review_util');
var SpotUtil = require('../../util/spot_util');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');
var ReviewIndex = require('../reviews/reviewIndex');
var ReviewUserItem = require('../reviews/reviewUserItem.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var TaggingUtil = require('../../util/tagging_util');
var TagStore = require('../../stores/tag');

var Link = ReactRouter.Link;

var SpotDetail = React.createClass({
  getInitialState: function() {
    return { spot: null,
             reviews: ReviewStore.findBySpot(parseInt(this.props.params.spotId)),
             rating: 0,
             hasReviewed: false,
             formView: true,
             taggingFormView: false,
             taggingFormString: ""
           };
  },

  onChange: function() {
    var spotId = parseInt(this.props.params.spotId);
    var hasReviewed = false;
    var formView = true;

    this.yourReview = ReviewStore.findMySpotReview(spotId);
    var current_spot;
    if (SpotStore.current()){
      current_spot = SpotStore.current();
    }

    if (this.yourReview) {
      hasReviewed = true;
      formView = false;
    }
    this.setState({ spot: current_spot,
                    reviews: ReviewStore.findBySpot(spotId),
                    hasReviewed: hasReviewed,
                    formView: formView
                  });
  },
//
  componentWillReceiveProps: function (newProps) {
    SpotUtil.fetchSingleSpot(parseInt(newProps.params.spotId));
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this.onChange);
    this.reviewListener = ReviewStore.addListener(this.onChange);
    SpotUtil.fetchSingleSpot(parseInt(this.props.params.spotId));
    ReviewUtil.fetchReviews();
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    this.reviewListener.remove();
  },

  toggleReviewForm: function() {
    this.setState({formView: true});
  },

  deleteYourReview: function() {
    ReviewUtil.deleteSingleReview(this.yourReview);
  },

  toggleTaggingForm: function() {
    this.setState({taggingFormView: true});
  },

  createTagging: function(e) {
    if (e.which == 13) {
      var spotId = this.state.spot.id;
      var tagString = e.target.value;
      var spotTaggings = this.state.spot.taggings;
      var exist = false;

      spotTaggings.forEach(function(spotTagging){
        if(spotTagging.name === tagString){
          exist = true;
          return;
        }
      });
      if (!exist){
        TaggingUtil.createTagging({spot_id: spotId, name: tagString});
      }
      this.setState({taggingFormView: false});
    }
  },

  removeTagging: function(e) {
    TaggingUtil.deleteTagging(e.target.id);
  },

  render: function() {
    var reviewForm;

    if (!this.state.spot){
      return <div></div>;
    }

    if (this.state.hasReviewed) {
      yourReviewItem = <div>
        <h4>Your Review</h4>
        <ReviewUserItem
        yourReview={this.yourReview} /></div>;
    } else {
      yourReviewItem = <div></div>;
    }

    if (this.state.formView) {
      reviewForm = <ReviewForm
        spotId={this.props.params.spotId}
        hasReviewed={this.state.hasReviewed}
        yourReview={this.yourReview} />;
    } else {
      reviewForm = <div>
                      <button className="edit-review"
                              onClick={this.toggleReviewForm}>Edit</button>
                      <button className="delete-review"
                              onClick={this.deleteYourReview}>Delete</button>
                   </div>;
    }

    var spot = this.state.spot;
    var rating;
    if(isNaN(ReviewStore.averageRating(spot.id))) {
        rating = "Be the first to review!";
      } else {
        rating = ReviewStore.averageRating(spot.id);
      }
    var taggings = this.state.spot.taggings;
    if(taggings.length === 0) {
      taggingList = <li>No tags yet!</li>;
    } else {
      taggingList = taggings.map(function(tagging, idx) {
        return(<li key={tagging.tag_id}>
                  <Link to="#">{tagging.name}</Link>
                  <span id={tagging.id}
                        tagId={tagging.tag_id}
                        className="glyphicon glyphicon-remove-circle"
                        onClick={this.removeTagging}></span>
                </li>);
      }.bind(this));
    }

    if(this.state.taggingFormView) {
      taggingForm = <input autoFocus
                       type="text"
                       id="tag-form"
                       placeholder="tag name"
                       value={this.taggingFormString}
                       onKeyDown={this.createTagging}>
                </input>;
    } else {
      taggingForm = <div></div>;
    }

    return(
      <div>
        <Link to="/" >Back to All Spots</Link>
        <div className="spot-detail-pane">
          <ul className="detail">
            <li key='name'>Name: {spot.name}</li>
            <li key='rating'>Rating: {rating}</li>
            <li key='info'>Info: {spot.description}</li>
            <li>Tags:
              <ul className="list-unstyled list-inline">
                {taggingList}
              </ul>
              <button type="submit"
                      className="btn btn-xs btn-secondary"
                      onClick={this.toggleTaggingForm}>
                      Add Tag <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>
              </button>
              {taggingForm}
            </li>
          <br/>
          <div className="reviews">
            {yourReviewItem}
            {reviewForm}
            <br/><br/>
            <h4>Reviews</h4>
            <ReviewIndex reviews={this.state.reviews} yourReview={this.yourReview} />
          </div>
          </ul>
        </div>

        {this.props.children}

      </div>
    );
  }
});

module.exports = SpotDetail;
