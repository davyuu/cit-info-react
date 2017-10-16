import React from 'react'
import './ConnectSection.css';

class ConnectSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  onConnectFormSubmit() {
    console.log(this.state.firstName);
  }

  render() {
    return (
      <div className="Connect">
        <label className="Connect-form-label">
          <span className="Connect-form-required">*</span> First Name:
          <input
            className="Connect-form-input"
            type="text"
            value={this.state.firstName}
            onChange={(e) => this.setState({firstName: e.target.value})}
          />
        </label>
        <label className="Connect-form-label">
          <span className="Connect-form-required">*</span> Last Name:
          <input
            className="Connect-form-input"
            type="text"
            value={this.state.lastName}
            onChange={(e) => this.setState({lastName: e.target.value})}
          />
        </label>
        <label className="Connect-form-label">
          <span className="Connect-form-required">*</span> Email:
          <input
            className="Connect-form-input"
            type="text"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </label>
        <button
          className="Connect-form-submit"
          onClick={() => this.onConnectFormSubmit()}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default ConnectSection
