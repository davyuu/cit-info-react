import React from 'react'
import images from './../images/images'
import './HeaderBar.scss'

class HeaderBar extends React.Component {
	render() {
		return (
			<div
				className='header-bar'
				style={{backgroundColor: this.props.color}}
			>
				<img
					src={images.arrowLeftWhite}
					onClick={this.props.goBack}
				/>
				<h1>{this.props.title}</h1>
				<div className='right'/>
			</div>
		)
	}
}

export default HeaderBar
