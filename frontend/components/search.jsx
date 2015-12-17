var React = require('react');

var Search = React.createClass({
  getInitialState: function() {
    return {searchString: ""};
  },

  change: function(e){
    this.setState({searchString: e.target.value});
  },

  handleNameClick: function(e) {
    this.setState({searchString: e.target.innerHTML});
  },

  render: function() {
    var spots = this.props.spots(),
        searchString = this.state.searchString.trim().toLowerCase();
    if(searchString.length > 0){
      spots = spots.filter(function(spot){
        return spot.name.toLowerCase().match( searchString );
      });
    }

    return (
      <div>
        <input type="text"
               value={this.state.searchString}
               onChange={this.change}
               placeholder="Type Here"/>
             <ul onClick={this.handleNameClick}>
          {
            spots.map(function(spot, idx) {
              return <li key={idx}>{name}</li>;
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = Search;
