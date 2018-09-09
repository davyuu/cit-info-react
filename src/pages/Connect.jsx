import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import Alert from 'react-s-alert'
import {RingLoader} from 'react-spinners'

import HeaderBar from '../components/HeaderBar'
import routes from '../constants/routes'
import * as NetworkUtils from '../utils/NetworkUtils'
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
  position: 'top right',
  theme: 'light',
  time: 1500,
  transition: 'fade'
};

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
      subscribe: false,
      loading: false
    }
  }

  onConnectFormSubmit() {
    if(this.isFormValid() && !this.state.loading) {
      this.setState({loading: true});
      this.createPerson();
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

  createPerson() {
    const url = 'https://api.planningcenteronline.com/people/v2/people';

    const body = JSON.stringify({
      data: {
        type: 'Person',
        attributes: {
          first_name: this.state.firstName,
          last_name: this.state.lastName
        }
      }
    });

    const successHandler = (res) => {
      this.createEmailForPerson(res.data.id)
    };
    const errorHandler = () => {
      this.showError('An error occurred')
    };

    NetworkUtils.postRequest(url, successHandler, errorHandler, body)
  }

  createEmailForPerson(personId) {
    const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/emails`;

    const body = JSON.stringify({
      data: {
        type: 'Email',
        attributes: {
          address: this.state.email,
          location: "Home"
        },
      }
    });

    const successHandler = () => {
      this.createPhoneNumberForPerson(personId);
    };
    const errorHandler = () => {
      this.showError('An error occurred')
    };

    NetworkUtils.postRequest(url, successHandler, errorHandler, body)
  }

  createPhoneNumberForPerson(personId) {
    const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/phone_numbers`;

    const body = JSON.stringify({
      data: {
        type: 'PhoneNumber',
        attributes: {
          number: this.state.phone,
          location: "Mobile",
        },
      }
    });

    const successHandler = () => {
      this.patchSubscribedForPerson(personId);
    };
    const errorHandler = () => {
      this.showError('An error occurred')
    };

    NetworkUtils.postRequest(url, successHandler, errorHandler, body)
  }

  patchSubscribedForPerson(personId) {
    const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/field_data`;

    const body = JSON.stringify({
      data: {
        type: 'FieldDatum',
        attributes: {
          field_definition_id: process.env.SUBSCRIBE_FIELD_ID,
          value: this.state.subscribe,
        },
      }
    });

    const successHandler = () => {
      this.sendToSheets();
    };
    const errorHandler = () => {
      this.showError('An error occurred')
    };

    NetworkUtils.postRequest(url, successHandler, errorHandler, body)
  }

  sendToSheets() {
    const url = `https://script.google.com/macros/s/AKfycbxuFGgV8bYE_6X0Hozof7mXLOJ0b2mDWJfhV7o_XTSa8t1_WcfI/exec`;
    const {firstName, lastName, email, phone, description, message} = this.state;
    const data = {
      type: 'connect',
      firstName,
      lastName,
      email,
      phone,
      description,
      message,
      subscribe: subscribe ? 'yes' : 'no'
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
          <form className='connect-form' autocomplete='on'>
            <label className='connect-form-label'>Name</label>
            <div className='connect-form-row'>
              <input
                className='connect-form-input left'
                type='text'
                name="first name"
                autocomplete="given-name"
                placeholder='First name'
                value={this.state.firstName}
                onChange={(e) => this.setState({firstName: e.target.value})}
              />
              <input
                className='connect-form-input right'
                type='text'
                name="last name"
                autocomplete="family-name"
                placeholder='Last name'
                value={this.state.lastName}
                onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </div>
            <label className='connect-form-label'>Email</label>
            <div className='connect-form-row'>
              <input
                className='connect-form-input'
                type='text'
                name='email'
                autocomplete="email"
                placeholder='youremailaddress@example.com'
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <label className='connect-form-label'>Phone</label>
            <div className='connect-form-row'>
              <input
                className='connect-form-input'
                type='tel'
                name='phone'
                autocomplete="tel"
                placeholder='4161234567'
                value={this.state.phone}
                onChange={(e) => this.setState({phone: e.target.value})}
              />
            </div>
            <label className='connect-form-label'>Which best describes you?</label>
            <div className='connect-form-row'>
              <Select
                className='connect-form-select'
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
            <label className='connect-form-label'>Message</label>
            <div className='connect-form-row'>
              <textarea
                className='connect-form-input textarea'
                type='text'
                name='message'
                placeholder='Add your message (optional)'
                value={this.state.message}
                onChange={(e) => this.setState({message: e.target.value})}
              />
            </div>
            <div className='connect-form-row checkbox'>
              <input
                className='connect-form-checkbox'
                type='checkbox'
                id='subscribe'
                value={this.state.subscribe}
                onChange={(e) => this.setState({subscribe: e.target.checked})}
              />
              <label className='connect-form-label' htmlFor="subscribe">
                Keep me updated on CIT events
              </label>
            </div>
            <div
              className='connect-form-submit'
              style={{backgroundColor: themeColor}}
              onClick={() => this.onConnectFormSubmit()}
            >
              Get Connected
            </div>
          </form>
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
