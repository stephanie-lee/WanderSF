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
var SpotDetailRating = require('./spotDetailRating');
var SpotAddressMap = require('./spotMiniComponents/spotAddressMap');
var MyUserInfo = require('./spotMiniComponents/myUserInfo');
var Scroll = require('react-scroll');

var SLink = Scroll.Link;
var Element = Scroll.Element;
var Events = Scroll.Events;

var Link = ReactRouter.Link;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var SpotDetail = React.createClass({
  mixins: [Events],
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

    this.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    this.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    this.reviewListener.remove();
    this.scrollEvent.remove('begin');
    this.scrollEvent.remove('end');
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

    if (this.state.hasReviewed && !this.state.formView) {
      yourReviewItem = <div>
        <h4>Your Review</h4>
        <ReviewUserItem
        yourReview={this.yourReview} /></div>;
    } else if (this.state.hasReviewed && this.state.formView) {
      yourReviewItem = <h4>Edit Your Review</h4>;
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
                      <button className="edit-review btn btn-success"
                              onClick={this.toggleReviewForm}>Edit</button>
                      <button className="delete-review btn btn-secondary"
                              onClick={this.deleteYourReview}>Delete</button>
                   </div>;
    }

    var spot = this.state.spot;
    var spotRating = ReviewStore.averageRating(spot.id);

    var taggings = this.state.spot.taggings;
    if(taggings.length === 0) {
      taggingList = <li>No tags yet!</li>;
    } else {
      taggingList = taggings.map(function(tagging, idx) {
        var tagLink = "/spots/search?query=" + tagging.name;
        return(<li key={tagging.tag_id}>
                  <Link to={tagLink}>{tagging.name.capitalizeFirstLetter()}</Link>
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
    spotPictures = this.state.spot.pictures;
    var picturesList;
    if(spotPictures) {
      picturesList = spotPictures.map(function(picture){
        var imageSource = "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/" + picture.source;
        return(<img key={picture.id} src={imageSource}></img>);
      });
    }

    return(
      <div className="spot-detail-page">
        <div className="blue-blackground-container"></div>
        <div className="spot-detail-pane">
          <ul className="detail list-unstyled">
            <li key='name' className="spot-name">{spot.name}</li>
            <li key='rating'><SpotDetailRating rating={spotRating} reviewCount={this.state.reviews.length} /></li>
            <li>
              <ul className="list-unstyled list-inline">
                {taggingList}
              </ul>
              <button type="submit"
                      className="btn btn-xxs btn-secondary"
                      onClick={this.toggleTaggingForm}>
                      Add Tag <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>
              </button>
              {taggingForm}
            </li>
            <li>
              <ul className="list-unstyled spot-details-map-pictures">
                <li><SpotAddressMap spot={this.state.spot} /></li>
                <li className="pictures-list">{picturesList}</li>
              </ul>
            </li>
            <br />
          <br/>
          <div className="reviews-container">
            <h4>
              <SLink to="reviews" spy={true} smooth={true} duration={500}>
                <div className="scroll-to-reviews">
                  <span>Recent Reviews</span> <span className="glyphicon glyphicon-chevron-down"></span>
                </div>
              </SLink>
            </h4>

        <Element name="reviews" className="element">
          <div className="current-user-review-container">
              <ul className="list-unstyled current-user-review-components">
                <li id="current-user-info"><MyUserInfo /></li>
                <li id="current-user-review">{yourReviewItem} {reviewForm}</li>
              </ul>
            </div>

            <br/><br/>
            <ReviewIndex reviews={this.state.reviews} yourReview={this.yourReview} />
            <br /><br />
          </Element>
        </div>
          </ul>
        </div>

        {this.props.children}

      </div>
    );
  }
});

module.exports = SpotDetail;
