import React from 'react'
import classNames from 'classnames'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import './Message.css'

const themeColor = colors.MESSAGE_THEME;

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: 0,
      currentTab: 0,
      messages: []
    };
    this.goNextWeek = this.goNextWeek.bind(this);
    this.goPreviousWeek = this.goPreviousWeek.bind(this);
  }

  componentWillMount() {
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
            studyGuide: message.study_guide
          };
        })
      })
    })
  }

  isFirstWeek() {
    return this.state.currentMessage === 0;
  }

  isLastWeek() {
    return this.state.currentMessage >= this.state.messages.length - 1;
  }

  goNextWeek() {
    const currentMessage = this.state.currentMessage;
    if(!this.isFirstWeek()) {
    	this.setState({currentMessage: currentMessage - 1})
    }
  }

  goPreviousWeek() {
    const currentMessage = this.state.currentMessage;
    if(!this.isLastWeek()) {
      this.setState({currentMessage: currentMessage + 1})
    }
  }

  render() {
    let content;
    if (this.state.messages.length === 0) {
      content = <Loading/>;
    } else {
      const message = this.state.messages[this.state.currentMessage];
      const currentTab = this.state.currentTab;

      const messageTabClass = classNames({
        'message-tab': true,
        'message-active-tab': currentTab === 0,
        'message-inactive-tab': currentTab === 1
      });
      const studyTabClass = classNames({
        'message-tab': true,
        'message-active-tab': currentTab === 1,
        'message-inactive-tab': currentTab === 0
      });

      content = (
        <div className='message-content'>
          <div className='message-header-container'>
            <img className='message-header-img' src={message.seriesImage}/>
            <div className='message-header-tabs'>
              <div className={messageTabClass} onClick={() => this.setState({currentTab: 0})}>
                MESSAGE OUTLINE
              </div>
              <div className={studyTabClass} onClick={() => this.setState({currentTab: 1})}>
                STUDY GUIDE
              </div>
            </div>
          </div>
          <div className='message-container'>
            <h1 className='message-title' style={{
              color: themeColor
            }}>{message.title}</h1>
            <p className='message-number-chapter'>Message {message.messageNumber}
              - {message.messageChapter}</p>
            <div className='message-html' dangerouslySetInnerHTML={{
              __html: currentTab === 0
                ? message.outline
                : message.studyGuide
            }}/>
          </div>
        </div>
      )
    }

    return (
			<div className='message'>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Latest Message'}
					color={themeColor}
				/>
        <FloatingButtons
          leftClicked={this.goPreviousWeek}
          rightClicked={this.goNextWeek}
          leftClickable={!this.isLastWeek()}
          rightClickable={!this.isFirstWeek()}
        />
				{content}
			</div>
		)
  }
}

export default Message
