import React from 'react'
import {Link} from 'react-router-dom'

class DynamicButton extends React.Component {
  render() {
    if (this.props.external) {
      return (
        <a
          className={this.props.className}
          href={this.props.linkTo}
          target="_blank"
        >
          {this.props.children}
        </a>
      )
    } else if (this.props.onClick) {
      return (
        <button
          className={this.props.className}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </button>
      )
    } else {
      return (
        <Link
          className={this.props.className}
          to={this.props.linkTo}
        >
  	      {this.props.children}
        </Link>
      )
    }
  }
}

export default DynamicButton
