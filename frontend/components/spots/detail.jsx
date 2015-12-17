var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
var Review = require('../reviews/Review');
var ReactRouter = require('react-router');
var ReviewForm = require('../reviews/reviewForm');
var ReviewStore = require('../../stores/review');//*****

var Link = ReactRouter.Link;

var SpotDetail = React.createClass({

  getStateFromStore: function() {
    return { spot: SpotStore.find(parseInt(this.props.params.spotId)),
             reviews: ReviewStore.find(parseInt(this.props.params.spotId))
           };
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleSpot(parseInt(newProps.params.spotId));
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    this.reviewListener = ReviewStore.addListener(this._onChange); //*****
    ApiUtil.fetchSingleSpot(parseInt(this.props.params.spotId));
    ApiUtil.fetchReviews();
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    this.reviewListener.remove();
  },

  render: function() {
    if (!this.state.spot){
      return <div></div>;
    }
    var reviews = this.state.reviews || [];
      return(
        <div>
          <Link to="/" >Back to All Spots</Link>
          <div className="spot-detail-pane">
            <ul className="detail">
              {['name', 'description'].map(function (attr) {
                return <li key={attr}> {attr}: {this.state.spot[attr]}</li>;
              }.bind(this))}

            <br/>
            <div className="reviews">
              <ReviewForm spotId={this.props.params.spotId} />
              <h4>Reviews</h4>
                {reviews.map(function(review) {
                  return <Review key={review.id} {...review} />;
                })}
            </div>
            </ul>
          </div>

          {this.props.children}

        </div>
      );
  }
});

module.exports = SpotDetail;
