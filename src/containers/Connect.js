import React from 'react'
import Select from 'react-select'
import HeaderBar from '../components/HeaderBar';
import './Connect.css';
import 'react-select/dist/react-select.css';

const themeColor = '#3852ff';
const options = [{
		value: 'new church',
		label: 'I\'m looking for a new church'
	}, {
		value: 'new christian',
		label: 'I\'m a new christian'
	}, {
		value: 'interested',
		label: 'I\'m interested in knowing more about Christianity'
	}, {
		value: 'other',
		label: 'Other'
	}
]

class Connect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			phone: '',
			description: '',
			message: ''
		}
	}

	onConnectFormSubmit() {
		this.validateForm();
	}

	validateForm() {

	}

	render() {
		return (
			<div className='connect'>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Connect'}
					color={themeColor}
				/>
				<div className='connect-container'>
					<h1 className='connect-title'>Get connected with us</h1>
					<p className='connect-description'>We know that it's important for you to find a church that really fits. We can connect you with one of our pastors to answer any questions you might have about our church's beliefs, community, and culture.</p>
					<h2 className='connect-form-label'>Name</h2>
					<input
						className='connect-form-input'
						type='text'
						placeholder='Your name'
						value={this.state.name}
						onChange={(e) => this.setState({name: e.target.value})}
					/>
					<h2 className='connect-form-label'>Email</h2>
					<input
						className='connect-form-input'
						type='text'
						placeholder='youremailaddress@example.com'
						value={this.state.email}
						onChange={(e) => this.setState({email: e.target.value})}
					/>
					<h2 className='connect-form-label'>Phone (Optional)</h2>
					<input
						className='connect-form-input'
						type='text'
						placeholder='(123) 456-7890'
						value={this.state.phone}
						onChange={(e) => this.setState({phone: e.target.value})}
					/>
					<h2 className='connect-form-label'>Which best describes you?</h2>
					<Select
						className='connect-form-select'
						autoFocus
						simpleValue
						name="selected-state"
						options={options}
						onChange={(value) => this.setState({description: value})}
						value={this.state.description}
						clearable={false}
						searchable={false}
						// placeholder='Choose one option'
					/>
					<h2 className='connect-form-label'>Message</h2>
					<textarea
						className='connect-form-textarea'
						type='text'
						placeholder='Add your message (optional)'
						value={this.state.message}
						onChange={(e) => this.setState({message: e.target.value})}
					/>
					<div
						className='connect-form-submit'
						style={{backgroundColor: themeColor}}
						onClick={() => this.onConnectFormSubmit()}
					>
						Get Connected
					</div>
				</div>
			</div>
		)
	}
}

export default Connect
