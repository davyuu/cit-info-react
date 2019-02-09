import React from 'react'
import DynamicLink from './DynamicLink'
import './Section.scss'

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
	      <div className='img' dangerouslySetInnerHTML={{__html: this.props.image}} />
        <label>
          {this.props.title}
        </label>
      </DynamicLink>
    )
  }
}

export default Section
