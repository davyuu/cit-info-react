import React from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './MessageSection.css';

class MessageSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvent: 0
    }
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    const event = this.props.data.allEvents[this.state.currentEvent];
    console.log("david test");
    console.log(event);
    return (
      <div className="Message">
        <h1 className="Message-title">{event.title}</h1>
        <h2 className="Message-series">{event.series}</h2>
        <div className="Message-outline" dangerouslySetInnerHTML={{__html: event.notes}}></div>
        <div className="Message-notes"></div>
      </div>
    )
  }
}

const eventQuery = gql `query allEvents {
  allEvents(orderBy: createdAt_DESC) {
    title
    series
    notes
    songs
    date
  }
}`

export default graphql(eventQuery)(MessageSection)
