import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import {RingLoader} from 'react-spinners'

import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import routes from '../constants/routes'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import * as options from '../constants/options'
import * as NetworkUtils from '../utils/NetworkUtils'
import * as Utils from '../utils/Utils'

import 'react-select/dist/react-select.css'

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
      nextSteps: false,
      book: false,
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
    this.hideErrors();
    const { isValid, errors } = Utils.isFormValid(this.state)
    if (!isValid) {
      errors.forEach(error => this.showError(error))
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
      const personId = res.data.id

      Promise.all([
        this.createEmailForPerson(personId),
        this.createPhoneNumberForPerson(personId),
        this.postSubscribedForPerson(personId),
        this.postTypeForPerson(personId),
        this.sendToSheets()
      ]).then(([emailRes, numberRes, subRes, typeRes, sheetRes]) => {
        if(!(emailRes && numberRes && subRes && typeRes && sheetRes)){
          this.showSuccess();
        } else {
          this.showError('An error occurred')
        }
      })
    };

    NetworkUtils.postRequest(url, successHandler, this.errorHandler, body)
  }

  createEmailForPerson(personId) {
    if(this.state.email) {
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

      NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
    }
  }

  createPhoneNumberForPerson(personId) {
    if(this.state.phone) {
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

      NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
    }
  }

  postSubscribedForPerson(personId) {
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

    NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
  }

  postTypeForPerson(personId) {
    const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/field_data`;

    const body = JSON.stringify({
      data: {
        type: 'FieldDatum',
        attributes: {
          field_definition_id: process.env.CONNECT_FIELD_ID,
          value: true,
        },
      }
    });

    NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
  }

  sendToSheets() {
    NetworkUtils.sendToSheets('connect', this.state, this.successHandler, this.errorHandler)
  }

  successHandler() {
    return true
  };

  errorHandler() {
    return false
  };

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
        <AlertContainer ref={a => this.msg = a} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.connectHeader}
          color={colors.CONNECT_THEME}
        />
        <div className='page-wrapper'>
          <TitleSection
            title={strings.connectTitle}
            description={strings.connectDescription}
          />
          <form autoComplete='on'>
            <label>Name</label>
            <div className='row'>
              <input
                className='left'
                type='text'
                name="first name"
                autoComplete="given-name"
                placeholder='First name'
                value={this.state.firstName}
                onChange={(e) => this.setState({firstName: e.target.value})}
              />
              <input
                className='right'
                type='text'
                name="last name"
                autoComplete="family-name"
                placeholder='Last name'
                value={this.state.lastName}
                onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </div>
            <label>Email</label>
            <div className='row'>
              <input
                type='text'
                name='email'
                autoComplete="email"
                placeholder='youremailaddress@example.com'
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <label>Phone</label>
            <div className='row'>
              <input
                type='tel'
                name='phone'
                autoComplete="tel"
                placeholder='4161234567'
                value={this.state.phone}
                onChange={(e) => this.setState({phone: e.target.value})}
              />
            </div>
            <label>Which best describes you?</label>
            <div className='row'>
              <Select
                className='select'
                simpleValue
                name="description"
                options={options.CONNECT_OPTIONS}
                onChange={(value) => this.setState({description: value})}
                value={this.state.description}
                clearable={false}
                searchable={false}
                placeholder='Choose one option'
              />
            </div>
            <label>Message</label>
            <div className='row'>
              <textarea
                type='text'
                name='message'
                placeholder='Add your message (optional)'
                value={this.state.message}
                onChange={(e) => this.setState({message: e.target.value})}
              />
            </div>
            <div className='row checkbox'>
              <input
                className='connect-form-checkbox'
                type='checkbox'
                id='subscribe'
                value={this.state.subscribe}
                onChange={(e) => this.setState({subscribe: e.target.checked})}
              />
              <label htmlFor="subscribe">
                Keep me updated on CIT events
              </label>
            </div>
            {/* <div className='row checkbox'>
              <input
                className='connect-form-checkbox'
                type='checkbox'
                id='nextSteps'
                value={this.state.nextSteps}
                onChange={(e) => this.setState({nextSteps: e.target.checked})}
              />
              <label htmlFor="nextSteps">
                Sign me up for a Next Steps Session
              </label>
            </div> */}
            <div className='row checkbox'>
              <input
                className='connect-form-checkbox'
                type='checkbox'
                id='book'
                value={this.state.book}
                onChange={(e) => this.setState({book: e.target.checked})}
              />
              <label htmlFor="book">
                I'm new! I'd like a copy of "The Case for Christmas" by Lee Strobel
              </label>
            </div>
            <button
              className='button'
              type='button'
              style={{backgroundColor: colors.CONNECT_THEME}}
              onClick={() => this.onConnectFormSubmit()}
            >
              Get Connected
            </button>
          </form>
        </div>
        <div
          className='loading-spinner'
          style={{visibility: this.state.loading === true ? 'visible' : 'hidden'}}
        >
          <RingLoader
            color={colors.CONNECT_THEME}
            loading={true}
          />
        </div>
      </div>
    )
  }
}

export default Connect
