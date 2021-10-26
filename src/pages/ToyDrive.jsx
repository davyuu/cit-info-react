import React from 'react'
import HeaderBar from '../components/HeaderBar'
import * as colors from '../constants/colors'
import './ToyDrive.scss'

class ToyDrive extends React.Component {
  render() {
    return (
      <div className='toy-drive'>
        <HeaderBar
          goBack={this.props.history.goBack}
          title="Announcement"
          color={colors.TOY_THEME}
        />

        <div className="page-wrapper">
          <h2>Toy Drive 2021</h2>

          <p>This year, the CIT family has decided to join the exciting initiative of doing a toy drive with the Salvation Army as our Christmas outreach.  As a church we would like as many people to participate in this as possible to show our support and that we care for our community. </p>


          <h3>When is the Toy Mountain campaign?</h3>
          <p>Toy Mountain Drive with the Salvation Army will be occurring between mid November to mid December 2021.</p>

          <h3>What toys to donate?</h3>

          <p>When purchasing toys, please note that what they are in need of the most are toys for:</p>

          Boys & Girls 10-13<br/>
          Boys & Girls 14-17

          <p>Here are some ideas of appropriate items for tweens and teens:  curling irons, digital music players, hair dryers, hair kits, makeup kits, jewelry, electronics, books, hoodies (look for clothing label that states Y10-17 or Youth M to XL), sporting goods, backpacks, school supplies, board games, scarves, gloves (look for label that states youth large or adult small to medium) and gift cards.</p>

          <h3>What to do after the toys are purchased?</h3>

          <p>We highly encourage you to drop off unwrapped gifts at the church on Sundays between 10am-11am or Saturdays.  Someone will be at the front entrance to receive your donation every Saturday from 10am-12pm during the month of November (6th, 13th, 20th and 27th)if you are not attending in-person service.  The last date to give a donation is November 28th.</p>

          <p>If you can not drop off the gifts, you may also send the toy via mail delivery to the CIT Toy Mountain point person, Kitty Wong.  Please email Kitty at <a href="mailto:jpkjwong@gmail.com">jpkjwong@gmail.com</a> to get the address.</p>

          <h3>What about financial donations?</h3>

          <p>Help Toy Mountain to buy the most needed toys in bulk and get the most bang for your buck. You may send your financial donation via CIT portal or envelope and specify
          "Toy Mountain" in the note field until November 28, 2021.   You will receive a tax receipt from CIT for your Toy Mountain donation.</p>

          <p>For accounting purposes, please keep your general donation separate from the Toy Mountain donation.  This means you may need to make another donation via the portal or in a separate envelope for your general CIT donation.</p>

          <h3>How do we do this drive as a CIT family?</h3>

          <p>We would love for the CIT family to commit to praying for the children who will be receiving these toys for at least the duration of this campaign (mid November to mid December 2021).  Children between the age of 10-17 are a group of kids that are often overlooked. They are sweet but can also be very susceptible to influences that may not be the best for them.  They are looking to find their identities, please pray that they will find their identities in Jesus.</p>

          <p>In addition, a picture of all the gifts and donations from CIT will be taken and sent to the Salvation Army.  This picture might be shared on their social media as a way to advertise for the event. </p>

          <h3>What happens after I donate a toy?</h3>

          <p>Toys collected at the major malls are picked up regularly and transported to The Salvation Army Toy Distribution Warehouse.  Arrangements can be made for toys collected through a group effort to be picked up where 100 toys have been gathered.</p>

          <p>Once in the warehouse, Salvation Army staff and volunteers inspect, sort and package the toys by age and gender for delivery to Salvation Army Community and Family Services Centres throughout the GTA.  These centres have been registering qualifying families for Christmas Assistance throughout the months leading up to the holiday season to determine the inventory required to meet the needs within their community.</p>

          <p>After the Salvation Army Community and Family Services Centres receive the donated toys the staff will ensure that those toys are given to the families that have registered.   Due to COVID-19 restrictions, they may not be able to set up the toy store atmosphere that we have in previous years.  They aspire to provide distribution with dignity and believe that giving parents the opportunity to select toys for their children within the atmosphere of the Christmas Store is a more effective way to ensure parents are involved in the process, however, this will likely not be possible with the safety protocols they will need to follow.</p>

        </div>
      </div>
    )
  }
}

export default ToyDrive
