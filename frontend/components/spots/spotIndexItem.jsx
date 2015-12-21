var React = require('react');
var ReactRouter = require('react-router');
var ReviewStore = require('../../stores/review');
var ReviewUtil = require('../../util/review_util');
var TagStore = require('../../stores/tagging');
var TagUtil = require('../../util/tag_util');
var Link = ReactRouter.Link;
var History = ReactRouter.History;


var SpotIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { avg: "No rating yet!",
             tags: []};
  },

  showDetail: function() {
    this.history.pushState(null, 'spot/' + this.props.spot.id, {});
  },

  onChange: function() {
    this.avg = ReviewStore.averageRating(this.props.spot.id);
    this.tags = TagStore.findBySpot(this.props.spot.id);

    if(isNaN(this.avg)){
      this.avg = "No rating yet!";
    }
    this.setState({ avg: this.avg, tags: this.tags });
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    this.tagListener = TagStore.addListener(this.onChange);
    ReviewUtil.fetchReviews();
    TagUtil.fetchTags();
  },

  componentWillUnmount: function() {
    this.reviewListener.remove();
    this.tagListener.remove();
  },

  render: function() {
    var tags = this.state.tags;
    if(tags.length === 0) {
      tagList = <li></li>;
    } else {
      tagList = tags.map(function(tag, idx) {
        return(<li key={tag.id}><Link to="#">{tag.tag}</Link></li>);
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
            <li><ul className="list-unstyled list-inline">{tagList}</ul></li>
            <br/><br/>
          </ul>
        </li>
      </div>
    );
  },
});

module.exports = SpotIndexItem;
