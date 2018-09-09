import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import Alert from 'react-s-alert'
import base64 from 'base-64'
import {RingLoader} from 'react-spinners'

import HeaderBar from '../components/HeaderBar'
import routes from '../constants/routes'
import * as NetworkUtils from '../utils/NetworkUtils'
import * as Utils from '../utils/Utils'
import * as colors from '../constants/colors'

import 'react-select/dist/react-select.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import './Volunteer.css'

const themeColor = colors.VOLUNTEER_THEME;
const options = [{
  value: 'kids',
  label: 'Kids'
}, {
  value: 'greeting',
  label: 'Greeting'
}, {
  value: 'cafe',
  label: 'Cafe'
}, {
  value: 'ushering',
  label: 'Ushering'
}, {
  value: 'parking',
  label: 'Parking'
}, {
  value: 'youth',
  label: 'Youth'
}, {
  value: 'worship',
  label: 'Worship'
}, {
  value: 'production',
  label: 'Production'
}, {
  value: 'creative',
  label: 'Creative'
}, {
  value: 'connections',
  label: 'Connections'
}];

const alertOptions = {
	offset: 25,
	position: 'top right',
	theme: 'light',
	time: 1500,
	transition: 'fade'
};

class Volunteer extends React.Component {
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
          this.sendToSheets()
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
		if(!Utils.isValidEmail(email)) {
			this.showError('Please enter a valid email');
			isValid = false;
		}
		if(!Utils.isValidPhoneNumber(phone)) {
			this.showError('Please enter a valid phone number');
			isValid = false;
		}
		if(description === '') {
			this.showError('Please select a description');
			isValid = false;
		}
		return isValid;
	}


  sendToSheets() {
    const url = `https://script.google.com/macros/s/AKfycbxuFGgV8bYE_6X0Hozof7mXLOJ0b2mDWJfhV7o_XTSa8t1_WcfI/exec`;
    const {firstName, lastName, email, phone, description, message} = this.state;
    const data = {
      type: 'volunteer',
      firstName,
      lastName,
      email,
      phone,
      description,
      message,
      subscribe: ''
    };
    const fields = [
      'type',
      'firstName',
      'lastName',
      'email',
      'phone',
      'description',
      'message',
      'subscribe'
    ];
    data.formDataNameOrder = JSON.stringify(fields);
    data.formGoogleSheetName = "responses";
    const body = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    const successHandler = () => {
      this.showSuccess();
    };
    const errorHandler = () => {
      this.showError('An error occurred')
    };

    NetworkUtils.postRequest(url, successHandler, errorHandler, body, headers)
  }

  hideErrors() {
    this.msg.removeAll()
  }

  showError(msg) {
    this.msg.error(msg, {
      onClose: () => {
        this.setState({loading: false});
      }
    })
  }

  showSuccess() {
    this.setState({loading: false});
    this.msg.success('Successfully sent', {
      onClose: () => {
        this.props.history.push(routes.confirm);
      }
    })
  }

  render() {
    return (
      <div className="volunteer">
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={'Volunteer'}
          color={themeColor}
        />
        <div className='volunteer-container'>
          <h1 className='volunteer-title'>Join A Team</h1>
          <p className='volunteer-description'>Our teams are dedicated to bringing our very best to our God. We would love for you to become part of a team and discover all that God has purposed for your life.</p>
          <form className='volunteer-form' autoComplete='on'>
            <h2 className='volunteer-form-label'>Name</h2>
            <div className='connect-form-row'>
              <input
                className='volunteer-form-input left'
                type='text'
                name="first name"
                autoComplete="given-name"
                placeholder='First name'
                value={this.state.firstName}
                onChange={(e) => this.setState({firstName: e.target.value})}
              />
              <input
                className='volunteer-form-input right'
                type='text'
                name="last name"
                autoComplete="family-name"
                placeholder='Last name'
                value={this.state.lastName}
                onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </div>
            <h2 className='volunteer-form-label'>Email</h2>
            <div className='connect-form-row'>
              <input
                className='volunteer-form-input'
                type='text'
                name='email'
                autoComplete="email"
                placeholder='youremailaddress@example.com'
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <h2 className='volunteer-form-label'>Phone</h2>
            <div className='connect-form-row'>
              <input
                className='volunteer-form-input'
                type='number'
                name='phone'
                autoComplete="tel"
                placeholder='4161234567'
                value={this.state.phone}
                onChange={(e) => this.setState({phone: e.target.value})}
              />
            </div>
            <h2 className='volunteer-form-label'>Which team would you like to learn about</h2>
            <div className='connect-form-row'>
              <Select
                className='volunteer-form-select'
                simpleValue
                name="description"
                options={options}
                onChange={(value) => this.setState({description: value})}
                value={this.state.description}
                clearable={false}
                searchable={false}
                placeholder='Choose one option'
              />
            </div>
            <h2 className='volunteer-form-label'>Message</h2>
            <div className='connect-form-row'>
              <textarea
                className='volunteer-form-input textarea'
                type='text'
                name='message'
                placeholder='Add your message (optional)'
                value={this.state.message}
                onChange={(e) => this.setState({message: e.target.value})}
              />
            </div>
            <div
              className='volunteer-form-submit'
              style={{backgroundColor: themeColor}}
              onClick={() => this.onConnectFormSubmit()}
            >
              Get Connected
            </div>
          </form>
        </div>
        <div
          className='volunteer-loading'
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

export default Volunteer
