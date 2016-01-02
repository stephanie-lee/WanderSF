var React = require('react');
var ReactRouter = require('react-router');
var SpotUtil = require('../../util/spot_util');
var SpotStore = require('../../stores/spot');
var History = ReactRouter.History;

var SpotSearchBar = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {searchString: "",
            querySpots: []
           };
  },

  handleChange: function(e){
    this.setState({searchString: e.target.value});
    if (!!e.target.value) {
      SpotUtil.fetchQuerySpots(e.target.value);
    }
  },

  handleQuery: function(){
    this.setState({querySpots: SpotStore.all()});
    this.resetAutocomplete();
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this.handleQuery);
    this.loadAutocomplete();
  },

  handleNameClick: function(e) {
    this.setState({searchString: e.target.innerHTML});
  },

  // handleSearch: function(e) {
  //   e.preventDefault();
  //   this.refs.searchInput.blur();
  //   this.history.pushState(null, 'spots/search', {query: this.state.searchString});
  // },

  loadAutocomplete: function() {
    var _this = this;
    $(this.refs.searchInput).autocomplete({
      source: _this.state.querySpots
    });
  },

  resetAutocomplete: function() {
    var _this = this;
    var spots = this.state.querySpots.map(function(spot){
      return (spot.name);
    });
    $(this.refs.searchInput).autocomplete("option", {
      source: spots
    });
  },

  render: function() {
    if (!this.state.searchString) {
    } else {

    }
    return (
      <div>
        <input type="text"
               className="form-control spot-search-box"
               ref="searchInput"
               value={this.state.searchString}
               onChange={this.handleChange}

               placeholder="Where did you wander?" />
      </div>
    );
  }
});

module.exports = SpotSearchBar;
