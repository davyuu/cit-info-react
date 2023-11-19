import React from 'react'
import HeaderBar from '../components/HeaderBar'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import images from '../images/images'
import './Christmas.scss'

class Christmas extends React.Component {
  render() {
    return (
      <div className='christmas'>
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.christmasHeader}
          color={colors.CHRISTMAS_THEME}
        />
        <div className='page-wrapper'>
          <section>
            <p>
              Christmas Market Help Wanted Sign up Sheet along with instructions below: <a href="https://signup.com/go/GoYscvZ">https://signup.com/go/GoYscvZ</a>
              <p>
                1. Click this link to go to our invitation page on SignUp: <a href="https://signup.com/go/GoYscvZ">https://signup.com/go/GoYscvZ</a>
              </p>
              <p>
                2. Enter your email address: (You will NOT need to register an account on SignUp)
              </p>
              <p>
                3. Sign up! Choose your spots - SignUp will send you an automated confirmation and reminders. Easy!
              </p>
              <p>
                Note: SignUp does not share your email address with anyone. If you prefer not to use your email address, please contact Kitty Wong (jpkjwong@gmail.com) and she can sign you up manually.
              </p>
            </p>

            <img src={images.christmasMarket} />
          </section>
        </div>
      </div>
    )
  }
}

export default Christmas
