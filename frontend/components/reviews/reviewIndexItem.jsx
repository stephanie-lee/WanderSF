var React = require('react');
var ReactRouter = require('react-router');

var ReviewIndexItem = React.createClass({
  componentDidMount: function() {
    var reviewId = "#review-rating-user-" + this.props.id;
    var that = this;
    $(reviewId).rating({min: "0",
                                max: "5",
                                step: "1",
                                showClear: false,
                                showCaption: false,
                                readonly: true,
                                size: "xxs"}); //symbol: "👣"
    $(reviewId).rating('update', this.props.rating);
  },

  render:function()  {
    var reviewId = "review-rating-user-" + this.props.id;
    var name = this.props.user.first_name +
               " " +
               this.props.user.last_name;
    var altTag = name + " User Avatar";

    var userReviewCount;
    if (this.props.reviewCount < 2) {
      userReviewCount = this.props.reviewCount + " review";
    } else {
      userReviewCount = this.props.reviewCount + " reviews";
    }

    return (<div className="review-index-item-components">
              <div id="current-user-info">
                <img src={this.props.user.avatar.source}
                  alt={altTag}
                  height="90"
                  width="90">
                </img>
                <ul className="list-unstyled user-info">
                  <li>{name}</li>
                  <li>{this.props.user.wanderer_title}</li>
                  <li>{userReviewCount}</li>
                </ul>
              </div>
              <div id="current-user-review">
                <ul className="list-unstyled">
                  <li className="stars-with-date">
                    <input id={reviewId}
                         className="rating"
                         type="number"
                         min='1'
                         max='5'/>
                       <div>{this.props.date}</div></li>
                  <li>{this.props.comment}</li>
                  <br/>
                </ul>
              </div>
            </div>

    );
  }
});

module.exports = ReviewIndexItem;
