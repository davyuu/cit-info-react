import React from 'react'
import HeaderBar from "../components/HeaderBar";
import * as colors from './../constants/colors';
import './Connect.css';

class Connect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
		}
	}

	onConnectFormSubmit() {
		console.log(this.state.firstName);
	}

	render() {
		return (
			<div className="Connect">
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Latest Message'}
				/>
				<label className="Connect-form-label">
					<span className="Connect-form-required">*</span> First Name:
					<input
						className="Connect-form-input"
						type="text"
						value={this.state.firstName}
						onChange={(e) => this.setState({firstName: e.target.value})}
					/>
				</label>
				<label className="Connect-form-label">
					<span className="Connect-form-required">*</span> Last Name:
					<input
						className="Connect-form-input"
						type="text"
						value={this.state.lastName}
						onChange={(e) => this.setState({lastName: e.target.value})}
					/>
				</label>
				<label className="Connect-form-label">
					<span className="Connect-form-required">*</span> Email:
					<input
						className="Connect-form-input"
						type="text"
						value={this.state.email}
						onChange={(e) => this.setState({email: e.target.value})}
					/>
				</label>
				<button
					className="Connect-form-submit"
					onClick={() => this.onConnectFormSubmit()}
				>
					Submit
				</button>
			</div>
		)
	}
}

const styles = {
	container: {

	},
	formLabel: {
		display: 'block',
		margin: 5,
		fontSize: 16,
	},
	formRequired: {
		color: colors.RED,
	},
	formInput: {
		marginLeft: 10,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: colors.LIGHT_LIGHT_GRAY,
	},
	formSubmit: {
		margin: 10,
		padding: 5,
		fontSize: 16,
		backgroundColor: colors.WHITE,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: colors.LIGHT_LIGHT_GRAY,
	},
}

export default Connect
