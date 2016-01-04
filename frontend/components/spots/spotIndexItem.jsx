var React = require('react');
var ReactRouter = require('react-router');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');
var Link = ReactRouter.Link;
var History = ReactRouter.History;
var SpotSearchIndexItemRating  = require('./spotSearchIndexItemRating');
var Address = require('./spotMiniComponents/address');

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var SpotIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { avg: "No rating yet!",
             reviewCount: 0 };
  },

  showDetail: function() {
    this.history.pushState(null, 'spot/' + this.props.spot.id, {});
  },

  onChange: function() {
    this.spotReviews = ReviewStore.spotReviewsFromAll(this.props.spot.id);
    var total = 0;
    this.spotReviews.forEach(function(review) {
      total += review.rating;
    });

    this.avg = total / this.spotReviews.length;

    this.setState({ avg: this.avg,
                    reviewCount: this.spotReviews.length });
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this.onChange);
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchReviews();
  },

  componentWillUnmount: function() {
    this.reviewListener.remove();
    this.spotListener.remove();
  },

  render: function() {
    var spotLink = "/spot/" + this.props.spot.id;
    var taggings = this.props.spot.taggings;
    if(taggings.length === 0) {
      taggingList = <li></li>;
    } else {
      taggingList = taggings.map(function(tagging, idx){
        var tagLink = "/spots/search?query=" + tagging.name;
        return(<li key={tagging.tag_id}><Link to={tagLink}>{tagging.name.capitalizeFirstLetter()}</Link></li>);
      });
    }

    var mainImage;
    if (!this.props.spot) {
      mainImage = <div></div>;
    } else {
      var firstPicture = this.props.spot.pictures[0];
      if (firstPicture) {
        var imageSource = firstPicture.source;
        mainImage = <img key={firstPicture.id} src={imageSource} width="140" height="140" ></img>;
      }
    }
    return(
      <div>
        <li className="spot-index-item list-group-item hover-box" key={this.props.spot.id}>
          <Link to={spotLink}>{mainImage}</Link>
          <ul className="list-unstyled spot-info">
            <li><h4 onClick={this.showDetail}><Link to={spotLink}>{this.props.spot.name}</Link></h4></li>
            <li><SpotSearchIndexItemRating spotId={this.props.spot.id} rating={this.state.avg} reviewCount={this.state.reviewCount} /></li>
            <li><ul className="list-unstyled list-inline tag-list">{taggingList}</ul></li>
          </ul>
          <div id="address-container"><Address address={this.props.spot.address}/></div>
        </li>
      </div>
    );
  },
});

module.exports = SpotIndexItem;
