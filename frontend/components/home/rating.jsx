var React = require('react');
var ReactRouter = require('react-router');

var HomeRating = React.createClass({
  componentDidMount: function() {
    ratingId = "#home-spot-rating-" + this.props.ratingId;
    $(ratingId).rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                readonly: true,
                                size: "xs"}); //symbol: "👣"
  },

  componentWillReceiveProps: function(newProp) {
    ratingId = "#home-spot-rating-" + this.props.ratingId;
    $(ratingId).rating('update', newProp.rating);
  },

  render:function()  {
    ratingId = "home-spot-rating-" + this.props.ratingId;
    return (
      <div>
        <input id={ratingId}
               className="rating"
               type="number"
               min='1'
               max='5'/>
      </div>
    );
  }
});

module.exports = HomeRating;
