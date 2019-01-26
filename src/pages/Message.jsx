import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import Modal from 'react-modal'
import Picker from 'rmc-picker'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import './Message.css'
import 'rmc-picker/assets/index.css';

const themeColor = colors.MESSAGE_THEME;
const MESSAGE_KEY = 0;
const STUDY_KEY = 1;
const SUPPLEMENT_KEY = 2;
const SONGS_KEY = 3;

Modal.setAppElement('#app')

window.oncontextmenu = (event) => {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      currentMessage: 0,
      currentTab: MESSAGE_KEY,
      messages: []
    };
    this.goNextWeek = this.goNextWeek.bind(this);
    this.goPreviousWeek = this.goPreviousWeek.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectWeek = this.selectWeek.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillMount() {
    let dataURL = 'https://mycit.info/wp-json/wp/v2/messages';
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
            supplementaryMaterial: message.supplementary_material,
            setList: message.set_list,
            childrenSetList: message.children_set_list,
          };
        })
      })
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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

  isFirstWeek() {
    return this.state.currentMessage === 0;
  }

  isLastWeek() {
    return this.state.currentMessage >= this.state.messages.length - 1;
  }

  selectWeek() {
    this.openModal();
  }

  onDateChange(value) {
    this.setState({currentMessage: value})
  }

  render() {
    let content;
    const {messages, currentMessage, currentTab} = this.state
    if (messages.length === 0) {
      content = <Loading/>;
    } else {
      const message = messages[currentMessage];

      const tabClass = (index) => {
        return classNames({
          'message-tab': true,
          'message-active-tab': currentTab === index,
          'message-inactive-tab': currentTab !== index
        });
      }

      let tabContent;
      if(currentTab === MESSAGE_KEY) {
        const number = message.messageNumber ? `#${message.messageNumber}` : null
        const verses = message.messageChapter ? `: ${message.messageChapter}` : null
        tabContent = (
          <div className='message-container'>
            <h1 className='message-title' style={{color: themeColor}}>{message.title}</h1>
            <p className='message-date'>{message.date.format('dddd MMMM DD, YYYY')}</p>
            <p className='message-number-chapter'>{number}{verses}</p>
            <div className='message-html' dangerouslySetInnerHTML={{__html: message.outline}}/>
          </div>
        )
      } else if(currentTab === STUDY_KEY) {
        const verses = message.messageChapter ? <p className='study-chapter'>Read: {message.studyChapter}</p> : null
        tabContent = (
          <div className='message-container'>
            <h1 className='study-title' style={{color: themeColor}}>Examining the text & our hearts:</h1>
            {verses}
            <div className='study-html' dangerouslySetInnerHTML={{__html: message.studyGuide}}/>
          </div>
        )
      } else if(currentTab === SUPPLEMENT_KEY) {
        tabContent = (
          <div className='message-container'>
            <div className='message-html' dangerouslySetInnerHTML={{__html: message.supplementaryMaterial}}/>
          </div>
        )
      } else if(currentTab === SONGS_KEY) {
        let childrenSetList;
        if(message.childrenSetList) {
          childrenSetList = (
            <div>
              <div className='song-divider'/>
              <h1 className='song-title' style={{color: themeColor}}>Children's set list:</h1>
              <div className='song-html' dangerouslySetInnerHTML={{__html: message.childrenSetList}}/>
            </div>
          )
        }
        tabContent = (
          <div className='message-container'>
            <h1 className='song-title' style={{color: themeColor}}>This week's set list:</h1>
            <div className='song-html' dangerouslySetInnerHTML={{__html: message.setList}}/>
            {childrenSetList}
          </div>
        )
      }

      let supplementTab;
      if(message.supplementaryMaterial) {
        supplementTab = (
          <div className={tabClass(SUPPLEMENT_KEY)} onClick={() => this.setState({currentTab: SUPPLEMENT_KEY})}>
            SUPPLEMENT
          </div>
        )
      }

      content = (
        <div className='message-content'>
          <div className='message-header-container'>
            <img className='message-header-img' src={message.seriesImage}/>
            <div className='message-header-tabs'>
              <div className={tabClass(MESSAGE_KEY)} onClick={() => this.setState({currentTab: MESSAGE_KEY})}>
                MESSAGE
              </div>
              <div className={tabClass(STUDY_KEY)} onClick={() => this.setState({currentTab: STUDY_KEY})}>
                STUDY GUIDE
              </div>
              {supplementTab}
              <div className={tabClass(SONGS_KEY)} onClick={() => this.setState({currentTab: SONGS_KEY})}>
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
          longClicked={this.selectWeek}
          leftClickable={!this.isLastWeek()}
          rightClickable={!this.isFirstWeek()}
        />
				{content}
        <Modal
          className='message-modal'
          overlayClassName='message-modal-overlay'
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          onClick={() => console.log('test')}
        >
          <Picker
            selectedValue={currentMessage}
            onValueChange={this.onDateChange}
          >
            {messages.map((message, i) => {
              return (
                <Picker.Item
                  key={i}
                  className='message-modal-picker-item'
                  value={i}
                >
                  {message.date.format('dddd MMMM DD, YYYY')}
                </Picker.Item>
              )
            })}
          </Picker>
        </Modal>
			</div>
		)
  }
}

export default Message
