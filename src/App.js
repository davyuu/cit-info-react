import React from 'react';
import {Helmet} from 'react-helmet';
import Head from './routes/Head';
import Main from './routes/Main';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Helmet>
					<title>CIT Info</title>
				</Helmet>
				<Head/>
				<Main/>
			</div>
		);
	}
}

export default App;
