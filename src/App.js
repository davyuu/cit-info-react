import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import logo from './logo.svg';
import Section from './components/sections/Section';
import ConnectSection from './components/sections/ConnectSection';
import MessageSection from './components/sections/MessageSection';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>CIT info</title>
        </Helmet>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Church In Toronto</h1>
        </header>
        <div className="Main">
          <Section
            title={"I'm new here"}
            content={(<ConnectSection />)}
          />
          <Section
            title={"Announcements"}
            content={(<p>TEST</p>)}
          />
          <Section
            title={"Message Outline"}
            content={(<MessageSection />)}
          />
        </div>
      </div>
    );
  }
}

export default App;
