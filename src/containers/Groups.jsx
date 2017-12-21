import React from 'react'
import HeaderBar from '../components/HeaderBar'

class Groups extends React.Component {
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
					title={'Community Groups'}
				/>
			</div>
		)
	}
}

const styles = {
	container: {
	},
};

export default Groups
