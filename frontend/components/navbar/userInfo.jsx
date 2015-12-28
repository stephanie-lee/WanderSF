var React = require('react');
var ReactRouter = require('react-router');
var UserStore = require('../../stores/user');
var ApiUtil = require('../../util/api_util');
var Link = ReactRouter.Link;

var UserInfo = React.createClass({
  getInitialState: function(){
    return ({
      email: "",
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
      email: UserStore.user()[0].email,
      userlink: "/#/users" + UserStore.user()[0].id
    });
  },

  render: function(){
    return(<Link to="">
              {this.state.email}
           </Link>
          );
  }
});

module.exports = UserInfo;
