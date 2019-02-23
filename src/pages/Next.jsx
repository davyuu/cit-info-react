import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import {RingLoader} from 'react-spinners'
import moment from 'moment'

import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import routes from '../constants/routes'
import strings from '../constants/strings'
import images from '../images/images';
import * as colors from '../constants/colors'
import * as options from '../constants/options'
import * as NetworkUtils from '../utils/NetworkUtils'
import * as Utils from '../utils/Utils'

import 'react-select/dist/react-select.css'
import './Next.scss'

class Next extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
      description: '',
      nextSteps: true,
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
    NetworkUtils.sendToSheets('nextsteps', this.state, successHandler, errorHandler)
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

  firstSunday() {
    const d = new moment()
    while (!(d.date() <= 7 && d.day() == 0)) {
      d.add(1, 'days')
    }

    return d.format("MMMM Do, YYYY");
  }

  render() {
    return (
      <div className='next'>
        <AlertContainer ref={a => this.msg = a} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.nextHeader}
          color={colors.NEXT_THEME}
        />
        <div className='page-wrapper'>
          <TitleSection
            title={strings.nextTitle}
            description={strings.nextDescription}
          />

          <hr/>

          <div>
            <h3>NEXT SESSION</h3>
            <dl>
              <div>
	              <div className='img' dangerouslySetInnerHTML={{__html: images.calendar}} />
                <dt>Date:</dt>
                <dd>{this.firstSunday()}</dd>
              </div>
              <div>
	              <div className='img' dangerouslySetInnerHTML={{__html: images.clock}} />
                <dt>Time:</dt>
                <dd>11:30am - 12:30pm</dd>
              </div>
              <div>
	              <div className='img' dangerouslySetInnerHTML={{__html: images.info}} />
                <dt>Info:</dt>
                <dd>Free child care provided by citKids</dd>
              </div>
            </dl>
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
            <hr/>
            <label>What best describes you?</label>
            <div className='row'>
              <Select
                className='select'
                simpleValue
                name="description"
                options={options.NEXT_OPTIONS}
                onChange={(value) => this.setState({description: value})}
                value={this.state.description}
                clearable={false}
                searchable={false}
                placeholder='Choose one option'
              />
            </div>
            <button
              type='button'
              style={{backgroundColor: colors.NEXT_THEME}}
              onClick={() => this.onConnectFormSubmit()}
            >
              Sign Me Up For Next Steps
            </button>
          </form>
        </div>
        <div
          className='loading-spinner'
          style={{visibility: this.state.loading === true ? 'visible' : 'hidden'}}
        >
          <RingLoader
            color={colors.NEXT_THEME}
            loading={true}
          />
        </div>
      </div>
    )
  }
}

export default Next
