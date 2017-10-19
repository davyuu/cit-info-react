import React from 'react'
import {Collapse} from 'react-collapse';
import images from './../../images/images.js';
import './Section.css';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render() {
    return (
      <div className="Section">
        <div className="Section-btn">
          <img 
            className="Section-img"
            src={images.icMicBlack} 
          />
          <div
            className="Section-title"
            onClick={() => this.setState({
              isOpen: !this.state.isOpen
            })}
          >
            {this.props.title}
          </div>
        </div>
        <Collapse isOpened={this.state.isOpen}>
          <div className="Section-content">
            {this.props.content}
          </div>
        </Collapse>
      </div>
    )
  }
}

export default Section
