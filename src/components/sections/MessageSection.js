import React from 'react'
import './MessageSection.css';

class MessageSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentmessage: 0,
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
      return <div>Loading</div>
    }
    const message = this.state.messages[this.state.currentmessage];
    return (
      <div className="Message">
        <h1 className="Message-title">{message.title}</h1>
        <div className="Message-outline" dangerouslySetInnerHTML={{__html: message.outline}}></div>
        <div className="Message-study" dangerouslySetInnerHTML={{__html: message.study_guide}}></div>
      </div>
    )
  }
}

export default MessageSection
