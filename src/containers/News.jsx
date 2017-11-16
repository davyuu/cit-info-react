import React from 'react';
import HeaderBar from "../components/HeaderBar";

class News extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div style={styles.container}>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'What\'s Happening'}
				/>
			</div>
		)
	}
}

const styles = {
	container: {
	},
};

export default News
