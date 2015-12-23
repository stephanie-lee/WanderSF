var React = require('react');
var TagUtil = require('../../util/tag_util');
var TagStore = require('../../stores/tag');

var SearchBar = React.createClass({
  getInitialState: function() {
    return {searchString: "",
            queryTags: []
           };
  },

  handleChange: function(e){
    this.setState({searchString: e.target.value});
    if (!!e.target.value) {
      TagUtil.fetchQueryTags(e.target.value);
    }
  },

  handleQuery: function(){
    this.setState({queryTags: TagStore.queriedTags()});
  },

  componentDidMount: function() {
    this.tagListener = TagStore.addListener(this.handleQuery);
    // TagUtil.fetchQueryTags(this.state.searchString);
  },

  handleNameClick: function(e) {
    this.setState({searchString: e.target.innerHTML});
  },

  render: function() {
    // var spots = this.props.spots(),
    //     searchString = this.state.searchString.trim().toLowerCase();
    // if(searchString.length > 0){
    //   spots = spots.filter(function(spot){
    //     return spot.name.toLowerCase().match( searchString );
    //   });
    // }
    if (!this.state.searchString) {
      tagSuggestions = <li></li>;
    } else {
      tagSuggestions = this.state.queryTags.map(function(tag){
        return(<li key={tag.id} tagId={tag.id}>{tag.name}</li>);
      });
    }
    return (
      <div className="col-xs-6 col-sm-3">
        <input type="text"
               value={this.state.searchString}
               onChange={this.handleChange}
               placeholder="Type Here"></input>
        <div className="main-search_suggestions suggestions-list-container search-suggestions-list-container">
           <ul className="list-unstyled col-xs-6 col-sm-3 suggestions-list">{tagSuggestions}</ul>
        </div>
      </div>
    );
  }
});

          // {
          //   spots.map(function(spot, idx) {
          //     return <li key={idx}>{name}</li>;
          //   })
          // }
module.exports = SearchBar;
