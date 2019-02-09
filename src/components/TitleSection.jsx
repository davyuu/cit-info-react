import React from 'react'
import PropTypes from 'prop-types';
import './TitleSection.css'

class TitleSection extends React.Component {
	render() {
		return (
      <div className='title-container'>
        <h1 className='title'>{this.props.title}</h1>
        <p className='description'>{this.props.description}</p>
      </div>
    )
  }
}

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TitleSection