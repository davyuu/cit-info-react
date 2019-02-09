import React from 'react'
import PropTypes from 'prop-types';
import './TitleSection.scss'

class TitleSection extends React.Component {
	render() {
		return (
      <div className='title-section'>
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
      </div>
    )
  }
}

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TitleSection