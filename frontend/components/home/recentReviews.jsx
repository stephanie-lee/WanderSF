var React = require('react');
var ReactRouter = require('react-router');
var HomeReviewForm = require('./homeReviewForm');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');
var Rating = require('./rating');
var Link = ReactRouter.Link;

var RecentReviews = React.createClass({
  getInitialState: function() {
    return { recentReviews: [] };
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchRecentReviews(6);
  },

  onChange: function() {
    this.setState( {recentReviews: ReviewStore.recentReviews() });
  },

  componentWillUnmount: function() {
    this.reviewListener.remove();
  },

  render: function() {
    if (this.state.recentReviews.length === 0) {
      reviews = <div></div>;
    } else {
      reviews = this.state.recentReviews.map(function(review){
        var name = review.user.first_name + " " +
                   review.user.last_name[0] + ".";
        var altTag = name + " User Avatar";
        var spotLink = "/spot/" + review.spot_name.id;
        var nameDisplay = <strong>{name}</strong>;
        var status = " wrote a review for ";
        return <ul key={review.id} className="list-unstyled" id="recent-review-item">
                <img src={review.user.avatar.source}
                  alt={altTag}
                  height="90"
                  width="90">
                </img>
                <li>
                  <ul className="list-unstyled recent-review-info">
                    <li className="alegreya">{nameDisplay}{status}<Link to={spotLink}>{review.spot_name.name}:</Link></li>
                    <li className="recent-stars-with-date">
                      <Rating rating={review.rating} ratingId={review.id}/>
                      <div>{review.date}</div></li>
                    <li>{review.comment}</li>
                  </ul>
                </li>
              </ul>;
      });
    }

    return (
      <div className="recent-reviews-container">
        <h4 className="recent-review-title">Recent Reviews</h4>
          {reviews}
      </div>

    );
  }
});

module.exports = RecentReviews;
