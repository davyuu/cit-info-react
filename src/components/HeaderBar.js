import React from 'react'
import images from './../images/images';
import './HeaderBar.css';

class HeaderBar extends React.Component {
	render() {
		return (
			<div className='header-bar'>
				<img
					className='back-button'
					src={images.icArrowLeftWhite}
					onClick={this.props.goBack}
				/>
				<div className='header-title'>{this.props.title}</div>
				<div className='back-button'/>
			</div>
		)
	}
}

export default HeaderBar
