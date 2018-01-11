import React from 'react'
import {Link} from 'react-router-dom'

import HeaderBar from '../components/HeaderBar'
import routes from '../routes/routes'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import './Confirm.css'

const themeColor = colors.CONNECT_THEME;

class Confirm extends React.Component {
	render() {
		return (
			<div className='confirm'>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={strings.confirm_header}
					color={themeColor}
				/>
				<div className='confirm-container'>
					<h1 className='confirm-title'>{strings.confirm_title}</h1>
					<p className='confirm-description'>{strings.confirm_description}</p>
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
