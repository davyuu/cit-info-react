import React from 'react'

import ConnectForm from '../components/connect-form'
import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import * as options from '../constants/options'


class Volunteer extends React.Component {
  render() {
    return (
      <div>
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
          <ConnectForm
            themeColor={colors.VOLUNTEER_THEME}
            formType={'volunteer'}
            descOptions={options.VOLUNTEER_OPTIONS}
            buttonText={'Get Connected'}
            push={this.props.history.push}
          />
        </div>
      </div>
    )
  }
}

export default Volunteer
