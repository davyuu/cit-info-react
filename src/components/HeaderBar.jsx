import React from 'react'
import images from './../images/images'
import './HeaderBar.scss'

class HeaderBar extends React.Component {
	render() {
    let image;
    if (this.props.image) {
      image = (
        <div className='img' dangerouslySetInnerHTML={{__html: this.props.image}} />
      )
    }

		return (
			<div
				className='header-bar'
				style={{backgroundColor: this.props.color}}
			>
				<img
					src={images.arrowLeftWhite}
					onClick={this.props.goBack}
				/>
        <div className='center'>
          {image}
				  <h1>{this.props.title}</h1>
        </div>
				<div className='right'/>
			</div>
		)
	}
}

export default HeaderBar
