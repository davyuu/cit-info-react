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
			currentTab: 0,
			messages: [{
				title: 'Hope & Praise',
				outline: '<p>Message Outline content</p>',
				studyGuide: '<p>Study Guide content</p>'
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
		const messageOutline = (
			<div style={styles.content}>
				<h1 style={styles.title}>{message.title}</h1>
				<div style={styles.outline} dangerouslySetInnerHTML={{__html: message.outline}}/>
			</div>
		)
		const studyGuide = (
			<div style={styles.content}>
				<h1 style={styles.title}>{message.title}</h1>
				<div style={styles.study} dangerouslySetInnerHTML={{__html: message.studyGuide}}/>
			</div>
		);
		const currentTab = this.state.currentTab;
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
						<div
							style={{...styles.tab, ...currentTab === 0 ? styles.activeTab : styles.inactiveTab}}
							onClick={() => this.setState({currentTab: 0})}
						>
							MESSAGE OUTLINE
						</div>
						<div
							style={{...styles.tab, ...currentTab === 1 ? styles.activeTab : styles.inactiveTab}}
							onClick={() => this.setState({currentTab: 1})}
						>
							STUDY GUIDE
						</div>
					</div>
				</div>
				{currentTab === 0 ? messageOutline : studyGuide}
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
		marginLeft: 20,
	},
	tab: {
		float: 'left',
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		fontSize: 12,
		fontWeight: '700',
		borderBottomStyle: 'solid',
		borderBottomWidth: 5,
	},
	activeTab : {
		color: colors.WHITE,
		borderBottomColor: colors.TRANSLUCENT_WHITE
	},
	inactiveTab: {
		color: colors.TRANSLUCENT_WHITE,
		borderBottomColor: colors.TRANSPARENT
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: '500'
	},
	outline: {
	},
	study: {

	}
};

export default Message
