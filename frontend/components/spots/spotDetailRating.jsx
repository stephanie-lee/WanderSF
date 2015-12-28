var React = require('react');
var ReactRouter = require('react-router');

var SpotDetailRating = React.createClass({
  componentDidMount: function() {
    $("#spot-detail-rating").rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                readonly: true,
                                size: "xs"}); //symbol: "👣"
  },

  componentWillReceiveProps: function(newProp) {
    $("#spot-detail-rating").rating('update', newProp.rating);
  },

  render:function()  {
    if (isNaN(this.props.rating)) {
      ratingCount = "No rating yet!";
    } else {
      if(this.props.reviewCount === 1) {
        ratingCount = this.props.reviewCount + " review";
      } else {
        ratingCount = this.props.reviewCount + " reviews";
      }
    }

    return (
      <div>
        <ul className="list-unstyled">
          <li><input id="spot-detail-rating"
                 className="rating"
                 type="number"
                 min='1'
                 max='5'/> {ratingCount}</li>
          <br/>
        </ul>
      </div>
    );
  }
});

module.exports = SpotDetailRating;
