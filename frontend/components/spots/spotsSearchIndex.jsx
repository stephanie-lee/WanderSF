var React = require('react');
var ReactRouter = require('react-router');
var SpotStore = require('../../stores/spot');
var SpotUtil = require('../../util/spot_util');
var SpotIndexItem = require('./spotIndexItem');
var ReviewStore = require('../../stores/review');
var Map = require('./map');
var TagUtil = require('../../util/tag_util');
var TagStore = require('../../stores/tag');
var Link = ReactRouter.Link;

var SpotsSearchIndex = React.createClass({
  getInitialState: function() {
    return { spots: [],
             query: this.props.location.query.query,
             tagSuggestions: []};
  },

  _onChange: function() {
    this.setState({ spots: SpotStore.all() ,
                    tagSuggestions: TagStore.all() });
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    this.tagListener = TagStore.addListener(this._onChange);
    SpotUtil.fetchSpotsByQuery(this.props.location.query.query);
    TagUtil.fetchRandomTags(5);
  },

  componentWillReceiveProps: function(newProp) {
    SpotUtil.fetchSpotsByQuery(newProp.location.query.query);
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
    this.tagListener.remove();
  },

  handleMarkerClick: function (spot) {
    this.props.history.pushState(null, "spot/" + spot.id);
  },

  render: function() {
    var spotItems;
    if (!this.state) {
      spotItems = <div></div>;
    } else if(this.state.spots.length === 0) {
      spotItems = <div>
                    <h4>Try a different tag. Here are some suggestions:</h4>
                    <ul className="list-unstyled">
                      {this.state.tagSuggestions.map(function(tag){
                        var tagLink = "/spots/search?query=" + tag.name;
                        return <li><Link to={tagLink}>{tag.name}</Link></li>;
                      })}
                    </ul>
                  </div>;
    } else
      spotItems = this.state.spots.map(function(spotItem, idx) {
      return(<SpotIndexItem key={idx} spot={spotItem} />);
    });
    return(
      <div>
        <div className="search-content-title">
          Tags matching <strong>"{this.props.location.query.query}"</strong>
        </div>
        <ul id="search-index-container" className="list-group">
          {spotItems}
        </ul>
        <div id="search-index-map-container">
          <Map spots={this.state.spots} onMarkerClick={this.handleMarkerClick}/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = SpotsSearchIndex;
