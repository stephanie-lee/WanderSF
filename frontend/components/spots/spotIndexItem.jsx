var React = require('react');
var ReactRouter = require('react-router');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');
var Link = ReactRouter.Link;
var History = ReactRouter.History;


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
    this.avg = ReviewStore.averageRating(this.props.spot.id);
    this.reviewCount = ReviewStore.findBySpot.length;

    // if(isNaN(this.avg)){
    //   this.avg = "No rating yet!";
    // }
    this.setState({ avg: this.avg,
                    reviewCount: this.reviewCount });
    var ratingId = "#" + this.props.spot.id;
    $(ratingId).rating('update', this.state.avg);
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchReviews();
    var ratingId = "#" + this.props.spot.id;
    $(ratingId).rating({min: "0",
                        max: "5",
                        step: "1",
                        showClear: false,
                        showCaption: false,
                        readonly: true,
                        size: "xxs"}); //symbol: "👣"
  },

  componentWillUnmount: function() {
    this.reviewListener.remove();
  },

  render: function() {
    var spotLink = "/spot/" + this.props.spot.id;
    var taggings = this.props.spot.taggings;
    if(taggings.length === 0) {
      taggingList = <li></li>;
    } else {
      taggingList = taggings.map(function(tagging, idx){
        var tagLink = "/spots/search?query=" + tagging.name;
        return(<li key={tagging.tag_id}><Link to={tagLink}>{tagging.name}</Link></li>);
      });
    }

    this.avg = ReviewStore.averageRating(this.props.spot.id);
    if (isNaN(this.avg)) {
      ratingCount = "No rating yet!";
    } else {
      if(this.state.reviewCount === 1) {
        ratingCount = this.state.reviewCount + " review";
      } else {
        ratingCount = this.state.reviewCount + " reviews";
      }
    }

    var mainImage;
    if (!this.props.spot) {
      mainImage = <div></div>;
    } else {
      var firstPicture = this.props.spot.pictures[0];
      var imageSource = "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_100,w_100/" + firstPicture.source;
      mainImage = <img key={firstPicture.id} src={imageSource}></img>;
    }

    return(
      <div>
        <li className="spot-index-item list-group-item hover-box" key={this.props.spot.id}>
          <ul className="list-unstyled">
            <li>{mainImage}</li>
            <li><h4 onClick={this.showDetail}><Link to={spotLink}>{this.props.spot.name}</Link></h4></li>
            <br/>
              <li><input id={this.props.spot.id}
                     className="rating"
                     type="number"
                     min='1'
                     max='5'/> {ratingCount}</li>
            <br/>
            <li>Info: {this.props.spot.description}</li>
            <br/>
            <li><ul className="list-unstyled list-inline">{taggingList}</ul></li>
            <br/><br/>
          </ul>
        </li>
      </div>
    );
  },
});

module.exports = SpotIndexItem;
