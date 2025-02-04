import React from 'react'
import AlertContainer from 'react-alert'
import {RingLoader} from 'react-spinners'

import HeaderBar from '../components/HeaderBar'
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
          <div className='title-section'>
            <h2>Try Alpha</h2>
            <p>Exploring Faith? Join the free Alpha Course</p>
            <p>Explore life, meaning & Purpose over dinner</p>
            <p>We welcome individuals of different ages, languages & backgrounds. Whether you’re new to faith, seeking understanding, or just curious, we’d love to have you!</p>
          </div>

          <hr/>

          <div className='info'>
            <h3>NEXT SESSION</h3>
            <div>
              <div className='img' dangerouslySetInnerHTML={{__html: images.clock}} />
              <p>Tuesday, April 8th at 7:00pm</p>
            </div>
            {/* <div>
              <div className='img' dangerouslySetInnerHTML={{__html: images.location}} />
              <p>CIT: 671 Sheppard Ave. East, Toronto</p>
            </div> */}
            <p>If you’d like to register as a guest for the upcoming session of Alpha at CIT, please sign up here</p>
            <a
              className='button'
              style={{backgroundColor: colors.ALPHA_THEME}}
              href='https://forms.gle/hFAb7ZiU2nzYhStz8'
            >
              Sign Up
            </a>
          </div>

          <hr/>

          <div className='info'>
            <h3>MORE INFORMATION</h3>
            <p>If you have any questions about participating or volunteering for the Alpha course, feel free to contact pastor Ian for more information at <a href='mailto:ibrinksman@hotmail.com'>ibrinksman@hotmail.com</a></p>
          </div>
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
