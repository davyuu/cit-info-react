import React from 'react'
import AlertContainer from 'react-alert'
import Select from 'react-select'
import {RingLoader} from 'react-spinners'
import PropTypes from 'prop-types'

import routes from '../../constants/routes'
import * as NetworkUtils from '../../utils/NetworkUtils'
import * as Utils from '../../utils/Utils'

import 'react-select/dist/react-select.css'
import './index.scss'

const ALERT_OPTIONS = {
  offset: 25,
  position: 'top right',
  theme: 'light',
  time: 1500,
  transition: 'fade'
}

class ConnectForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      description: '',
      message: '',
      subscribe: false,
      nextSteps: false,
      loading: false
    }
  }

  onFormSubmit() {
    if(this.isFormValid() && !this.state.loading) {
      this.setState({loading: true});
      this.sendToSheets()
      this.props.sendRequest && this.props.sendRequest()
    }
  }

  isFormValid() {
    this.hideErrors()
    const { isValid, errors } = Utils.isFormValid(this.state)
    if (!isValid) {
      errors.forEach(error => this.showError(error))
    }
    return isValid
  }

  sendToSheets() {
    const { props, state } = this
    const {
      firstName,
      lastName,
      email,
      phone,
      description,
      message,
      subscribe,
      nextSteps
    } = state
    const data = {
      firstName,
      lastName,
      email,
      phone,
      description,
      message: props.message ? message : undefined,
      subscribe: props.checkboxes ? subscribe : undefined,
      nextSteps: props.checkboxes ? nextSteps : undefined
    }
    const successHandler = () => {
      this.showSuccess()
    }
    const errorHandler = () => {
      this.showError('An error occurred')
    }
    NetworkUtils.sendToSheets(props.formType, data, successHandler, errorHandler)
  }

  hideErrors() {
    this.msg.removeAll()
  }

  showError(msg) {
    this.msg.error(msg, {
      onClose: () => {
        this.setState({loading: false})
      }
    })
  }

  showSuccess() {
    this.setState({loading: false})
    this.msg.success('Successfully sent', {
      onClose: () => {
        this.props.push(routes.confirm)
      }
    })
  }

  render() {
    const { props, state } = this

    const messageTextArea = (
      <React.Fragment>
        <label>Message</label>
        <div className='row'>
          <textarea
            type='text'
            name='message'
            placeholder='Add your message (optional)'
            value={state.message}
            onChange={(e) => this.setState({message: e.target.value})}
          />
        </div>
      </React.Fragment>
    )

    const checkboxes = (
      <React.Fragment>
        <div className='row checkbox'>
          <input
            className='connect-form-checkbox'
            type='checkbox'
            id='subscribe'
            value={state.subscribe}
            onChange={(e) => this.setState({subscribe: e.target.checked})}
          />
          <label htmlFor="subscribe">
            Keep me updated on CIT events
          </label>
        </div>
        <div className='row checkbox'>
          <input
            className='connect-form-checkbox'
            type='checkbox'
            id='nextSteps'
            value={state.nextSteps}
            onChange={(e) => this.setState({nextSteps: e.target.checked})}
          />
          <label htmlFor="nextSteps">
            Sign me up for a Next Steps Session
          </label>
        </div>
      </React.Fragment>
    )

    return (
      <div className="connect-form">
        <AlertContainer ref={msg => this.msg = msg} {...ALERT_OPTIONS} />
        <form autoComplete='on'>
          <label>Name</label>
          <div className='row'>
            <input
              className='left'
              type='text'
              name="first name"
              autoComplete="given-name"
              placeholder='First name'
              value={state.firstName}
              onChange={(e) => this.setState({firstName: e.target.value})}
            />
            <input
              className='right'
              type='text'
              name="last name"
              autoComplete="family-name"
              placeholder='Last name'
              value={state.lastName}
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
              value={state.email}
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
              value={state.phone}
              onChange={(e) => this.setState({phone: e.target.value})}
            />
          </div>
          <label>Which best describes you?</label>
          <div className='row'>
            <Select
              className='select'
              simpleValue
              name="description"
              options={props.descOptions}
              onChange={(value) => this.setState({description: value})}
              value={state.description}
              clearable={false}
              searchable={false}
              placeholder='Choose one option'
            />
          </div>
          {props.message && messageTextArea}
          {props.checkboxes && checkboxes}
          <button
            type='button'
            style={{backgroundColor: props.themeColor}}
            onClick={() => this.onFormSubmit()}
          >
            {props.buttonText}
          </button>
        </form>
        <div
          className='loading-spinner'
          style={{display: state.loading === true ? 'flex' : 'none'}}
        >
          <RingLoader
            color={props.themeColor}
            loading={true}
          />
        </div>
      </div>
    )
  }
}

ConnectForm.propTypes = {
  themeColor: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  descOptions: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.bool,
  checkboxes: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  sendRequest: PropTypes.func,
  push: PropTypes.func.isRequired
}

export default ConnectForm