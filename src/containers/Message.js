import React from 'react';
import Loading from './../components/Loading';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMessage: 0,
			messages: []
		}
	}

	componentDidMount() {
		let dataURL = 'http://localhost/cit/wp-json/wp/v2/messages';
		fetch(dataURL)
			.then(res => res.json())
			.then(res => {
				this.setState({
					messages: res.map(val => {
						return val.acf;
					})
				})
			})
	}

	render() {
		if (this.state.messages.length === 0) {
			return <Loading/>
		}
		const message = this.state.messages[this.state.currentMessage];
		return (
			<div style={styles.container}>
				<div style={styles.header}>
					<div>Message Outline</div>
				</div>
				<h1 style={styles.title}>{message.title}</h1>
				<div style={styles.outline} dangerouslySetInnerHTML={{__html: message.outline}}/>
				<div style={styles.study} dangerouslySetInnerHTML={{__html: message.study_guide}}/>
			</div>
		)
	}
}

const styles = {
	container: {
		padding: 10,
	},
	title: {
		marginLeft: 20,
		fontSize: 32,
		fontWeight: '500'
	},
	outline: {
		margin: 0,
		padding: 0,
	},
	study: {

	}
}

export default Message
