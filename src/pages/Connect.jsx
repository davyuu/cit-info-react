import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import Alert from 'react-s-alert'
import base64 from 'base-64'
import {RingLoader} from 'react-spinners'

import HeaderBar from '../components/HeaderBar'
import routes from '../constants/routes'
import * as Utils from '../utils/Utils'
import * as colors from '../constants/colors'

import 'react-select/dist/react-select.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import './Connect.css'

const themeColor = colors.CONNECT_THEME;
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
];
const alertOptions = {
	offset: 25,
	position: 'bottom right',
	theme: 'light',
	time: 1500,
	transition: 'fade'
};

const app_id = '8a253088577f90fe8abd972f3d0d8a7f215a09368606dd69ce2807e1286f11e5';
const secret = '84c12963c49f42d6b2a226f73b36dead2e8157b0e61535e18dfa58df0d6256b3';
const headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode(`${app_id}:${secret}`));

class Connect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			description: '',
			message: '',
			loading: false
		}
	}

	onConnectFormSubmit() {
		if(this.isFormValid()) {
			if(!this.state.loading) {
				this.setState({loading: true});
				this.createPerson();
			}
		}
	}

	isFormValid() {
		const {firstName, lastName, email, phone, description} = this.state;
		this.hideErrors();
		let isValid = true;
		if(firstName === '') {
			this.showError('Please enter your first name');
			isValid = false;
		}
		if(lastName === '') {
			this.showError('Please enter your last name');
			isValid = false;
		}
		if(email === '') {
			this.showError('Please enter your email');
			isValid = false;
		}
		else if(!Utils.isValidEmail(email)) {
			this.showError('Please enter a valid email');
			isValid = false;
		}
		if(phone !== '' && !Utils.isValidPhoneNumber(phone)) {
			this.showError('Please enter a valid phone number');
			isValid = false;
		}
		if(description === '') {
			this.showError('Please select a description');
			isValid = false;
		}
		return isValid;
	}

	createPerson() {
	  const dataURL = 'https://api.planningcenteronline.com/people/v2/people';
		const {firstName, lastName, description, message} = this.state;

		const body = {
			data: {
				type: 'Person',
				attributes: {
					first_name: firstName,
					last_name: lastName
				}
			}
		};
    fetch(dataURL, {
			headers: headers,
			method: 'post',
			body: JSON.stringify(body)
		})
  	.then(res => res.json())
    .then(res => {
			if (res.data && res.data.id) {
				console.log('successfully created person');
				this.createEmailForPerson(res.data.id)
			} else {
				console.log(res);
				this.showError('An error occurred')
			}
    })
		.catch(err => {
			console.log(err);
			this.showError('An error occurred')
		})
	}

	createEmailForPerson(personId) {
	  const dataURL = `https://api.planningcenteronline.com/people/v2/people/${personId}/emails`;
		const {email} = this.state;
		const body = {
			data: {
				type: 'Email',
				attributes: {
          address: email,
					location: "Home"
        },
			}
		};
    fetch(dataURL, {
			headers: headers,
			method: 'post',
			body: JSON.stringify(body)
		})
  	.then(res => res.json())
    .then(res => {
			if (res.data) {
				console.log('successfully created email');
				this.createPhoneNumberForPerson(personId);
			} else {
				console.log(res);
				this.showError('An error occurred')
			}
    })
		.catch(err => {
			console.log(err);
			this.showError('An error occurred')
		})
	}

	createPhoneNumberForPerson(personId) {
	  const dataURL = `https://api.planningcenteronline.com/people/v2/people/${personId}/phone_numbers`;
		const {phone} = this.state;
		if (!phone && phone === '') {
			this.sendToSheets();
			return;
		}
		const body = {
			data: {
				type: 'PhoneNumber',
				attributes: {
          number: phone,
          location: "Mobile",
        },
			}
		};
    fetch(dataURL, {
			headers: headers,
			method: 'post',
			body: JSON.stringify(body)
		})
  	.then(res => res.json())
    .then(res => {
			if (res.data) {
				console.log('successfully created phone');
				this.sendToSheets();
			} else {
				console.log(res);
				this.showError('An error occured')
			}
    })
		.catch(err => {
			console.log(err);
			this.showError('An error occured')
		})
	}

	sendToSheets() {
		const {firstName, lastName, email, phone, description, message} = this.state;
		const data = {
			firstName,
			lastName,
			email,
			phone,
			description,
			message
		};
		const fields = [
			'firstName',
			'lastName',
			'email',
			'phone',
			'description',
			'message',
		];
	  data.formDataNameOrder = JSON.stringify(fields);
		data.formGoogleSheetName = "responses";
		const encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  	}).join('&');

		fetch('https://script.google.com/macros/s/AKfycbxuFGgV8bYE_6X0Hozof7mXLOJ0b2mDWJfhV7o_XTSa8t1_WcfI/exec', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: encoded
		}).then((res) => {
			console.log(res);
    	if (res.status === 200) {
				this.showSuccess();
      } else {
				this.showError('An error occurred')
      }
    }).catch((err) => {
      console.log(err);
			this.showError('An error occurred')
    });
	}

	hideErrors() {
		this.msg.removeAll()
		// Alert.closeAll()
	}

	showError(msg) {
		this.msg.error(msg, {
			onClose: () => {
				this.setState({loading: false});
			}
		})
		// Alert.error(msg, {
		// 	position: 'bottom-right',
		//   effect: 'slide',
		// 	offset: 100,
		//   html: true
		// })
	}

	showSuccess() {
		this.setState({loading: false});
		this.msg.success('Successfully sent', {
			onClose: () => {
				this.props.history.push(routes.confirm);
			}
		})
		// Alert.success(msg, {
		// 	position: 'bottom-right',
		//   effect: 'slide',
		// 	offset: 100,
		//   html: true,
		// 	onClose
		// });
	}

	render() {
		return (
			<div>
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
							className='connect-form-input left'
							type='text'
							name="first name"
							placeholder='First name'
							value={this.state.firstName}
							onChange={(e) => this.setState({firstName: e.target.value})}
						/>
						<input
							className='connect-form-input right'
							type='text'
							name="last name"
							placeholder='Last name'
							value={this.state.lastName}
							onChange={(e) => this.setState({lastName: e.target.value})}
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
							placeholder='4161234567'
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
							className='connect-form-input textarea'
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
				<div
					className='connect-loading'
					style={{visibility: this.state.loading === true ? 'visible' : 'hidden'}}
				>
					<RingLoader
						color={themeColor}
						loading={true}
					/>
				</div>
        <Alert stack={true} timeout={1500}/>
			</div>
		)
	}
}

export default Connect
