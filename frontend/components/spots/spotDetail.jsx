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

var SpotDetail = React.createClass({
  mixins: [Events],
  getInitialState: function() {
    return { spot: null,
             reviews: null,
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
                    reviews: ReviewStore.findBySpot(),
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
    ReviewUtil.fetchSpotReviews(parseInt(this.props.params.spotId));
    ReviewUtil.fetchUserReviews(CURRENT_USER_ID);

    this.scrollEvent.register('begin', function() {
    });

    this.scrollEvent.register('end', function() {
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
    if(this.state.spot.taggings.length > 4) {
      alert("Limit 5 tags per spot! Please remove a tag if you want to add a new tag.");
    } else {
      this.setState({taggingFormView: true});
    }
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
    var reviewCount;

    if (!ReviewStore.singleUserAllReviews().length) {
      reviewCount = 0;
    } else {
      reviewCount = ReviewStore.singleUserAllReviews().length;
    }

    if (!this.state.spot){
      return <div></div>;
    }

    if (this.state.hasReviewed && !this.state.formView) {
      yourReviewItem = <div>
        <h4>Your Review</h4>
        <ReviewUserItem
        reviewCount={reviewCount}
        userReview={this.yourReview} /></div>;
    } else if (this.state.hasReviewed && this.state.formView) {
      yourReviewItem = <h4>Edit Your Review</h4>;
    } else {
      yourReviewItem = <div></div>;
    }

    if (this.state.formView) {
      reviewForm = <ReviewForm
        spotId={this.props.params.spotId}
        hasReviewed={this.state.hasReviewed}
        userReview={this.yourReview} />;
    } else {
      reviewForm = <div>
                      <button className="edit-review btn btn-success"
                              onClick={this.toggleReviewForm}>Edit</button>
                      <button className="delete-review btn btn-secondary"
                              onClick={this.deleteYourReview}>Delete</button>
                   </div>;
    }

    var spot = this.state.spot;
    var spotRating = ReviewStore.averageRating();

    var taggings = this.state.spot.taggings;
    if(taggings.length === 0) {
      taggingList = <li>No tags yet!</li>;
    } else {
      taggingList = taggings.map(function(tagging, idx) {
        var tagLink = "/spots/search?query=" + tagging.name;
        return(<li key={tagging.tag_id}>
                  <Link to={tagLink}>{tagging.name}</Link>
                  <span id={tagging.id}
                        tagId={tagging.tag_id}
                        className="glyphicon glyphicon-remove-circle"
                        style={{color: "#4d4d4d"}}
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

    //**changing 3 images to single background
    // spotPictures = this.state.spot.pictures;
    // var picturesList;
    // if(spotPictures) {
    //   picturesList = spotPictures.map(function(picture){
    //     var imageSource = picture.source;
    //     return(<img key={picture.id} src={imageSource}></img>);
    //   });
    // }

    var spotPictures = this.state.spot.pictures;
    var imgUrl;
    if(spotPictures) {
      var pictureURL = spotPictures[0].source;
      imgUrl = "url(" + pictureURL + ")";
    }

    return(
      <div className="spot-detail-page">
            <div className="blue-background-container"
              style={{backgroundImage: "linear-gradient(rgba(250, 250, 250, 0.9), rgba(0, 0, 0, 0.1))," + imgUrl,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%"}}>
              <ul className="detail list-unstyled">

            <li key='name' className="spot-name">{spot.name}</li>
            <li key='rating' className="rating"><SpotDetailRating rating={spotRating} reviewCount={this.state.reviews.length} /></li>
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
              </ul>
            </li>
            </ul>
            </div>
          <div className="spot-detail-pane">
            <ul className="detail list-unstyled">

          <div className="reviews-container">
          <Element name="reviews" className="element" >
            <div className="box"></div>

          </Element>
            <br />
            <h4>
              <SLink to="reviews" spy={true} smooth={true} duration={500}>
                <div className="scroll-to-reviews">
                  <span>Recent Reviews</span> <span className="glyphicon glyphicon-chevron-down"></span>
                </div>
              </SLink>
            </h4>

          <div className="current-user-review-container" id="review-container">
              <ul className="list-unstyled current-user-review-components">
                <li id="current-user-info"><MyUserInfo /></li>
                <li id="current-user-review">{yourReviewItem} {reviewForm}</li>
              </ul>
            </div>

            <br/><br/>
            <ReviewIndex reviews={this.state.reviews} userReview={this.yourReview} />
            <br /><br />
        </div>
          </ul>
        </div>

        {this.props.children}

      </div>
    );
  }
});

module.exports = SpotDetail;

//<li className="pictures-list">{picturesList}</li>
