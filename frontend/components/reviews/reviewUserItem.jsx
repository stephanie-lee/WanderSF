var React = require('react');
var ReactRouter = require('react-router');

var ReviewUserItem = React.createClass({
  componentDidMount: function() {
    var that = this;
    $("#review-rating").rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                readonly: true,
                                size: "xxs"}); //symbol: "👣"
    $("#review-rating").rating('update', this.props.yourReview.rating);
  },

  render:function()  {
    return (
      <div>
        <ul className="list-unstyled">
          <li className="stars-with-date">
            <input id="review-rating"
                 className="rating"
                 type="number"
                 min='1'
                 max='5'/>
            <div>{this.props.yourReview.date}</div></li>
          <li>{this.props.yourReview.comment}</li>
          <br/>
        </ul>
      </div>
    );
  }
});

module.exports = ReviewUserItem;
