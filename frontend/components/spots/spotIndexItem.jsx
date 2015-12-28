var React = require('react');
var ReactRouter = require('react-router');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');
var Link = ReactRouter.Link;
var History = ReactRouter.History;


var SpotIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { avg: "No rating yet!" };
  },

  showDetail: function() {
    this.history.pushState(null, 'spot/' + this.props.spot.id, {});
  },

  onChange: function() {
    this.avg = ReviewStore.averageRating(this.props.spot.id);

    if(isNaN(this.avg)){
      this.avg = "No rating yet!";
    }
    this.setState({ avg: this.avg });
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
                        size: "xs"}); //symbol: "👣"
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

    return(
      <div>
        <li className="list-group-item hover-box" key={this.props.spot.id}>
          <ul className="list-unstyled">
            <h4 onClick={this.showDetail}><Link to={spotLink}>{this.props.spot.name}</Link></h4>
            <br/>
              <li><input id={this.props.spot.id}
                     className="rating"
                     type="number"
                     min='1'
                     max='5'/></li>
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
