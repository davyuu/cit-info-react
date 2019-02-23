import React from 'react'
import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import './Giving.scss'

class Giving extends React.Component {
  render() {
    return (
      <div className='giving'>
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.givingHeader}
          color={colors.GIVING_THEME}
        />
        <div className='page-wrapper'>
          <TitleSection
            title={strings.givingTitle}
            description={strings.givingDescription}
          />

          <a
            className='button'
            style={{backgroundColor: colors.GIVING_THEME}}
            href='https://churchintoronto.churchcenteronline.com/giving'
          >
            Give Online
          </a>
          <p className='fine'>All donations are safe and secure. Tax receipts will be emailed to you directly from Church In Toronto at the beginning of the next year. Online giving is provided by <a href="https://planning.center/giving/">Planning Center Giving</a></p>

          <hr />

          <h2>Other Ways To Give</h2>

          <section>
            <h3>e-Transfer</h3>
            <p>Email money transfers are a great way to donate right from your bank account. Just click the link below for instructions on setting it up.</p>
            <a
              className='button'
              style={{backgroundColor: colors.GIVING_THEME}}
              href='https://churchintoronto.com/e-transfer/'
            >
              Set Up e-Transfer
            </a>
          </section>

          <section>
            <h3>Text-to-Give</h3>
            <p>Simply text an amount to: <b>84321</b></p>
            <p>If it’s your first time giving by text, you’ll get a message back with a link to get your giving account set up. Every other time will be as simple as sending a text message.</p>
            <p><b>Standard Message & Data Rates May Apply</b></p>
          </section>

          <section>
            <h3>Cash or Cheque</h3>
            <p>If you prefer to give by <b>cash or cheque</b>, you can do so by using the donation envelopes available at church. Once you have completed the information on the front just drop them into the <b>offering box</b>, located just outside the back auditorium doors.</p>
          </section>
        </div>
      </div>
    )
  }
}

export default Giving
