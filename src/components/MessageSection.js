import React from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

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
      <div>
        <h1>{event.title}</h1>
        <h2>{event.series}</h2>
        <div className="content" dangerouslySetInnerHTML={{__html: event.notes}}></div>
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
