import React from 'react'
import PropTypes from 'prop-types';
import images from './../images/images'
import './FloatingButtons.scss'

const opacityClickable = 0.9;
const opacityHidden = 0.1;

class FloatingButtons extends React.Component {
  constructor() {
    super()
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
  }

  handleButtonPress () {
    if (this.props.longClicked) {
      this.buttonPressTimer = setTimeout(() => this.props.longClicked(), 600);
    }
  }

  handleButtonRelease () {
    if (this.buttonPressTimer) {
      clearTimeout(this.buttonPressTimer);
    }
  }

  render() {
    const leftOpacity = this.props.leftClickable ? opacityClickable : opacityHidden;
    const rightOpacity = this.props.rightClickable ? opacityClickable : opacityHidden;

    return (
      <div className='floating-buttons'>
        <img
          style={{opacity: leftOpacity}}
          src={images.arrowLeftWhite}
          onClick={() => this.props.leftClicked()}
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease}
        />
        <img
          style={{opacity: rightOpacity}}
          src={images.arrowRightWhite}
          onClick={() => this.props.rightClicked()}
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease}
        />
      </div>
    )
  }
}

FloatingButtons.propTypes = {
  leftClicked: PropTypes.func.isRequired,
  rightClicked: PropTypes.func.isRequired,
  longClicked: PropTypes.func,
  leftClickable: PropTypes.bool.isRequired,
  rightClickable: PropTypes.bool.isRequired,
};

export default FloatingButtons
