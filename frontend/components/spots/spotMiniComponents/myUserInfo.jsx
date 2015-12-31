var React = require('react');
var ReactRouter = require('react-router');
var UserStore = require('../../../stores/user');
var ApiUtil = require('../../../util/api_util');
var Link = ReactRouter.Link;

var MyUserInfo = React.createClass({
  getInitialState: function(){
    return ({
      avatar: "",
      firstName: "",
      lastName: "",
      title: "",
      reviewCount: "",
      userlink: ""
    });
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.change);
    ApiUtil.fetchUser(CURRENT_USER_ID);
  },

  componentWillUnmount: function(){
    this.userListener.remove();
  },

  change: function(){
    this.setState({
      avatar: UserStore.user()[0].avatar.source,
      firstName: UserStore.user()[0].first_name,
      lastName: UserStore.user()[0].last_name,
      title: UserStore.user()[0].wanderer_title,
      reviewCount: ReviewStore.allMyReviews().length,
      userlink: "/#/users" + CURRENT_USER_ID
    });
  },

  render: function(){
    var displayName = this.state.firstName + " " + this.state.lastName[0] + ".";
    var reviewCount = this.state.reviewCount;

    if (!this.state.reviewCount){
      userReviewCount = "";
    } else {
      if (this.state.reviewCount > 1){
        userReviewCount = reviewCount + " reviews";
      } else {
        userReviewCount = reviewCount + " review";
      }
    }

    return(<div>
            <div className="user-info">
              <img src={this.state.avatar}
                alt="Current User Avatar"
                height="90"
                width="90">
              </img>
              <ul className="list-unstyled">
                <li>{displayName}</li>
                <li>{this.state.title}</li>
                <li>{userReviewCount}</li>
              </ul>
            </div>
          </div>
          );
  }
});

module.exports = MyUserInfo;
