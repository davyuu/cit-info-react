import React from 'react'
import HeaderBar from '../components/HeaderBar'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
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
            <p>Operation Christmas Child is an organization that delivers gift-filled Christmas boxes to children in need around the world. In the past, our CIT community would pick up the boxes here at church and fill them with items such as toys, hygiene products, or school supplies.</p>

            <p>Since we aren’t able to physically fill these boxes in-person this year, CIT’s Compassion Ministry has chosen to partner with Operation Christmas Child in a new virtual way. We have created a fundraiser link to help us reach our goal of providing at least 150 gift-filled shoeboxes! The cost of one shoebox is $40 ($30 to fill a box, $10 to ship the box). You can donate any amount anonymously through the link. Let’s pray for the Lord to move our hearts in our generosity this season towards others. Please feel free to share this and invite your friends and families as we enter this new season with thanksgiving and gratitude.</p>

            <a
              className='button'
              style={{backgroundColor: colors.CHRISTMAS_THEME}}
              href='https://sponsorme.samaritanspurse.ca/CITOperationChristmasChildshoeboxes'
            >CLICK HERE FOR MORE INFORMATION / DONATE</a>
          </section>
        </div>
      </div>
    )
  }
}

export default Christmas
