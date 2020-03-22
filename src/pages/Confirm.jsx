import React from 'react'
import {Link} from 'react-router-dom'

import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import routes from '../constants/routes'
import strings from '../constants/strings'
import * as colors from '../constants/colors'

class Confirm extends React.Component {
    render() {
        return (
            <div>
                <HeaderBar
                    goBack={this.props.history.goBack}
                    color={colors.CONNECT_THEME}
                />
            <div className='page-wrapper'>
            <TitleSection
                title={strings.confirmTitle}
                description={strings.confirmDescription}
            />
            <Link
                className='button'
                style={{backgroundColor: colors.CONNECT_THEME}}
                to={routes.home}
            >
                Go Home
            </Link>
                </div>
            </div>
        )
    }
}

export default Confirm
