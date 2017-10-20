import React from 'react'
import {Link} from 'react-router-dom'
import * as colors from './../constants/colors';
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
        style={styles.section}
        to={this.props.linkTo}
      >
        <img 
          style={styles.img}
          src={this.props.image} 
        />
        <h1 style={styles.title}>
          {this.props.title}
        </h1>
      </Link>
    )
  }
}

const styles = {
  section: {
    height: 90,
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    textDecoration: 'none', 
    boxShadow: 'inset 0px 1px 1px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.24)',
  },
  img: {
    margin: 15,
    height: 60,
    width: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.BLACK,
  }
}

export default Section
