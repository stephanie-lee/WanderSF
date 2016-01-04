var React = require('react');
var ReactRouter = require('react-router');

var HotSpotRating = React.createClass({
  componentDidMount: function() {
    $("#hot-spot-rating").rating({min: "0",
                                  max: "5",
                                  step: "1",
                                  showClear: false,
                                  showCaption: false,
                                  readonly: true,
                                  size: "xxs"}); //symbol: "👣"
  },

  componentWillReceiveProps: function(newProp) {
    $("#hot-spot-rating").rating('update', newProp.rating);
  },

  render: function()  {
    return (
      <div>
        <ul className="list-unstyled">
          <li>
            <input id="hot-spot-rating"
                   className="rating"
                   type="number"
                   min='1'
                   max='5'/>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = HotSpotRating;
