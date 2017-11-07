import React from 'react'
import {Link} from 'react-router-dom'
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
      <Link
        className='section'
        to={this.props.linkTo}
      >
        <img
          className='section-img'
          src={this.props.image}
        />
        <h1 className='section-title'>
          {this.props.title}
        </h1>
      </Link>
    )
  }
}

export default Section
