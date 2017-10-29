import React from 'react';
import classNames from 'classnames';
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
			<div className='content'>
				<h1 className='title'>{message.title}</h1>
				<p className='number-chapter'>Message {message.messageNumber} - {message.messageChapter}</p>
				<div className='outline' dangerouslySetInnerHTML={{__html: message.outline}}/>
			</div>
		)
		const studyGuide = (
			<div className='content'>
				<h1 className='title'>{message.title}</h1>
				<p className='number-chapter'>Message {message.messageNumber} - {message.messageChapter}</p>
				<div className='study-guide' dangerouslySetInnerHTML={{__html: message.studyGuide}}/>
			</div>
		);
		const currentTab = this.state.currentTab;
		const messageTabClass = classNames({
			'tab': true,
			'active-tab': currentTab === 0,
			'inactive-tab': currentTab === 1
		});
		const studyTabClass = classNames({
			'tab': true,
			'active-tab': currentTab === 1,
			'inactive-tab': currentTab === 0
		});
		return (
			<div>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Latest Message'}
				/>
				<div className='header-container'>
					<img
						className='header-img'
						src={message.seriesImage}
					/>
					<div className='header-tabs'>
						<div
							className={messageTabClass}
							onClick={() => this.setState({currentTab: 0})}
						>
							MESSAGE OUTLINE
						</div>
						<div
							className={studyTabClass}
							onClick={() => this.setState({currentTab: 1})}
						>
							STUDY GUIDE
						</div>
					</div>
				</div>
				<div className='container'>
					{currentTab === 0 ? messageOutline : studyGuide}
				</div>
			</div>
		)
	}
}

export default Message
