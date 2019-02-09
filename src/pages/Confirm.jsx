import React from 'react'
import {Link} from 'react-router-dom'

import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import routes from '../constants/routes'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import './Confirm.css'

const themeColor = colors.CONNECT_THEME;

class Confirm extends React.Component {
	render() {
		return (
			<div>
				<HeaderBar
					goBack={this.props.history.goBack}
					color={themeColor}
				/>
				<div className='page-wrapper'>
          <TitleSection
            title={strings.confirmTitle}
            description={strings.confirmDescription}
          />
					<div>
						<Link
							className='confirm-btn'
							style={{backgroundColor: themeColor}}
							to={routes.home}
						>
							Go Home
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Confirm
