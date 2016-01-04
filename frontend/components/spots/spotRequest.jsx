var React = require('react');
var ReactRouter = require('react-router');
var Message = require('react-message');
var Link = ReactRouter.Link;


var SpotRequestForm = React.createClass({
  getInitialState: function(){
    return ({
              hasSubmitted: false,
              info: ""
            });
  },

  handleSubmit: function(event){
    event.preventDefault();

    $('.form-control').val('');

    this.setState({info: ["Thanks for the recommendation. We'll check it out soon!"],
                   hasSubmitted: true
                 });
    that = this;
    this.success = setTimeout(function(){that.setState({info: null});}, 3000);
  },

  componentWillUnmount: function(event){
    clearTimeout(this.success);
  },

  render: function(){
    if (!this.state.info) {
      message = <div></div>;
    } else {
      message = <Message key="info" type="info" messages={this.state.info} />;
    }
    return  (
      <div className="request-container">
        <div className="search-content-title">
          Got a <strong>spot</strong> to share? Tell us about it!
        </div>
        <div className="request-form-container center">
          <form className="request-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="spot name" required/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="street address" required/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="city/state" value="San Francisco, CA" readOnly/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="zip code" required/>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success"/>
            </div>
          </form>
          {message}
          <Link to="/">Return to Homepage</Link>
        </div>
      </div>
    );
  }
});

module.exports = SpotRequestForm;
