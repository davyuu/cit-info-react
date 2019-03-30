import React from 'react'
import moment from 'moment'

import ConnectForm from '../components/connect-form'
import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import strings from '../constants/strings'
import images from '../images/images';
import * as colors from '../constants/colors'
import * as options from '../constants/options'

import './Next.scss'

class Next extends React.Component {
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

          <ConnectForm
            themeColor={colors.NEXT_THEME}
            formType={'nextsteps'}
            descOptions={options.NEXT_OPTIONS}
            buttonText={'Sign Me Up For Next Steps'}
            push={this.props.history.push}
          />
        </div>
      </div>
    )
  }
}

export default Next
