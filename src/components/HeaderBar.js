import React from 'react'
import * as colors from "./../constants/colors";
import images from './../images/images';

class HeaderBar extends React.Component {
	render() {
		return (
			<div style={styles.headerBar}>
				<img
					style={styles.goBack}
					src={images.icArrowLeftWhite}
					onClick={this.props.goBack}
				/>
				<div style={styles.headerTitle}>{this.props.title}</div>
				<div style={styles.goBack}/>
			</div>
		)
	}
}

const styles = {
	headerBar: {
		height: 50,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		backgroundColor: colors.PURPLE,
	},
	goBack: {
		height: 32,
		width: 32,
		padding: 4,
		margin: 5,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '500',
		margin: 'auto',
		color: colors.WHITE,
	},
}

export default HeaderBar
