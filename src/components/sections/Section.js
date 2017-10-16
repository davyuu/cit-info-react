import React from 'react'
import {Collapse} from 'react-collapse';
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
        <div
          className="Section-title"
          onClick={() => this.setState({
            isOpen: !this.state.isOpen
          })}
        >
          {this.props.title}
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
