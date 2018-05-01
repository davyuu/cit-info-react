import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
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
            date: moment(message.date, 'YYYY/MM/DD'),
            messageNumber: message.message_number,
            messageChapter: message.message_chapter,
            outline: message.outline,
            studyChapter: message.study_chapter,
            studyGuide: message.study_guide,
            setList: message.set_list,
            childrenSetList: message.children_set_list,
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

      const tabClass = (index) => {
        return classNames({
          'message-tab': true,
          'message-active-tab': currentTab === index,
          'message-inactive-tab': currentTab !== index
        });
      }

      let tabContent;
      if(currentTab === 0) {
        tabContent = (
          <div className='message-container'>
            <h1 className='message-title' style={{color: themeColor}}>{message.title}</h1>
            <p className='message-date'>{message.date.format('dddd MMMM DD, YYYY')}</p>
            <p className='message-number-chapter'>#{message.messageNumber}: {message.messageChapter}</p>
            <div className='message-html' dangerouslySetInnerHTML={{__html: message.outline}}/>
          </div>
        )
      } else if(currentTab === 1) {
        tabContent = (
          <div className='message-container'>
            <h1 className='study-title' style={{color: themeColor}}>Examining the text & our hearts:</h1>
            <p className='study-chapter'>Read: {message.studyChapter}</p>
            <div className='study-html' dangerouslySetInnerHTML={{__html: message.studyGuide}}/>
          </div>
        )
      } else if(currentTab === 2) {
        tabContent = (
          <div className='message-container'>
            <h1 className='song-title' style={{color: themeColor}}>This week's set list:</h1>
            <div className='song-html' dangerouslySetInnerHTML={{__html: message.setList}}/>
            <div className='song-divider'/>
            <h1 className='song-title' style={{color: themeColor}}>Children's set list:</h1>
            <div className='song-html' dangerouslySetInnerHTML={{__html: message.childrenSetList}}/>
          </div>
        )
      }

      content = (
        <div className='message-content'>
          <div className='message-header-container'>
            <img className='message-header-img' src={message.seriesImage}/>
            <div className='message-header-tabs'>
              <div className={tabClass(0)} onClick={() => this.setState({currentTab: 0})}>
                MESSAGE OUTLINE
              </div>
              <div className={tabClass(1)} onClick={() => this.setState({currentTab: 1})}>
                STUDY GUIDE
              </div>
              <div className={tabClass(2)} onClick={() => this.setState({currentTab: 2})}>
                SONGS
              </div>
            </div>
          </div>
          {tabContent}
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
