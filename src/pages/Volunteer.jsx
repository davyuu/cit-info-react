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
    this.hideErrors();
    const { isValid, errors } = Utils.isFormValid(this.state)
    if (!isValid) {
      errors.forEach(error => this.showError(error))
    }
    return isValid;
	}


  sendToSheets() {
    const successHandler = () => {
      this.showSuccess();
    };
    const errorHandler = () => {
      this.showError('An error occurred')
    };
    NetworkUtils.sendToSheets('volunteer', this.state, successHandler, errorHandler)
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
        <AlertContainer ref={a => this.msg = a} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.volunteerHeader}
          color={colors.VOLUNTEER_THEME}
        />
        <div className='page-wrapper'>
          <TitleSection
            title={strings.volunteerTitle}
            description={strings.volunteerDescription}
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
                type='number'
                name='phone'
                autoComplete="tel"
                placeholder='4161234567'
                value={this.state.phone}
                onChange={(e) => this.setState({phone: e.target.value})}
              />
            </div>
            <label>Which team would you like to learn about</label>
            <div className='row'>
              <Select
                className='select'
                simpleValue
                name="description"
                options={options.VOLUNTEER_OPTIONS}
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
            <button
              className='button'
              type='button'
              style={{backgroundColor: colors.VOLUNTEER_THEME}}
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
            color={colors.VOLUNTEER_THEME}
            loading={true}
          />
        </div>
      </div>
    )
  }
}

export default Volunteer
