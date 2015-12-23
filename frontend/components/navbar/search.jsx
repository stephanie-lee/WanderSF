var React = require('react');
var ReactRouter = require('react-router');
var TagUtil = require('../../util/tag_util');
var TagStore = require('../../stores/tag');
var SpotUtil = require('../../util/spot_util');
var History = ReactRouter.History;

var SearchBar = React.createClass({
  mixins: [History],

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
    this.resetAutocomplete();
  },

  componentDidMount: function() {
    this.tagListener = TagStore.addListener(this.handleQuery);
    this.loadAutocomplete();
  },

  handleNameClick: function(e) {
    this.setState({searchString: e.target.innerHTML});
  },

  handleSearch: function(e) {
    e.preventDefault();
    SpotUtil.fetchSpotsByQuery(this.state.searchString);
    this.history.pushState(null, 'spots/search=' + this.state.searchString, {});

  },

  loadAutocomplete: function() {
    var _this = this;
    $(this.refs.searchinput).autocomplete({
      source: _this.state.queryTags
    });
  },

  resetAutocomplete: function() {
    var _this = this;
    var tags = this.state.queryTags.map(function(tag){
      return (tag.name);
    });
    $(this.refs.searchinput).autocomplete("option", {
      source: tags
    });
  },

  render: function() {
    if (!this.state.searchString) {
    } else {

    }
    return (
      <div className="col-xs-6 col-sm-3 search-bar">
        <div className='row'>
          <form className="input-group">
          <input type="text"
                 className="form-control"
                 ref="searchinput"
                 id="searchinput"
                 value={this.state.searchString}
                 onChange={this.handleChange}
                 onSubmit={this.handleSearch}
                 placeholder="Type Here" />
        <span className="input-group-btn">
          <button type="submit"
             className="btn btn-secondary"
             onClick={this.handleSearch}>
             <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
          </span>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;
