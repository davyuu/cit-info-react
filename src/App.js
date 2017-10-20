import React from 'react';
import {Helmet} from 'react-helmet';
import Main from './routes/Main';

class App extends React.Component {
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
