import React from 'react'
import {Link} from 'react-router-dom'

class DynamicLink extends React.Component {
  render() {
    if (this.props.external) {
      return (
        <a
          className='section'
          href={this.props.linkTo}
          target="_blank"
        >
          {this.props.children}
        </a>
      )
    } else {
      return (
        <Link
          className='section'
          to={this.props.linkTo}
        >
  	      {this.props.children}
        </Link>
      )
    }
  }
}

export default DynamicLink
