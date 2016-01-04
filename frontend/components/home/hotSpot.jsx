var React = require('react');
var ReactRouter = require('react-router');
var SpotUtil = require('../../util/spot_util');
var SpotStore = require('../../stores/spot');
var ReviewUtil = require('../../util/review_util');
var HotSpotRating = require('./hotSpotRating');
var Link = ReactRouter.Link;

var HotSpot = React.createClass({
  getInitialState: function() {
    return ({ hotSpot: null,
              reviews: null
            });
  },

  componentDidMount: function() {
    var randSpot = Math.floor((Math.random() * 30) + 2);
    SpotUtil.fetchSingleSpot(randSpot);
    ReviewUtil.fetchSpotReviews(randSpot);
    spotListener = SpotStore.addListener(this.onChange);
    reviewListener = ReviewStore.addListener(this.onChange);
  },

  onChange: function() {
    this.setState({ hotSpot: SpotStore.current(),
                    reviews: ReviewStore.findBySpotLimit()
                  });
  },

  render: function() {

    var hotSpot = this.state.hotSpot;
    var rating = ReviewStore.averageRating();
    var spotLink="";
    var imgSource="";
    if (!hotSpot || isNaN(rating) || rating === 0) {
      hotSpotRating = "No rating yet!";
    } else {
      hotSpotRating = <HotSpotRating rating={rating}/>;
      spotLink = "/spot/" + hotSpot.id;
      imgSource = hotSpot.pictures[0].source;
    }

    reviews = this.state.reviews;
    if (!reviews) {
      return <div></div>;
    } else {
      reviewList = reviews.map(function(review){
        var altTag = review.user.first_name + " avatar";
        var nameDisplay = review.user.first_name + " " + review.user.last_name[0] + ".";
        var comment;
        if (review.comment.split("").length > 25){
          comment = review.comment.split("").slice(0, 25).join("") + "...";
        } else {
          comment = review.comment;
        }

        return (<div key={review.user.id} className="hot-spot-review">
                  <img src={review.user.avatar.source}
                    alt={altTag}
                    height="70"
                    width="70">
                  </img>
                  <ul>
                    <li>{nameDisplay}</li>
                    <li>{comment}</li>
                  </ul>
                </div>
        );
      });
    }

    var visitorCount = "Visited by " + ReviewStore.findBySpot().length + " wanderers";
    return (<div>
              <h4>Hot Spot!</h4>
              <div className="hot-spot-info">
                <img src={imgSource}
                  alt={hotSpot.name}
                  height="90"
                  width="90">
                </img>
                <ul className="list-unstyled">
                  <li><Link to={spotLink}>{hotSpot.name}</Link></li>
                  <li>{hotSpotRating}</li>
                  <li>{visitorCount}</li>
                </ul>
              </div>
              <div className="hot-spot-reviews">
                {reviewList}
              </div>
            </div>
          );
  }
});

module.exports = HotSpot;
