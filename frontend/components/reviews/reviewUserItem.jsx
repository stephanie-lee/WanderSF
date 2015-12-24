var React = require('react');
var ReactRouter = require('react-router');

var ReviewUserItem = React.createClass({
  render:function()  {
    return (
      <div>
        <ul className="list-unstyled">
          <li>Rating: {this.props.yourReview.rating}</li>
          <li>Review: {this.props.yourReview.comment}</li>
          <br/>
        </ul>
      </div>
    );
  }
});

module.exports = ReviewUserItem;
