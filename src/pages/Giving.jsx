import React from 'react'
import HeaderBar from '../components/HeaderBar'
import * as colors from '../constants/colors'
import './Giving.css'

const themeColor = colors.GIVING_THEME;

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
          <h1 className='giving-title'>Give to our Mission</h1>
          <p className='giving-description'>When you give, you are honouring God with your money and helping us lead people into a life-changing relationship with Jesus Christ.</p>
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
