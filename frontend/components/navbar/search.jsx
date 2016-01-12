var React = require('react');
var ReactRouter = require('react-router');
var TagUtil = require('../../util/tag_util');
var TagStore = require('../../stores/tag');
var SpotUtil = require('../../util/spot_util');
var History = ReactRouter.History;

var SearchBar = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {searchString: this.props.location.query.query || "",
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
    this.resetAutocomplete();
  },

  componentDidMount: function() {
    this.tagListener = TagStore.addListener(this.handleQuery);
    this.loadAutocomplete();
    $(this.refs.searchInput).on("autocompleteselect", this.handleNameClick);
  },

  componentWillUnmount: function() {
    this.tagListener.remove();
  },

  componentWillReceiveProps: function(newProp) {
    if(typeof newProp.location.query !== "undefined") {
      var queryStr = newProp.location.query.query;
      if (typeof queryStr !== "undefined") {
        this.setState({
          searchString: queryStr
        });
      }
    }
  },

  handleNameClick: function(e, ui) {
    this.setState({searchString: ui.item.value});
  },

  handleSearch: function(e) {
    e.preventDefault();
    this.refs.searchInput.blur();
    this.history.pushState(null, 'spots/search', {query: this.state.searchString});
  },

  loadAutocomplete: function() {
    var _this = this;
    $(this.refs.searchInput).autocomplete({
      source: _this.state.queryTags
    });
  },

  resetAutocomplete: function() {
    var _this = this;
    var tags = this.state.queryTags.map(function(tag){
      return (tag.name);
    });
    $(this.refs.searchInput).autocomplete("option", {
      source: tags
    });
  },

  render: function() {
    if (!this.state.searchString) {
    } else {

    }
    return (
      <div>
          <form className="input-group">
          <input type="text"
                 className="form-control search-box"
                 ref="searchInput"
                 value={this.state.searchString}
                 onChange={this.handleChange}
                 onSubmit={this.handleSearch}
                 placeholder="Find parks, beaches, bowling" />
        <span className="input-group-btn">
          <button type="submit"
             className="btn btn-success"
             onClick={this.handleSearch}>
             <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
          </span>
          </form>
      </div>
    );
  }
});

module.exports = SearchBar;
