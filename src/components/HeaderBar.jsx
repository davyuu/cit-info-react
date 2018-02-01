import React from 'react'
import images from './../images/images'
import './HeaderBar.css'

class HeaderBar extends React.Component {
	render() {
		return (
			<div
				className='header-bar'
				style={{backgroundColor: this.props.color}}
			>
				<img
					className='header-bar-back-button'
					src={images.arrowLeftWhite}
					onClick={this.props.goBack}
				/>
				<div className='header-bar-title'>{this.props.title}</div>
				<div className='header-bar-right'/>
			</div>
		)
	}
}

export default HeaderBar
