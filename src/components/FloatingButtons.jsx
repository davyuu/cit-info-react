import React from 'react'
import PropTypes from 'prop-types';
import images from './../images/images'
import './FloatingButtons.css'

class FloatingButtons extends React.Component {
  render() {
    return (
      <div className='floating-buttons'>
        <img
          className='floating-btn-img'
          src={images.arrowLeftWhite}
          onClick={() => this.props.leftClicked()}
        />
        <img
          className='floating-btn-img'
          src={images.arrowRightWhite}
          onClick={() => this.props.rightClicked()}
        />
      </div>
    )
  }
}

FloatingButtons.propTypes = {
  leftClicked: PropTypes.func.isRequired,
  rightClicked: PropTypes.func.isRequired
};

export default FloatingButtons
