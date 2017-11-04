import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import HeaderBar from '../components/HeaderBar';
import * as Utils from '../utils/Utils'
import 'react-select/dist/react-select.css';
import './Connect.css';

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
const alertOptions = {
	offset: 10,
	position: 'top right',
	theme: 'light',
	time: 1500,
	transition: 'fade'
}

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
		if(this.isFormValid()) {
			const {name, email, phone, description, message} = this.state;
			const data = {
				name,
				email,
				phone,
				description,
				message
			};
			const fields = [
				'name',
				'email',
				'phone',
				'description',
				'message',
			]
		  data.formDataNameOrder = JSON.stringify(fields);
			data.formGoogleSheetName = "responses";
			const encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    	}).join('&')

			fetch('https://script.google.com/macros/s/AKfycbxuFGgV8bYE_6X0Hozof7mXLOJ0b2mDWJfhV7o_XTSa8t1_WcfI/exec', {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: encoded
			}).then((res) => {
				console.log(res)
      	if (res.status === 200) {
					this.msg.success('Successfully sent', {
						onClose: this.props.history.goBack
					})
        } else {
					this.msg.error('An error occured')
        }
	    }).catch((err) => {
        console.log(err);
				this.msg.error('An error occured')
	    });
		}
	}

	isFormValid() {
		const {name, email, phone, description, message} = this.state;
		this.msg.removeAll()
		const isValid = true;
		if(name === '') {
			this.msg.error('Please enter your name')
			isValid = false;
		}
		if(email === '') {
			this.msg.error('Please enter your email')
			isValid = false;
		}
		else if(!Utils.isValidEmail(email)) {
			this.msg.error('Please enter a valid email')
			isValid = false;
		}
		if(phone !== '' && !Utils.isValidPhoneNumber(phone)) {
			this.msg.error('Please enter a valid phone number')
			isValid = false;
		}
		if(description === '') {
			this.msg.error('Please select a description')
			isValid = false;
		}
		return isValid;
	}

	render() {
		return (
			<div className='connect'>
				<AlertContainer ref={a => this.msg = a} {...alertOptions} />
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Connect'}
					color={themeColor}
				/>
				<div className='connect-container'>
					<h1 className='connect-title'>Get connected with us</h1>
					<p className='connect-description'>We know that it's important for you to find a church that really fits. We can connect you with one of our pastors to answer any questions you might have about our church's beliefs, community, and culture.</p>
				  <div className='connect-form'>
						<h2 className='connect-form-label'>Name</h2>
						<input
							className='connect-form-input'
							type='text'
							name='name'
							placeholder='Your name'
							value={this.state.name}
							onChange={(e) => this.setState({name: e.target.value})}
						/>
						<h2 className='connect-form-label'>Email</h2>
						<input
							className='connect-form-input'
							type='text'
							name='email'
							placeholder='youremailaddress@example.com'
							value={this.state.email}
							onChange={(e) => this.setState({email: e.target.value})}
						/>
						<h2 className='connect-form-label'>Phone (Optional)</h2>
						<input
							className='connect-form-input'
							type='number'
							name='phone'
							placeholder='1234567890'
							value={this.state.phone}
							onChange={(e) => this.setState({phone: e.target.value})}
						/>
						<h2 className='connect-form-label'>Which best describes you?</h2>
						<Select
							className='connect-form-select'
							autoFocus
							simpleValue
							name="description"
							options={options}
							onChange={(value) => this.setState({description: value})}
							value={this.state.description}
							clearable={false}
							searchable={false}
							placeholder='Choose one option'
						/>
						<h2 className='connect-form-label'>Message</h2>
						<textarea
							className='connect-form-textarea'
							type='text'
							name='message'
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
			</div>
		)
	}
}

export default Connect
