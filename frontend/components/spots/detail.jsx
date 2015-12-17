var React = require('react');
var SpotStore = require('../../stores/spot');
var ApiUtil = require('../../util/api_util');
//require review index later

var SpotDetail = React.createClass({
  getStateFromStore: function() {
    return { spot: SpotStore.find(parseInt(this.props.params.spotId)) };
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleSpot(parseInt(newProps.params.spotId));
  },

  componentDidMount: function() {
    this.spotListener = SpotStore.addListener(this._onChange);
    ApiUtil.fetchSingleSpot(parseInt(this.props.params.spotId));
  },

  componentWillUnmount: function() {
    this.spotListener.remove();
  },

  render: function() {
    if(this.state.spot === undefined) { return <div></div>; }
      return(
        <div>
          <div className="spot-detail-pane">
            <div className="detail">
              {['name', 'description'].map(function (attr) {
                return <p key={attr}> {attr}: {this.state.spot[attr]}</p>;
              }.bind(this))}
            </div>
          </div>

          {this.props.children}

        </div>
      );
  }
});

module.exports = SpotDetail;
