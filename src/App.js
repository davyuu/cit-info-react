import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Church In Toronto</h1>
        </header>
        <div className="Main">
          <div className="Section">
            <h2 className="Section-title">Connect</h2>
          </div>
          <div className="Section">
            <h2 className="Section-title">Message Notes</h2>
          </div>
          <div className="Section">
            <h2 className="Section-title">Prayer Requests</h2>
          </div>
          <div className="Section">
            <h2 className="Section-title">Song List</h2>
          </div>
          <div className="Section">
            <h2 className="Section-title">Bible Reading</h2>
          </div>
          <div className="Section">
            <h2 className="Section-title">Next Step</h2>
          </div>
          <div className="Section">
            <h2 className="Section-title">Giving</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
