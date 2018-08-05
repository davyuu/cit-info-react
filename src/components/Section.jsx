import React from 'react'
import DynamicLink from './DynamicLink'
import './Section.css'

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render() {
    return (
      <DynamicLink
        className='section'
        linkTo={this.props.linkTo}
        external={this.props.external}
      >
	      <div className='section-img' dangerouslySetInnerHTML={{__html: this.props.image}} />
        <h1 className='section-title'>
          {this.props.title}
        </h1>
      </DynamicLink>
    )
  }
}

export default Section
