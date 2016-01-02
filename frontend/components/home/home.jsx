var React = require('react');
var ReactRouter = require('react-router');
var HomeReviewForm = require('./homeReviewForm');
var RecentReviews = require('./recentReviews');


var Home = React.createClass({
  render: function() {
    return (<div id="home-page-container">
              <div className="left-column">
                <div className="home-review-form"><HomeReviewForm /></div>
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
