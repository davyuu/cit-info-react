import React from 'react';
import Head from './routes/Head';
import Main from './routes/Main';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Head/>
				<Main/>
			</div>
		);
	}
}

export default App;
