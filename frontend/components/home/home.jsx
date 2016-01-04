var React = require('react');
var ReactRouter = require('react-router');
var HomeReviewForm = require('./homeReviewForm');
var RecentReviews = require('./recentReviews');
var ReviewUtil = require('../../util/review_util');
var ReviewStore = require('../../stores/review');
var UserInfo = require('./homeUserInfo');
var HotSpot = require('./hotSpot');

var Home = React.createClass({
  getInitialState: function() {
    return ({userSpotReviews: []});
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchUserReviews(CURRENT_USER_ID);
  },

  componentWillUnmount: function() {
    this.reviewListener.remove();
  },

  onChange: function() {
    var reviews = ReviewStore.singleUserAllReviews();
    var refIds = reviews.map(function(review) {
                    return {spot_id: review.spot_id,
                            review_id: review.id};
                  });
    this.setState({userSpotReviews: refIds});
  },

  render: function() {
    userReviewCount =  this.state.userSpotReviews.length;
    return (<div id="home-page-container">
              <div className="left-column">
                <div className="form-tight-container">
                  <h3 className="spot-review-title"><strong>Review a Spot!</strong></h3>
                  <div className="home-review-form">
                    <HomeReviewForm userSpots = {this.state.userSpotReviews} />
                  </div>
                </div>
                <div className="recent-activity"><RecentReviews /></div>
              </div>
              <div className="right-column">
                <div className="tight-container">
                  <div className="user-info">
                    <UserInfo reviewCount={userReviewCount}/>
                  </div>
                  <div className="hot-spot-container">
                    <HotSpot />
                  </div>
                </div>
              </div>
            </div>
    );
  }
});

module.exports = Home;
