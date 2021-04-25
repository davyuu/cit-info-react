import React from 'react'
import DynamicButton from './DynamicButton'
import './Section.scss'

class Section extends React.Component {
  render() {
    return (
      <DynamicButton
        className='section'
        onClick={this.props.onClick}
        linkTo={this.props.linkTo}
        external={this.props.external}
      >
	      {this.props.image && <div className='img' dangerouslySetInnerHTML={{__html: this.props.image}} />}
        {this.props.imageUrl && <img className='img' src={this.props.imageUrl} />}
        <label>{this.props.title}</label>
      </DynamicButton>
    )
  }
}

export default Section
