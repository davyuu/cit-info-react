import React from 'react';
import Loading from './../components/Loading';
import * as colors from './../constants/colors';
import HeaderBar from "../components/HeaderBar";
import './Message.css';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMessage: 0,
			currentTab: 0,
			// messages: [],
			messages: []
		}
	}

	componentDidMount() {
		let dataURL = 'http://mycit.info/wp-json/wp/v2/messages';
		fetch(dataURL)
			.then(res => res.json())
			.then(res => {
				this.setState({
					messages: res.map(val => {
						const message = val.acf;
						return {
							title: message.title,
							seriesName: message.series_name,
							seriesImage: message.series_image.url,
							messageNumber: message.message_number,
							messageChapter: message.message_chapter,
							outline: message.outline,
							studyGuide: message.study_guide,
						};
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
				<p style={styles.numberChapter}>Message {message.messageNumber} - {message.messageChapter}</p>
				<div className='outline' dangerouslySetInnerHTML={{__html: message.outline}}/>
			</div>
		)
		const studyGuide = (
			<div style={styles.content}>
				<h1 style={styles.title}>{message.title}</h1>
				<p style={styles.numberChapter}>Message {message.messageNumber} - {message.messageChapter}</p>
				<div className='study-guide' dangerouslySetInnerHTML={{__html: message.studyGuide}}/>
			</div>
		);
		const currentTab = this.state.currentTab;
		const messageTabStyles = currentTab === 0 ? styles.activeTab : styles.inactiveTab;
		const studyTabStyles = currentTab === 1 ? styles.activeTab : styles.inactiveTab;
		return (
			<div>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Latest Message'}
				/>
				<div style={styles.headerContainer}>
					<img
						style={styles.headerImg}
						src={message.seriesImage}
					/>
					<div style={styles.headerTabs}>
						<div
							style={Object.assign({}, styles.tab, messageTabStyles)}
							onClick={() => this.setState({currentTab: 0})}
						>
							MESSAGE OUTLINE
						</div>
						<div
							style={Object.assign({}, styles.tab, studyTabStyles)}
							onClick={() => this.setState({currentTab: 1})}
						>
							STUDY GUIDE
						</div>
					</div>
				</div>
				<div style={styles.container}>
					{currentTab === 0 ? messageOutline : studyGuide}
				</div>
			</div>
		)
	}
}

const styles = {
	container: {},
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
		marginLeft: 10,
	},
	tab: {
		float: 'left',
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 20,
		marginRight: 20,
		fontSize: 12,
		fontWeight: '600',
		borderBottomStyle: 'solid',
		borderBottomWidth: 5,
	},
	activeTab: {
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
		marginTop: 20,
		marginBottom: 0,
		paddingBottom: 0,
		fontSize: 36,
		fontWeight: '500',
		color: colors.PURPLE
	},
	numberChapter: {
		fontSize: 13,
		fontWeight: '500',
		margin: 0,
		color: colors.LIGHT_LIGHT_PURPLE
	},
};

export default Message
