import React from 'react'
import PropTypes from 'prop-types';
import images from './../images/images'
import './FloatingButtons.css'

const opacityClickable = 0.9;
const opacityHidden = 0.1;

class FloatingButtons extends React.Component {
  render() {
    const leftOpacity = this.props.leftClickable ? opacityClickable : opacityHidden;
    const rightOpacity = this.props.rightClickable ? opacityClickable : opacityHidden;

    return (
      <div className='floating-buttons'>
        <img
          className='floating-btn-img'
          style={{opacity: leftOpacity}}
          src={images.arrowLeftWhite}
          onClick={() => this.props.leftClicked()}
        />
        <img
          className='floating-btn-img'
          style={{opacity: rightOpacity}}
          src={images.arrowRightWhite}
          onClick={() => this.props.rightClicked()}
        />
      </div>
    )
  }
}

FloatingButtons.propTypes = {
  leftClicked: PropTypes.func.isRequired,
  rightClicked: PropTypes.func.isRequired,
  leftClickable: PropTypes.bool.isRequired,
  rightClickable: PropTypes.bool.isRequired
};

export default FloatingButtons
