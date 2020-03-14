import React from 'react'
import AlertContainer from 'react-alert'
import {RingLoader} from 'react-spinners'

import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import routes from '../constants/routes'
import strings from '../constants/strings'
import images from '../images/images';
import * as colors from '../constants/colors'
import * as options from '../constants/options'
import * as NetworkUtils from '../utils/NetworkUtils'
import * as Utils from '../utils/Utils'

import './Alpha.scss'

class Alpha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      volunteer: false,
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
    const { firstName, lastName, email, phone, volunteer } = this.state;
    const fields = { firstName, lastName, email, phone,
      description: volunteer ? 'I’m interested in volunteering' : ''
    }
    NetworkUtils.sendToSheets('alpha', fields, successHandler, errorHandler)
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
      <div className='alpha'>
        <AlertContainer ref={a => this.msg = a} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.alphaHeader}
          color={colors.ALPHA_THEME}
        />
        <img className='header-img' src={images.alphaHeader}/>
        <div className='page-wrapper'>
          <TitleSection
            title={strings.alphaTitle}
            description={strings.alphaDescription}
            description2={strings.alphaDescription2}
          />

          <hr/>

          <div className='info'>
            <h3>NEXT SESSION</h3>
            <div>
              <div className='img' dangerouslySetInnerHTML={{__html: images.clock}} />
              <p>Tuesday, April 14th from 7:00pm-9:15pm</p>
            </div>
            <div>
              <div className='img' dangerouslySetInnerHTML={{__html: images.location}} />
              <p>CIT: 671 Sheppard Ave. East, Toronto</p>
            </div>
          </div>

          <hr/>

          <form autoComplete='on'>
            <h3>CONTACT INFO</h3>
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
            <div className='row checkbox'>
              <input
                className='connect-form-checkbox'
                type='checkbox'
                id='volunteer'
                value={this.state.volunteer}
                onChange={(e) => this.setState({volunteer: e.target.checked})}
              />
              <label htmlFor="volunteer">
                I’m interested in volunteering
              </label>
            </div>
            <button
              type='button'
              style={{backgroundColor: colors.ALPHA_THEME}}
              onClick={() => this.onConnectFormSubmit()}
            >
              Sign Me Up
            </button>
          </form>
        </div>
        <div
          className='loading-spinner'
          style={{visibility: this.state.loading === true ? 'visible' : 'hidden'}}
        >
          <RingLoader
            color={colors.ALPHA_THEME}
            loading={true}
          />
        </div>
      </div>
    )
  }
}

export default Alpha
