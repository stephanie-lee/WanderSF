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
      <div>
        <input type="text"
               value={this.state.searchString}
               onChange={this.handleChange}
               placeholder="Type Here"></input>
             <ul className="list-unstyled">{tagSuggestions}</ul>
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
