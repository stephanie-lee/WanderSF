var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReviewIndexItem = React.createClass({
  render:function()  {
    // var link =
    return (
      <div>
        <ul>
          <li>User: {this.props.user.first_name}
                    {this.props.user.last_name}</li>
          <li>{this.props.user.wanderer_title}</li>
          <li>Rating: {this.props.rating}</li>
          <li>Review: {this.props.comment}</li>
          <br/>
        </ul>
      </div>
    );
  }
});

module.exports = ReviewIndexItem;
