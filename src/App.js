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
          <title>CIT Info</title>
        </Helmet>
        <header className="App-header">
          <h1 className="App-title">cit</h1>
        </header>
        <div className="Main">
          <Section
            title={"Latest Message"}
            content={(<MessageSection />)}
          />
          <Section
            title={"What's Happening"}
            content={(<p>TEST</p>)}
          />
          <Section
            title={"Giving"}
            content={(<p>TEST</p>)}
          />
          <Section
            title={"Community Groups"}
            content={(<p>TEST</p>)}
          />
          <Section
            title={"Get Connected"}
            content={(<ConnectSection />)}
          />
        </div>
      </div>
    );
  }
}

export default App;
