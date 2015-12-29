var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var ReviewIndexItem = React.createClass({
  render:function()  {
    var name = this.props.user.first_name.capitalizeFirstLetter() +
               " " +
               this.props.user.last_name.capitalizeFirstLetter();

    return (
      <div>
        <ul className="list-unstyled">
          <li>User: {name}</li>
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
