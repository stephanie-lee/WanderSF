var React = require('react');
var History = require('react-router').History;

var IndexItem = React.createClass({
  mixins: [History],

  showDetail: function() {
    this.history.pushState(null, '/spot/' + this.props.spot.id, {});
  },

  render: function() {
    return(
      <li className="spot-list-item">
        <p onClick={this.showDetail} key="name">{this.props.spot.name}:</p>
        <p key="desc">Info: {this.props.spot.description}</p>
        <br/>
      </li>
    );
  },
});

module.exports = IndexItem;
