import React from 'react';
import Loading from './../components/Loading';
import images from './../images/images';
import * as colors from './../constants/colors';
import HeaderBar from "../components/HeaderBar";

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMessage: 0,
			messages: [{
				title: 'Hope & Praise',
				outline: '<p>test test test</p>',
				study: '<p>study</p>'
			}]
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
		const content = (
			<div style={styles.content}>
				<h1 style={styles.title}>{message.title}</h1>
				<div style={styles.outline} dangerouslySetInnerHTML={{__html: message.outline}}/>
				<div style={styles.study} dangerouslySetInnerHTML={{__html: message.study_guide}}/>
			</div>
		)
		return (
			<div style={styles.container}>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Latest Message'}
				/>
				<div style={styles.headerContainer}>
					<img
						style={styles.headerImg}
						src={images.psalmHeader}
					/>
					<div style={styles.headerTabs}>
						<div>Message Outline</div>
					</div>
				</div>
				{content}
			</div>
		)
	}
}

const styles = {
	container: {
	},
	headerContainer: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	headerImg: {
		width: '100%',
		position: 'relative'
	},
	headerTabs: {
		position: 'absolute',
	},
	content: {
		padding: 20,
	},
	title: {
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
