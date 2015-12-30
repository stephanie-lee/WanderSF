var React = require('react');
var ReactDOM = require('react-dom');

var Address = React.createClass({
  getInitialState: function() {
    return { streetAddress: "",
             cityStateZip: "",
             neighborhood: ""
           };
  },

  componentWillReceiveProps: function(newProp) {
    this.streetAddress = newProp.address.street_address;
    this.cityStateZip = "San Francisco, CA " + newProp.address.zip;
    this.neighborhood = newProp.address.neighborhood;

    this.setState({ streetAddress: this.streetAddress,
                    cityStateZip: this.cityStateZip,
                    neighborhood: this.neighborhood
                  });
  },

  render: function() {
    return (
            <div>
              <ul className="list-unstyled address-info">
                <li>{this.state.neighborhood}</li>
                <br />
                <li>{this.state.streetAddress}</li>
                <li>{this.state.cityStateZip}</li>
              </ul>
            </div>
          );
  }
});

module.exports = Address;
