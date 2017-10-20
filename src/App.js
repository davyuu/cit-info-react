import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import Main from './routes/Main';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Helmet>
					<title>CIT Info</title>
				</Helmet>
				<Main/>
			</div>
		);
	}
}

export default App;
