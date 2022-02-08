import React from 'react'
import HeaderBar from '../components/HeaderBar'
import './Support.scss'

const THEME = '#C31549';

class Support extends React.Component {
  render() {
    return (
      <div className='support'>
        <HeaderBar
          goBack={this.props.history.goBack}
          title="Announcement"
          color={THEME}
        />

        <div className="page-wrapper">
          <h2>Christian Afghan Refugee Support</h2>

          <p>Church in Toronto (CIT) is partnering with the Jesus Network (JN) to help Afghan refugees to settle in their new homes in Toronto.</p>

          <p>Please input your contact below and check off the items that you can donate.  Please only donate items in the condition as requested by Jesus Network.  For example, JN is requesting brand new mattress; therefore, used mattresses will not be accepted. Please store these items in your home at this time. Once the refugees are ready for these items (likely around Spring to Summer 2022), CIT will contact you to arrange logistics for donation drop off.</p>

          <p>Another way to help is to support JN financially.  You may send your financial donation via the CIT portal (mycit.info) or the church envelope and specify "Jesus Network" in the note field.  For accounting purposes, please keep your JN donation seperate from your general donation.</p>

        <a
            className='button'
            style={{backgroundColor: THEME}}
            target="_blank"
            href="https://docs.google.com/forms/d/1zjQz465Hb8_dhY9ffSLzdIGkCMJXbTlKlCr0ddf1x6Q/edit?usp=sharing_eip_m&ts=61fc347a">Sign up here</a>

        </div>
      </div>
    )
  }
}

export default Support
