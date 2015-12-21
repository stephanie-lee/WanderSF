var React = require('react');
var ReactRouter = require('react-router');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');
var TaggingStore = require('../../stores/tagging');
var TaggingUtil = require('../../util/tagging_util');
var Link = ReactRouter.Link;
var History = ReactRouter.History;


var SpotIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { avg: "No rating yet!",
             taggings: []};
  },

  showDetail: function() {
    this.history.pushState(null, 'spot/' + this.props.spot.id, {});
  },

  onChange: function() {
    this.avg = ReviewStore.averageRating(this.props.spot.id);
    this.taggings = TaggingStore.findBySpot(this.props.spot.id);

    if(isNaN(this.avg)){
      this.avg = "No rating yet!";
    }
    this.setState({ avg: this.avg, taggings: this.taggings });
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    this.taggingListener = TaggingStore.addListener(this.onChange);
    ReviewUtil.fetchReviews();
    TaggingUtil.fetchTaggings();
  },

  componentWillUnmount: function() {
    this.reviewListener.remove();
    this.taggingListener.remove();
  },

  render: function() {
    var taggings = this.state.taggings;
    if(taggings.length === 0) {
      taggingList = <li></li>;
    } else {
      taggingList = taggings.map(function(tagging, idx) {
        return(<li key={tagging.id}><Link to="#">{tagging.tag}</Link></li>);
      });
    }

    return(
      <div>
        <li className="list-group-item hover-box" onClick={this.showDetail} key={this.props.spot.id}>
          <ul className="list-unstyled">
            <h4>{this.props.spot.name}</h4>
            <br/>
            <li>Rating: {this.state.avg}</li>
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
