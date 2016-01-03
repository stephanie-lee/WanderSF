var React = require('react');
var ReactRouter = require('react-router');
var HomeReviewForm = require('./homeReviewForm');
var RecentReviews = require('./recentReviews');
var ReviewUtil = require('../../util/review_util');
var ReviewStore = require('../../stores/review');

var Home = React.createClass({
  getInitialState: function() {
    return ({userSpotReviews: []});
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchUserReviews(CURRENT_USER_ID);
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
    return (<div id="home-page-container">
              <div className="left-column">
                <div className="home-review-form">
                  <HomeReviewForm userSpots = {this.state.userSpotReviews} />
                </div>
                <div className="recent-activity"><RecentReviews /></div>
              </div>
              <div className="right-column">
                <div className="user-info">User Info</div>
                <div className="hot-spot">Hot Spot</div>
              </div>
            </div>
    );
  }
});

module.exports = Home;
