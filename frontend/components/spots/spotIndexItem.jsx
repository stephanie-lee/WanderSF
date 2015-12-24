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
  },

  componentDidMount: function() {
    this.reviewListener = ReviewStore.addListener(this.onChange);
    ReviewUtil.fetchReviews();
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
        return(<li key={tagging.tag_id}><Link to="#">{tagging.name}</Link></li>);
      });
    }

    return(
      <div>
        <li className="list-group-item hover-box" key={this.props.spot.id}>
          <ul className="list-unstyled">
            <h4 onClick={this.showDetail}><Link to={spotLink}>{this.props.spot.name}</Link></h4>
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
