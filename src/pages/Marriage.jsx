import React from 'react'
import HeaderBar from '../components/HeaderBar'
import './Marriage.scss'

export const MARRIAGE_THEME = '#E12C23';

class Marriage extends React.Component {
  render() {
    return (
      <div className='marriage'>
        <HeaderBar
          goBack={this.props.history.goBack}
          title="The Marriage Course"
          color={MARRIAGE_THEME}
        />
        <div className='page-wrapper'>
          <section>
            <p><b>What:</b></p>
            <p>A series of 7 sessions designed to help couples invest in their relationship. It involves watching a video and also having private couple discussion. Each session is almost 2 hours in length.</p>

            <p>Topics include:</p>
            <ul>
              <li>The Art of Communication</li>
              <li>Resolving Conflict</li>
              <li>The Power of Forgiveness</li>
              <li>The Impact of Family - Past & Present</li>
            </ul>

            <p><b>Who:</b></p>
            <p>Whether married for six months or 40 years, whether in a good place or struggling, the course helps couples navigate the modern challenges of marriage.</p>
            <p>It is based on Christian principles, but designed to help couples of all faiths strengthen their relationship.</p>

            <p><b>When:</b></p>
            <p>Beginning January 24 at 6:30 pm with dinner.</p>
            <p>To find out more information or to register please email: delmartin0211@gmail.com.</p>
          </section>
        </div>
      </div>
    )
  }
}

export default Marriage
