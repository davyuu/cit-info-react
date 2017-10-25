import React from 'react';
import Loading from './../components/Loading';
import images from './../images/images';
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
			messages: [{
				title: 'Hope & Praise',
				seriesName: 'Psalms For All Seasons',
				seriesImage: images.psalmHeader,
				messageNumber: 12,
				messageChapter: 'Psalms 71',
				outline: '<h1><span style=\"font-weight: 400;\">Looking Back</span></h1>\n<ol>\n<li style=\"font-weight: 400; text-align: left;\"><span style=\"font-weight: 400;\">Recognizing God&#8217;s sovereignity</span>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">God has been…</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Brought forth by God…</span></li>\n</ol>\n</li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Past experiences</span>\n<ol>\n<li style=\"font-weight: 400; text-align: left;\"><span style=\"font-weight: 400;\">Having leaned on God…</span></li>\n<li style=\"font-weight: 400; text-align: left;\"><span style=\"font-weight: 400;\">Taught by God…</span></li>\n<li style=\"font-weight: 400; text-align: left;\"><span style=\"font-weight: 400;\">God caused me to&#8230;</span></li>\n</ol>\n</li>\n</ol>\n<h1><span style=\"font-weight: 400;\">Looking Forward</span></h1>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Prayer not to be discarded or abandoned in old age &#8211; v. 18</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Making declarations concerning God</span>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">After trouble,</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Telling about God’s</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Hoping continually</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Praising and singing</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Proclaiming Your</span></li>\n</ol>\n</li>\n</ol>\n<h1><span style=\"font-weight: 400;\">Present and Ongoing life​​</span></h1>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Toward God</span>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Seeking</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Prayer</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Hoping</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">God</span></li>\n</ol>\n</li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Toward Others</span>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Proclaiming</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Proclaiming</span></li>\n</ol>\n</li>\n</ol>\n',
				studyGuide: '<h1><span style=\"font-weight: 400;\">Examining the text &amp; our hearts:</span></h1>\n<ol>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">What specific aspects</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">When the psalmist looks back</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">When the psalmist looks to the future</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">When people contemplate</span></li>\n<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">As Christians, what should</span></li>\n</ol>\n'
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
						const message = val.acf;
						return {
							title: message.title,
							seriesName: message.series_name,
							seriesImage: message.series_image,
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
