import React from 'react'
import HeaderBar from '../components/HeaderBar'
import * as colors from '../constants/colors'
import strings from '../constants/strings';
import images from '../images/images';
import './Kids.scss'

const themeColor = colors.KIDS_THEME;

class Kids extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="kids">
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.kidsHeader}
          color={themeColor}
        />
        <img className='header-img' src={images.kidsHeader}/>
        <div className="page-wrapper">
          <p>Parents, we know that the spiritual health of your kids is at the top of your mind. Weare committed to making sure that you have the resources at home to provide continuity of the kids ministry curriculum.</p>
          <p>What you can do:</p>
          <ol>
            <li>
              <p>Download the free <a target="_blank" href="https://theparentcue.org/app">Parent Cue</a> app on the App Store or Google Play. When it asks for church name, type “Church in Toronto” (not CIT).</p>
              <p>Highlights of this app include:</p>
              <ul>
                <li>Weekly videos of the Bible stories that we have been going through</li>
                <li>Weekly cues to help you make the most of the time you spend with your kid</li>
              </ul>
            </li>
            <li>
              <p>Use the following conversation guides to help kids navigate what they're feeling during this time</p>
              <ul>
                <li><a target="_blank" href="https://drive.google.com/open?id=1x0TMI86xMSfnZFF7w7CcqnUJ6hqa1T7Q">Crisis Conversation Guide Preschool</a></li>
                <li><a target="_blank" href="https://drive.google.com/open?id=1mNhryVPfHeSQNkhJm3tW5nnMB-bvTPuB">Crisis Conversation Guide Elementary</a></li>
              </ul>

            </li>
            <li>
              <p>Encourage your kids to follow this week’s God Time card, a take-home devotional:</p>
              <ul>            
                <li><a target="_blank" href="https://drive.google.com/open?id=1E5DSJ39F6vG3GtAio0_20gTmwTdWplei">March 15 God Time Card SK Grade 1</a></li>
                <li><a target="_blank" href="https://drive.google.com/open?id=12DyOIMaDQ4uKmZKK1nuSoiwHIo9n3m5P">March 15 God Time Card Grade 2-3</a></li>
                <li><a target="_blank" href="https://drive.google.com/open?id=1Y5pvADap7vEaHkS6-q-6JYQUo3jnJvSd">March 15 God Time Card Grade 4-5</a></li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Kids
