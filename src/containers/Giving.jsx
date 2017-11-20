import React from 'react';
import HeaderBar from "../components/HeaderBar";
import * as Colors from '../constants/Colors'
import './Giving.css';

const themeColor = Colors.GIVING_THEME;

class Giving extends React.Component {
	render() {
		return (
			<div className='giving'>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Giving'}
					color={themeColor}
				/>
				<div className='giving-container'>
						<h1 className='giving-title'>You can't outgive God</h1>
						<p className='giving-description'>All donations are safe and secure. Online giving receipts will be provided directly from Planning Center Giving. Please follow the instructions provided through the link below.</p>
						<div>
							<a
								className='giving-btn'
								style={{backgroundColor: themeColor}}
								href='https://churchintoronto.churchcenteronline.com/giving'
							>
								Give Online
							</a>
						</div>
				</div>
			</div>
		)
	}
}

export default Giving
